import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <div className="bg-gray-200 text-gray-500 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
       
        <div className="text-center md:text-left">
           <h1 className="font-bold  text-lg  pl-1 text-center md:text-3xl ">F<span className="text-orange-500">O</span>od<span className="text-orange-500">'</span>z</h1>
          <p className="text-sm mt-2">Discover your next favorite meal with ease.</p>
          <p className="text-lg mt-2 flex justify-center md:justify-start space-x-3 md:space-x-5">
          <i className="fa-brands text-xl fa-whatsapp font-bold cursor-pointer hover:text-green-500"></i>
          <i className="fa-brands fa-square-x-twitter cursor-pointer hover:text-black"></i>
          <i className="fa-brands fa-instagram cursor-pointer hover:text-pink-400"></i>
          <i className="fa-brands fa-youtube cursor-pointer hover:text-red-600"></i>
          <i className="fa-brands  fa-pinterest cursor-pointer hover:text-red-600"></i>
          <i className="fa-brands fa-facebook cursor-pointer hover:text-blue-500"></i>
          <i className="fa-brands fa-linkedin cursor-pointer hover:text-blue-500" onClick={()=>{window.open("https://www.linkedin.com/in/raju-arelli-704314240/","_blank")}}></i>
          <i className="fa-brands fa-github cursor-pointer hover:text-black" onClick={()=>{window.open("https://github.com/Rajuarelli83","_blank")}}></i>
        </p>
        </div>

    
        <div className="flex space-x-6 text-sm">
          <Link  to="/" className="hover:underline text-gray-600">Home</Link>
          <Link  to="/cart" className="hover:underline text-gray-600">Cart</Link>
           <Link  to="/favourites" className="hover:underline text-gray-600">Favourites</Link>
          <Link to="/contact" className="hover:underline text-gray-600">Contact</Link>  
          <Link to="/profile" className="hover:underline text-gray-600">Profile</Link>
        </div>
      </div>
     <div className="text-xs text-center pt-4">
          © 2025 <span className="font-semibold">Food'z</span>. All rights reserved.
        </div>
    </div>
  );
};

export default Footer;