import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AuthLayout from './components/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAuth from './components/ProtectedAuth';
import Body from './components/Body';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
import RestaurantMenu from './components/RestaurantMenu';
import Profile from './components/Profile';
import Error from './components/Error';
const appRouter = createBrowserRouter([
  {
    path: "/login",
    element:(
        <ProtectedAuth><AuthLayout/></ProtectedAuth>
    ),
    children: [
      { index: true, element: <Login /> }
    ]
  },
  {
    path: "/signup",
     element:(
         <ProtectedAuth> 
          <AuthLayout />
        </ProtectedAuth>
    ),
    children: [
      { index: true, element: <SignUp /> }
    ]
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Body /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/favourites", element: <Favourites /> },
      { path: "/restaurant/:resid", element: <RestaurantMenu /> },
      {path:"/profile",element:<Profile />}
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

const App = () => {
  return (
    <RouterProvider router={appRouter} />
  );
};

export default App; 