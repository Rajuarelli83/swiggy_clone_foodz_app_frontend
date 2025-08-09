import { useSelector, useDispatch } from "react-redux";
import { clearFavouritesOnBackend } from "../utils/favouriteThunks"; 
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import toast from 'react-hot-toast'; 

const Favourites = () => {
  const favourites_list = useSelector((store) => store.favourites.items);
  const dispatch = useDispatch();

  const handleClearFavourites = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to clear favourites.");
      return;
    }
    console.log("Attempting to clear favourites via clearFavouritesOnBackend thunk.");
    
    const resultAction = await dispatch(clearFavouritesOnBackend());
    if (clearFavouritesOnBackend.fulfilled.match(resultAction)) {
      console.log("Clear favourites thunk fulfilled.");
    } else {
      console.log("Clear favourites thunk rejected or failed.");
    }
  };

  return (
    <div className="bg-[#F9FAF9] min-h-screen">
      <h1 className="text-center mt-1 sm:text-md lg:text-2xl font-bold">
        Your Favourite <span className="text-red-600">Restaurants</span>
      </h1>

      {favourites_list.length === 0 ? (
        <p className="text-center mt-2 text-black">
          Add Restaurants that you like to Favourites..♡
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-6">
          {favourites_list.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.id}`}
              key={restaurant.id}
              className="w-full"
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      )}

      {favourites_list.length > 0 && (
        <div className="flex justify-center">
               <button className="bg-red-500 hover:bg-red-700 text-white rounded-md text-xl text-center p-2 m-2 cursor-pointer" onClick={handleClearFavourites}>
                    Clear Favourites
                </button>
        </div>
      )}
    </div>
  );
};

export default Favourites;
