import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SinglePost from "./pages/ProductDetail";
import { UserProvider } from "../src/useContext/UserContext";
import Header from "./commom/header";
import Footer from "./commom/footer";
import { CartProvider } from "./useContext/CartContext";
import Cart from "./pages/CartPage";

const ConditionalHeaderFooter = ({
  shouldDisplayHeader,
  shouldDisplayFooter,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const shouldDisplay = !["/login", "/signup"].includes(pathname);

  if (shouldDisplayHeader && shouldDisplay) {
    return <Header />;
  }

  if (shouldDisplayFooter && shouldDisplay) {
    return <Footer />;
  }

  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      // You might want to validate the user's authentication token or session here
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    // You can show a loading spinner or skeleton screen while checking the authentication state
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <ConditionalHeaderFooter
            shouldDisplayHeader={true}
            shouldDisplayFooter={false}
          />
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/:id" element={<SinglePost />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
          <ConditionalHeaderFooter
            shouldDisplayHeader={false}
            shouldDisplayFooter={true}
          />
        </CartProvider>
      </UserProvider>
    </Router>
  );
};

const PrivateRoute = () => {
  const userDetails = localStorage.getItem("userDetails");
  const isAuthenticated = !!userDetails;

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App;
