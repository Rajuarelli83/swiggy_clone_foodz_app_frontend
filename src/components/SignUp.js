import { useState,useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import{Eye,EyeClosed} from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      console.log(`${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/signup`);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        toast.success("Signup successful!");
        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        navigate("/login"); 
      } else {
        console.log("Signup error:", data.message);
        toast.error(data.message ,{duration:2000});
        setTimeout(()=>{
                toast("Sign up using different email");
        },2000)
 
      }
    } catch (err) {
      console.log("Signup error Catch:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="font-bold text-2xl p-5 pl-1 text-center md:text-3xl mt-2 md:mt-0">
        F<span className="text-orange-500">O</span>od<span className="text-orange-500">'</span>z
      </h1>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              ref={passwordRef}
              type={showPass ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
               onFocus={() => setIsFocused(true)}
               onBlur={() => {
                setIsFocused(false);
                setShowPass(false);

               }}
              required
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {isFocused && (
                      <span onMouseDown={(e) => e.preventDefault()} onClick={togglePassword} className="absolute right-3 top-10 cursor-pointer text-gray-500" >
                            {showPass ? <Eye /> : <EyeClosed />}
                      </span>
            )}
            
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 cursor-pointer text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
