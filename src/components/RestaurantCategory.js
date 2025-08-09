

import ShowItemCards from './ShowItemCards';

const RestaurantCategory =({data,showItems,setShowindex,restaurantId})=>{

    const {itemCards}=data;

    const handleClick =()=>{
        setShowindex();
    }
   //console.log(showItems); 

    return(
        <div className="w-8/12 mt-2  m-auto ">
            <div className="w-full flex flex-row justify-between bg-gray-50  shadow  cursor-pointer mx-auto p-5 "  onClick={handleClick}>
                 <h1 className="font-bold lg:text-2xl">{data.title} ({data.itemCards.length})</h1>
                 <span className="lg:text-2xl ">{showItems ? "⬆️": "⬇️" }</span>
            </div>
            {showItems && <div className="w-full mx-auto p-2  bg-gray-100 shadow-lg border-t-2 border-t-amber-500">
                {itemCards.map((item,index)=><ShowItemCards key={index} item={item} restaurantId={restaurantId} />)}
            </div>}

        </div>
    )

}
export default RestaurantCategory; 
