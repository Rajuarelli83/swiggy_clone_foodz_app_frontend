import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const API_BASE_URL = `${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/user`;

const getToken = () => localStorage.getItem("token");

export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
   
      if (!token) {
        console.log("No authentication token found. Not fetching favourites.");
        return [];
      }

      const response = await fetch(`${API_BASE_URL}/favourites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to fetch favourites:", data.message || response.statusText, "Status:", response.status);
        
        if (response.status === 401) {

          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.error("Session expired or invalid. Please log in again.");
        } else {
          
          toast.error(`Failed to load favourites: ${data.message || "Server error"}`);
        }
        return rejectWithValue(data.message || "Failed to fetch favourites");
      }

      return data; 
    } catch (error) {
      console.log("Network or unexpected error fetching favourites:", error);
      toast.error("Network error while fetching favourites.");
      return rejectWithValue(error.message);
    }
  }
);


export const addFavouriteToBackend = createAsyncThunk(
  "favourites/addFavouriteToBackend",
  async (restaurantData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to add favourites.");
        return rejectWithValue("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/favourites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ restaurantId: restaurantData.id }), 
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add favourite");
        return rejectWithValue(data.message || "Failed to add favourite");
      }

      toast.success("Added to favourites!");
      return restaurantData; 
    } catch (error) {
      console.log("Network or unexpected error adding favourite:", error);
      toast.error("Network error while adding favourite.");
      return rejectWithValue(error.message);
    }
  }
);


export const removeFavouriteFromBackend = createAsyncThunk(
  "favourites/removeFavouriteFromBackend",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to remove favourites.");
        return rejectWithValue("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/favourites/${restaurantId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to remove favourite");
        return rejectWithValue(data.message || "Failed to remove favourite");
      }

      toast.success("Removed from favourites!");
      return restaurantId;
    } catch (error) {
      console.log("Network or unexpected error removing favourite:", error);
      toast.error("Network error while removing favourite.");
      return rejectWithValue(error.message);
    }
  }
);


export const clearFavouritesOnBackend = createAsyncThunk(
  "favourites/clearFavouritesOnBackend",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to clear favourites.");
        return rejectWithValue("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/favourites/clear`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to clear all favourites");
        return rejectWithValue(data.message || "Failed to clear all favourites");
      }

      toast.success("All favourites cleared!");
      return []; 
    } catch (error) {
      console.log("Network or unexpected error clearing favourites:", error);
      toast.error("Network error while clearing favourites.");
      return rejectWithValue(error.message);
    }
  }
);
