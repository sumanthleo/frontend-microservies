import React, { useContext } from "react";
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
import { UserContext, UserProvider } from "../src/useContext/UserContext";
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

const PrivateRoute = () => {
  const { userDetails } = useContext(UserContext);
  const user = userDetails;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
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

export default App;
