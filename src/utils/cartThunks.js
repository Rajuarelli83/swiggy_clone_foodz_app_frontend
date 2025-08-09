import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const API_BASE_URL = `${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/user`;
const MENU_API_BASE_URL = `${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/menu`;

const getToken = () => localStorage.getItem("token");

export const fetchCartFromBackend = createAsyncThunk(
  "cart/fetchCartFromBackend",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return [];

      const cartResponse = await fetch(`${API_BASE_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const rawCartData = await cartResponse.json();
      if (!cartResponse.ok) {
        if (cartResponse.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error(`Failed to load cart: ${rawCartData.message}`);
        }
        return rejectWithValue(rawCartData.message || "Failed to fetch cart");
      }

      if (!Array.isArray(rawCartData) || rawCartData.length === 0) return [];

      const uniqueRestaurantIds = [...new Set(rawCartData.map(item => item.restaurantId))];

      const menuFetchPromises = uniqueRestaurantIds.map(resId =>
        fetch(`${MENU_API_BASE_URL}?resId=${resId}`, {
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        }).then(res => res.json())
      );

      const menusResponses = await Promise.allSettled(menuFetchPromises);

      const allMenuItems = new Map();
      menusResponses.forEach(result => {
        if (result.status === "fulfilled" && result.value?.data?.cards) {
          const regularCards = result.value.data.cards.find(card =>
            card.groupedCard?.cardGroupMap?.REGULAR
          )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

          regularCards?.forEach(category => {
            if (category.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
              category.card.card.itemCards.forEach(menuItem => {
                if (menuItem.card.info?.id) {
                  allMenuItems.set(menuItem.card.info.id, {
                    ...menuItem,
                    restaurantId: result.value.data.cards[2]?.card?.card?.info?.id,
                  });
                }
              });
            }
          });
        }
      });

      const hydratedCart = [];
      rawCartData.forEach(cartEntry => {
        const fullItem = allMenuItems.get(cartEntry.itemId);
        if (fullItem) {
          for (let i = 0; i < cartEntry.quantity; i++) {
            hydratedCart.push({ ...fullItem, restaurantId: cartEntry.restaurantId });
          }
        }
      });

      return hydratedCart;
    } catch (error) {
      toast.error("Network error while fetching cart.");
      return rejectWithValue(error.message);
    }
  }
);

export const addItemToBackend = createAsyncThunk(
  "cart/addItemToBackend",
  async ({ item, restaurantId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to add items to cart.");
        return rejectWithValue("No token found");
      }

      const itemId = item.card.info.id;

      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ restaurantId, itemId, quantity: 1 }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add item");
        return rejectWithValue(data.message || "Failed to add item");
      }

      toast.success("Item added to cart!");
      return { ...item, restaurantId };
    } catch (error) {
      toast.error("Network error while adding to cart.");
      return rejectWithValue(error.message);
    }
  }
);

export const removeItemFromBackend = createAsyncThunk(
  "cart/removeItemFromBackend",
  async ({ item, restaurantId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to remove items.");
        return rejectWithValue("No token found");
      }

      const itemId = item.card.info.id;

      const response = await fetch(`${API_BASE_URL}/cart/${itemId}?restaurantId=${restaurantId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to remove item");
        return rejectWithValue(data.message || "Failed to remove item");
      }

      const wasRemovedEntirely = data.message.includes("removed");
      toast.success(data.message);
      return { itemId, restaurantId, fullRemove: wasRemovedEntirely };
    } catch (error) {
      toast.error("Network error while removing item.");
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartOnBackend = createAsyncThunk(
  "cart/clearCartOnBackend",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to clear cart.");
        return rejectWithValue("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return rejectWithValue(data.message || "Failed to clear cart");
      }

      toast.success("Cart cleared successfully!");
      return [];
    } catch (error) {
      toast.error("Network error while clearing cart.");
      return rejectWithValue(error.message);
    }
  }
);