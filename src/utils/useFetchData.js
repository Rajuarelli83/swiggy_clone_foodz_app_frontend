import { useEffect } from "react";
const useFetchData = (setListOfRestaurants, setFilteredList) => {
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/restaurants`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setListOfRestaurants(data);
          setFilteredList(data);
          console.log("✅ Restaurants fetched:", data.length);
        } else {
          throw new Error("Invalid restaurant data format");
        }
      } catch (error) {
        console.log("❌ Failed to fetch restaurants:", error);
        setListOfRestaurants([]);
        setFilteredList([]);
      }
    })();
  }, []);
};
export default useFetchData;