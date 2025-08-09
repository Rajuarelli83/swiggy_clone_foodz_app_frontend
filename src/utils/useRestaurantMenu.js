import { useEffect, useState } from "react";

const useRestaurantMenu = (resid) => {
    const [resInfo, setResInfo] = useState(null);
        console.log("Fetching menu for restaurant ID:", resid);
    useEffect(() => {
        fetchMenu();
    }, [resid]);
    
    const fetchMenu = async () => {
        try {
          
            const res = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/menu?resId=${resid}`);
            const json = await res.json();
            const data = json?.data;

            if (data) {
                setResInfo(data);
            } else {
                console.log("Error: No data found in menu response from backend.");
                setResInfo(null);
            }
        } catch (error) {
            console.log("Error fetching menu from backend:", error);
            setResInfo(null);
        }
    };
    return resInfo;
};

export default useRestaurantMenu;