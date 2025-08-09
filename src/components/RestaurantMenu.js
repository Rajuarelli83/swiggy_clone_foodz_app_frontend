import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addFavouriteToBackend,removeFavouriteFromBackend} from "../utils/favouriteThunks";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { cdn_image_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
import ShimmerMenu from "./Shimmer/ShimmerMenu";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const RestaurantMenu = () => {
  const { resid } = useParams();
  const resInfo = useRestaurantMenu(resid);
  const [showIndex, setShowIndex] = useState(null);
  const [is_favourite, set_is_favourite] = useState(false);

  const favourites_list = useSelector((store) => store.favourites.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const isFav = favourites_list.some((each) => each.id === resid);
    set_is_favourite(isFav);
  }, [favourites_list, resid]);

  const toggleFav = async () => {
    const info = resInfo?.cards?.[2]?.card?.card?.info;
    if (!info) {
      toast.error("Restaurant information not available to add to favourites.");
      return;
    }

    if (!localStorage.getItem("token")) {
      toast.error("Please log in to manage favourites.");
      return;
    }

    if (!is_favourite) {
      const resultAction = await dispatch(addFavouriteToBackend(info));
    } else {
      const resultAction = await dispatch(removeFavouriteFromBackend(info.id));
    }
  };

  if (!resInfo || !resInfo.cards) return <ShimmerMenu />;

  const info = resInfo.cards[2]?.card?.card?.info;
  if (!info) return <p className="text-center">No restaurant info found.</p>;

  const {
    name,
    cuisines = [],
    costForTwoMessage,
    avgRating,
    cloudinaryImageId,
    sla,
    areaName,
    city,
    totalRatings,
    aggregatedDiscountInfo,
    locality
  } = info;

  const discount = aggregatedDiscountInfo?.descriptionList?.map((item) => item.meta) || [];

  const regularCards =
    resInfo.cards.find((card) => card.groupedCard?.cardGroupMap?.REGULAR)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories =
    regularCards?.filter(
      (c) =>
        c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="bg-[#F9FAF9] min-h-screen">
      <div className="p-1 flex justify-between rounded-2xl lg:rounded-0">
        <div className="w-full m-1 md:m-0 md:w-[70%] flex flex-col justify-start h-auto rounded-2xl shadow-2xl bg-gradient-to-b from-white to-[rgb(222,222,228)]">
          <h1 className="text-center text-2xl font-bold lg:text-4xl p-2">{name}</h1>
          <p className="text-center text-lg lg:text-xl">
            <span className="font-semibold">Cuisines :</span> {cuisines.join(", ")}
          </p>
          <div className="px-4 py-2 m-1 mb-2 text-sm bg-white shadow rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-green-600 text-lg lg:text-2xl pr-1">✪</span>
                <span className="text-xl">
                  {avgRating} ({(totalRatings / 1000).toFixed(1)}K+ Ratings)
                </span>
                <span className="p-2">.</span>
                <span className="text-xl text-orange-600">{costForTwoMessage}</span>
              </div>
              <h1
                onClick={toggleFav}
                className="cursor-pointer text-lg lg:text-xl pr-1"
              >
                {is_favourite ? (
                  <>
                    Favourite <span className="text-red-500">♥</span>
                  </>
                ) : (
                  "Add to Favourite ♥"
                )}
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="m-1 "> <span className="font-bold">Locality :</span> {locality}</h1>
              <span className="text-lg">🛵 outlet: {areaName}, {city}</span>
              <span className="ml-2">|</span>
              <span className="text-lg">🏠 45 Mins</span>
            </div>
          </div>
          <div className="px-4 py-2 m-1 bg-white shadow rounded-xl">
            {discount.map((item, index) => (
              <h1 key={index} className="font-bold">🎉 {item} 🎊</h1>
            ))}
          </div>
        </div>
        <div className="md:w-[30%] p-1 hidden md:flex">
          <img
            className="w-full h-[300px] shadow-lg rounded-2xl object-cover"
            src={cdn_image_URL + cloudinaryImageId}
            alt="Restaurant"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mb-1 md:mb-4">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={uuidv4()}
            data={category.card.card}
            showItems={index === showIndex}
            setShowindex={() =>
              setShowIndex(index === showIndex ? null : index)
            }
            restaurantId={resid}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
