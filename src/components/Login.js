import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye,EyeClosed } from 'lucide-react';
import useOnlineStatus from "../utils/useOnlineStatus";


const Login = () => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [isFocused,setIsFocused]=useState(false);
 
  const onlineStatus = useOnlineStatus();
  if(!onlineStatus){
   return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold">👀 Looks like you are offline.</h1>
        <p className="text-gray-600 mt-2">Try connecting to a network.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_CONNECTION_URL}/api/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.log("Login error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="font-bold text-2xl p-5 pl-1 text-center md:text-3xl mt-2 md:mt-0">
        F<span className="text-orange-500">O</span>od<span className="text-orange-500">'</span>z
      </h1>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={()=>setIsFocused(true)}
              onBlur={()=>{
                setIsFocused(false);
                setShowPass(false);
              }}
              autoComplete="current-password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {isFocused && (

                <span onMouseDown={(e)=>e.preventDefault()} onClick={togglePassword} className="absolute right-3 top-10 cursor-pointer text-gray-500" >
                      {showPass ? (
                            <Eye />
                            ) : (
                            <EyeClosed />
                      )}
                </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 cursor-pointer text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
