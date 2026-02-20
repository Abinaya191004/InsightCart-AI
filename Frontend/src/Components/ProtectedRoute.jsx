import { useState } from "react";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const [showSignup, setShowSignup] = useState(false);

  if (!token) {
    return showSignup ? (
      <Signup switchToLogin={() => setShowSignup(false)} />
    ) : (
      <Login switchToSignup={() => setShowSignup(true)} />
    );
  }

  return children;
}

export default ProtectedRoute;