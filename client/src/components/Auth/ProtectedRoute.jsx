import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("todoapp"));

  // If not logged in, redirect to /login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // if logged in, render the child component
  return children;
};

export default ProtectedRoute;
