import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { fetchFavourites } from "../utils/favouriteThunks";
import { setCartItems } from "../utils/cartSlice"; 
import { fetchCartFromBackend } from "../utils/cartThunks"; 
import { setFavourites } from "../utils/favouriteSlice";
import Header from "./Header";
import Footer from "./Footer";
import UserContext from "../utils/UserContext";

const AppLayout = () => {
  const [userName, setUserName] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      const user = JSON.parse(userData);
      setUserName(user.name);
      dispatch(fetchFavourites()); 
      dispatch(fetchCartFromBackend());     
    } else {
      dispatch(setFavourites([])); 
      dispatch(setCartItems([])); 
    }
  }, [dispatch]);

  return (
   
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Toaster position="top-center" />
        <Header />
        <Outlet />
        <Footer />
      </UserContext.Provider>
  );
};

export default AppLayout;
