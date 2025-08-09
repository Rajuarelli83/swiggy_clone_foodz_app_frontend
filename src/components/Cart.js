
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import { clearCartOnBackend } from '../utils/cartThunks'; 
import ShowItemCards from './ShowItemCards';
import toast from 'react-hot-toast'; 
import CartShimmer from './Shimmer/cartShimmer';

const Cart = () => {
  const cartItems = useSelector(store => store.cart.items);
  const dispatch = useDispatch();
  const [uniqueCartItemsWithQuantity, setUniqueCartItemsWithQuantity] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    if (cartItems.length > 0) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
    quantifyCart(cartItems);
  }, [cartItems]);
  const quantifyCart = (items) => {
    const itemMap = new Map();
    items.forEach(item => {
      const id = item.card?.info?.id;
      const restaurantId = item.restaurantId;
      if (!id || !restaurantId) return;
      const key = `${id}-${restaurantId}`;
      if (itemMap.has(key)) {
        itemMap.get(key).quantity += 1;
      } else {
        itemMap.set(key, { ...item, quantity: 1 });
      }
    });
    const uniqueItems = Array.from(itemMap.values());
    setUniqueCartItemsWithQuantity(uniqueItems);
  };

  const total_price = uniqueCartItemsWithQuantity.reduce((acc, value) => {
    const quantity = value.quantity || 1;
    const rawPrice = value.card?.info?.price ?? 10000;
    const price = parseFloat(rawPrice / 100);
    return acc + price * quantity;
  }, 0);

  const handleClearCart = async () => {
    await dispatch(clearCartOnBackend());
  };

  const handleSaveCart = () => {
    toast.success('Cart Saved ✅');
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-6 bg-[#F9FAF9] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Cart 🛒</h1>

      {cartItems.length > 0 && !loading && (
        <div className="w-full flex flex-col items-center lg:flex-row justify-center gap-4 mb-6">
          <button
            onClick={handleClearCart} 
            className="bg-white cursor-pointer border-red-600 border-2 text-red-600 font-semibold px-6 py-2 rounded-lg w-full max-w-sm lg:w-48 text-center hover:text-white hover:bg-red-700 transition"
          >
            Clear Cart 🗑️
          </button>
          <button
            onClick={handleSaveCart}
            className="bg-white cursor-pointer border-green-600 border-2 text-green-600 font-semibold px-6 py-2 rounded-lg w-full max-w-sm lg:w-48 text-center hover:text-white hover:bg-green-700 transition"
          >
            Save Cart ⬇️
          </button>
        </div>
      )}

      {loading ? (
        <CartShimmer />
      ) : cartItems.length === 0 ? (
        <div className="w-full flex flex-col items-center rounded-2xl p-6 min-h-[300px]">
          <img
            src="https://i.pinimg.com/originals/26/39/1e/26391e7b551203ac10f1c8ee89b151fe.gif"
            alt="Your Cart is Empty"
            className="w-full max-w-[400px] object-contain"
          />
          <h2 className="text-2xl text-cyan-600 mt-4 font-semibold text-center">
            Oops! Looks like your cart is empty 👽
          </h2>
          <p className="text-yellow-800 text-center mt-1">
            Add something delicious to bring it back!
          </p>
        </div>
      ) : (
        <div className="w-full md:w-10/12 lg:w-8/12 bg-white p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl underline text-red-600 font-bold text-right mr-2 py-2">
            Total: <span className="text-gray-800">₹ {total_price.toFixed(2)}</span>
          </h2>
          <div className="space-y-4">
            {uniqueCartItemsWithQuantity.map(item => (
              <ShowItemCards key={uuidv4()} item={item} restaurantId={item.restaurantId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;