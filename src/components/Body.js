import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState} from "react";
import { Link } from "react-router-dom";
import {ListFilter} from "lucide-react";
import ShimmerHome from "./Shimmer/ShimmerHome";
import Brave from "./Shimmer/Brave";
import useOnlineStatus from "../utils/useOnlineStatus";
import useFetchData from "../utils/useFetchData";


const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [ratingLowToHigh, setRatingLowToHigh] = useState(true);
  const [isTopRatedActive, setIsTopRatedActive] = useState(false);
  const [dietFilter, setDietFilter] = useState("");

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <div className="text-center p-6 min-h-screen ">
        <h1 className="text-2xl font-bold">👀 Looks like you are offline.</h1>
        <p className="text-gray-600 mt-2">Try connecting to a network.</p>
        <h1 className=" text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Wanna Play a Game :Click The boxes randomly to see Magic.</h1>
      </div>
    );
  }

  const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

  useFetchData(setListOfRestaurants, setFilteredList);

  const applyFilters = (search, topRated, diet) => {
    let updatedList = listOfRestaurants;

    if (search.trim() !== "") {
      updatedList = updatedList.filter((restaurant) =>
        restaurant?.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (topRated) {
      updatedList = updatedList.filter(
        (restaurant) => parseFloat(restaurant?.avgRating) >= 4.6
      );
    }

    if (diet === "veg") {
      updatedList = updatedList.filter(
        (restaurant) => restaurant.veg === true
      );
    } else if (diet === "nonveg") {
      updatedList = updatedList.filter(
        (restaurant) =>
          restaurant.veg === false || restaurant.veg === undefined
      );
    }

    setFilteredList(updatedList);
  };

  const onClickRatingType = () => {
    setRatingLowToHigh((prev) => !prev);
    const sortedList = [...filteredList].sort((a, b) =>
      ratingLowToHigh
        ? b.avgRating - a.avgRating
        : a.avgRating - b.avgRating
    );
    setFilteredList(sortedList);
  };

  const onChangeSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    applyFilters(input, isTopRatedActive, dietFilter);
  };

  const onClickTopRated = () => {
    const newTopRatedState = !isTopRatedActive;
    setIsTopRatedActive(newTopRatedState);
    applyFilters(searchInput, newTopRatedState, dietFilter);
  };

  const onChangeDietFilter =(e)=>{
    const selected=e.target.value;
    setDietFilter(selected);
    applyFilters(searchInput, isTopRatedActive, selected);
  }

  

  return listOfRestaurants.length === 0 ? (
    <ShimmerHome />
  ) : (
    <div className="body bg-[#F9FAF9] min-h-screen">
      <div className="flex flex-col items-center gap-6 py-6 px-4 w-full max-w-[1200px] mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full ">
          <div className="flex items-center border-2 border-black hover:border-orange-500 hover:border-3 rounded-[8px] w-full md:w-auto">
            <i className="fa-solid  ml-2 font-bold text-xl fa-magnifying-glass"></i>
            <input
              type="search"
              className="px-3 py-3 outline-none w-full "
              placeholder="Search restaurants"
              value={searchInput}
              id="search_input"
              onChange={onChangeSearchInput}
            />
          </div>
          <button  onClick={onClickRatingType}  className="cursor-pointer rounded-lg px-4 py-3 text-white bg-black w-full md:w-auto" >
            <span className="font-semibold text-white">Rating :</span>{" "}
              {ratingLowToHigh ? (
                <span className="inline-flex items-center" >
                  Low to High
                  <ListFilter className="ml-2 rotate-180 transition-transform text-red-500 duration-300 sm:inline-block" />
                </span>
              ) : (
                <span className="inline-flex items-center" >
                  High to Low
                  <ListFilter className="ml-2 transition-transform text-red-500 duration-300 sm:inline-block" />
                </span >
            )}
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 justify-center items-center w-full">
          <div className="flex items-center gap-2">
            <label htmlFor="diet-filter" className=" md:text-2xl ">
              Filters:
            </label>
            <select
              id="diet-filter"
              value={dietFilter}
              onChange={onChangeDietFilter}
              className="border border-black rounded-[8px] p-2"
            >
              <option value="">None</option>
              <option value="veg">Veg 🌱</option>
              <option value="nonveg">Non-Veg 🍖</option>
            </select>
          </div>

          <button
            className={`p-2 cursor-pointer border-2 rounded-[8px] ${
              isTopRatedActive
  ? "bg-gradient-to-r from-pink-600  to-orange-600  text-white"
  : "bg-white text-black"
            }`}
            onClick={onClickTopRated}
          >
            Top Rated
          </button>
        </div>
      </div>


      {filteredList.length===0 ? <div> <h1 className="text-2xl text-center font-semibold text-orange-600 mt-8 relative"> 🥲 There are No Restaurants for given Search 👀 / Filters 🎚️ </h1><p className="text-center text-lg text-gray-400">🔁 Try Changing search or Toggle filters </p>
    <Brave />  </div> :   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-15 gap-6 px-4 py-6 w-full">
        { filteredList.map((restaurant) => (
          <Link
            to={"/restaurant/" + restaurant.id}
            key={restaurant.id}
            className="w-full"
          >
            {restaurant.veg ? (
              <PromotedRestaurantCard resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>}
    
    </div>
  );
};

export default Body;