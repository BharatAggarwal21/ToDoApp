import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  // Logout function
  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Home click handler
  const homeClickHandler = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Get username
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    setUsername(userData && userData.user.username);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <h4 className="navbar-brand">
              <i className="fa-solid fa-user-tie" /> &nbsp;
              <i>Welcome</i> {username}!
            </h4>
            <div className="navbar-nav ms-auto mb-2 mb-lg-0">
              <button
                className="nav-link"
                title="home"
                onClick={homeClickHandler}
              >
                Home
              </button>
              <button
                className="nav-link "
                title="logout"
                onClick={logoutHandler}
              >
                <i className="fa-solid fa-power-off text-danger fa-2x" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
