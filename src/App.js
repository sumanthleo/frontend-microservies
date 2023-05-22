import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SinglePost from "./pages/ProductDetail";


const PrivateRoute = ({ children }) => {
  const authed = localStorage.getItem("token"); // isauth() returns true or false based on localStorage

  return authed ? children : <Navigate to="/login" />;
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
          <Route
          path="/:id"
          element={
            <PrivateRoute>
              <SinglePost />
            </PrivateRoute>
          }
        />
        {/* Add other protected routes for authenticated users */}
      </Routes>
    </Router>
  );
};

export default App;
