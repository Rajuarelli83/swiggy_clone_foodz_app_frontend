import { cdn_image_URL } from "../utils/constants";
const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
  } = resData;

  return (
    <div className="bg-white  rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.03] border border-transparent hover:border-orange-500 hover:border-2  w-full h-full flex flex-col">
      <img
        src={cdn_image_URL + cloudinaryImageId}
        alt={name + " image"}
        className="w-full h-[160px] object-cover rounded-t-2xl"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-lg font-bold text-gray-800 mb-2 truncate text-center">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold text-gray-800">Cuisines:</span> {cuisines?.slice(0, 3).join(', ')}
        </p>
        <h4 className="text-sm text-gray-700 font-semibold flex justify-between ">
          <span className="p-1" >{costForTwo} 🎊 </span><span className="text-white p-1 rounded bg-green-500">{avgRating} ⭐️</span>
        </h4>
      </div>
    </div>
  );
};

export const withPromotedLabel =(RestaurantCard)=>{
  return (props)=>{
    return(<div className="relative">
      <p className=" absolute p-2 bg-black text-white rounded-lg m-2 z-10">Promoted</p>
      <RestaurantCard {...props} />

    </div>);
  }
}

export default RestaurantCard;