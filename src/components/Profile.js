import {useNavigate} from 'react-router-dom';
const Profile =()=>{
    const navigate =useNavigate();
   const {name,email}=JSON.parse(localStorage.getItem("user"));
   

  console.log(localStorage.getItem("user"));
  const handleLogout = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     navigate("/login");
    
  };

    return (
  <div className="body min-h-screen">
    <div className=" flex justify-center items-center h-[200px]">
      <div className="flex flex-col w-[320px]  sm:w-[400px] border-gray-200 border-2 p-5 rounded-lg bg-[#F9FAF9] shadow-md">
        <h1 className="text-xl sm:text-xl text-orange-500 mb-2">User Name:<span className="text-black ml-2">{name}</span></h1>
        <h1 className="text-xl sm:text-xl text-orange-500 mb-4">User Email:<span className="text-black ml-2">{email}</span></h1>
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="text-base sm:text-lg cursor-pointer w-fit px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    {/* DO NOT TOUCH food'z section */}
    <div className=" relative brave w-full h-[700px] bg-white text-center flex items-center justify-center">
      <div className="text-[380px] font-bold text-gray-200 absolute select-none pointer-events-none">
        .foodz
      </div>
      <h1 className="foods font-bold text-8xl z-10 mt-9 relative">food'z</h1>
    </div>
  </div>
);
}
export default Profile;