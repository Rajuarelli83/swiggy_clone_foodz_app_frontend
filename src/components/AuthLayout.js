
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,}}/>
      <Outlet />
    </div>
  );
};

export default AuthLayout;