import { cdn_image_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItemToBackend, removeItemFromBackend } from "../utils/cartThunks";
import toast from "react-hot-toast";

const ShowItemCards = ({ item, restaurantId}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cart.items);

  const itemId = item.card?.info?.id;
  
  const quantity = cartItems.filter(
    cartItem => cartItem.card?.info?.id === itemId && cartItem.restaurantId === restaurantId
  ).length;


  const increase = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to add items to cart.");
      return;
    }
    await dispatch(addItemToBackend({ item, restaurantId }));
  };

  const decrease = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to remove items from cart.");
      return;
    }

    if (quantity > 0) {
      await dispatch(removeItemFromBackend({ item, restaurantId }));
    } else {
      toast.info("Item is not in cart.");
    }
  };

  const { name, price, ratings, isVeg, imageId, description } = item.card?.info || {};
  let { rating, ratingCountV2 } = ratings?.aggregatedRating || {};
  if (typeof rating === "object" && rating !== null) rating = 3;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 mb-4 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-200">

      <div className="md:col-span-9 flex flex-col justify-between space-y-2">
        <div>
          <h2 className="text-gray-800 text-lg md:text-xl font-semibold">{name}</h2>
          <div className="flex items-center space-x-2 text-sm md:text-base font-bold">
            <span className={isVeg ? "text-green-600" : "text-red-600"}>
              {isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
            </span>
          </div>
        </div>

        <p className="text-gray-700 text-sm md:text-base">{description}</p>

        <div className="flex flex-wrap items-center mt-1 md:mt-2 space-x-4">
          <span className="text-lg md:text-xl font-semibold text-green-700">
            ₹{isNaN(price) ? 100 : price / 100}
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs md:text-sm px-2 py-1 rounded-md font-medium">
            ★ {rating} ({ratingCountV2 > 0 ? ratingCountV2 : 2})
          </span>
        </div>
      </div>


      <div className="md:col-span-3 flex md:flex-col items-center justify-between md:justify-between md:items-center">

        <img
          src={cdn_image_URL + imageId}
          alt="Food item"
          className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-xl shadow-sm hidden md:block"
        />

        <div className="flex items-center space-x-2 mt-3 md:mt-4">
          <button
            onClick={decrease}
            className={`cursor-pointer px-3 py-1 rounded-md font-bold text-white bg-red-600 hover:bg-red-700 transition ${quantity <=0 ? "invisible" : ""}`}
          >−</button>

          <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg font-bold text-base md:text-lg min-w-[36px] text-center">
            {quantity <= 0 ? "Add" : quantity}
          </span>

          <button
            onClick={increase}
            className="cursor-pointer px-3 py-1 rounded-md font-bold text-white bg-green-600 hover:bg-green-700 transition"
          >＋</button>
        </div>
      </div>
    </div>
  );
};

export default ShowItemCards;
