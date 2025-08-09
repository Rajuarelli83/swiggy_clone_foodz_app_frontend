import { app_logo } from "../utils/constants";
import { useState } from "react";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useSelector} from 'react-redux';
import {CircleUserRound} from "lucide-react";

const Header = () => { 
  const [showMenu,setShowMenu]= useState(false);
  const location = useLocation();
  const path=location.pathname;
 
  const cartItems = useSelector((store)=>store.cart.items);
  const toggleMenu =()=>{
    setShowMenu(!showMenu);
  };

  return (
    <div>
    <div className="flex justify-between p-[10px]  border-2  border-black border-b-2 border-b-orange-600 rounded-b-2xl">
       <Link to="/">
      <div className="flex cursor-pointer">
        <img className="w-8 md:w-15  " src={app_logo} alt="App-logo" />
        <h1 className="font-bold  text-xl p-5 pl-1 text-center md:text-3xl mt-2 md:mt-0">F<span className="text-orange-500">O</span>od<span className="text-orange-500">'</span>z</h1>
      </div> 
      </Link>
      <div className=" hidden lg:flex  px-5 py-0 nav-items">
        <ul className="flex list-none" >
          <li className={`p-2.5 m-2 text-[20px] transition-transform duration-300 hover:scale-105 ${path==='/' ?"text-orange-600  font-bold":""}  hover:text-orange-500`} ><Link to="/">Home {/*console.log(path)*/}</Link></li>          
          <li  className={`p-2.5 m-2 text-[20px] transition-transform duration-300 hover:scale-105 ${path==='/favourites' ?"text-orange-600 font-bold":""}  hover:text-orange-500`}><Link to="/favourites">Favourites</Link></li>
          <li  className={`p-2.5 m-2 text-[20px] transition-transform duration-300 hover:scale-105 ${path==='/cart' ?"text-orange-600 font-bold":""}  hover:text-orange-500`}><Link to="/cart">Cart{cartItems.length===0 ?'':`(${cartItems.length})`}</Link></li>
          <li  className={`p-2.5 m-2 text-[20px] transition-transform duration-300 hover:scale-105 ${path==='/contact' ?"text-orange-600 font-bold":""}  hover:text-orange-500`}><Link to="/contact">Contact</Link></li>
          <li  className={`px-2 py-3.5 m-2 text-[20px] transition-transform duration-300 hover:scale-105 ${path==='/profile' ?"text-orange-600 font-bold":""}  hover:text-orange-500 cursor-pointer`}><Link to="/profile"><CircleUserRound /></Link></li>
        </ul>
      </div>
      <div className="block lg:hidden ">
        {showMenu ? (<i className="fa-solid fa-xmark  mt-5 mr-4 mb-5 text-3xl cursor-pointer md:text-3xl" onClick={toggleMenu}></i>):( <i className="fa-solid fa-bars  mt-5 mr-4 mb-5 text-3xl cursor-pointer md:text-3xl " onClick={toggleMenu}></i>)}
      </div>
    </div>
    <div className="block lg:hidden">
      {showMenu && (
              <ul className="flex flex-col gap-4 m-5 p-4 bg-white shadow-md rounded-lg animate-fade-in">
                    <li className={`transition-transform duration-200  px-2 py-1 rounded-md ${path === '/' ? 'text-orange-600 font-bold' : 'text-gray-800'} hover:text-orange-500`}><Link to="/">Home</Link></li>
                     <li className={`transition-transform duration-200  px-2 py-1 rounded-md ${path === '/favourites' ? 'text-orange-600 font-bold' : 'text-gray-800'} hover:text-orange-500`}><Link to="/favourites">Favourites</Link></li>
                     <li className={`transition-transform duration-200  px-2 py-1 rounded-md ${path === '/cart' ? 'text-orange-600 font-bold' : 'text-gray-800'} hover:text-orange-500`}><Link to="/cart">Cart {cartItems.length===0 ?'':`(${cartItems.length})`}</Link></li>
                     <li className={`transition-transform duration-200  px-2 py-1 rounded-md ${path === '/contact' ? 'text-orange-600 font-bold' : 'text-gray-800'} hover:text-orange-500`}><Link to="/contact">Contact</Link></li>
                    <li className={`transition-transform duration-200  px-2 py-2 rounded-md ${path === '/profile' ? 'text-orange-600 font-bold' : 'text-gray-800'} hover:text-orange-500 cursor-pointer`}><Link to="/profile"> <CircleUserRound /></Link></li>
              </ul>
      )}
    </div>
 </div>
  );
};

export default Header;