import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authstyles.css";
import SpinnerButton from "../Spinner/SpinnerButton";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage, isValidEmail } from "../../Utils/StringUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateLogin = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //login function
  const loginHandler = async (e) => {
    e.preventDefault();
    if (!validateLogin()) {
      return;
    }

    try {
      setLoading(true);

      const data = { email, password };
      const res = await AuthServices.loginUser(data);

      toast.success(res.data.message);
      localStorage.setItem("todoapp", JSON.stringify(res.data));
      navigate("/home");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <div className="mb-3">
          <i className="fa-solid fa-circle-user"></i>
        </div>
        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              setErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }}
          />

          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              setErrors((prev) => ({
                ...prev,
                password: "",
              }));
            }}
          />

          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        <div className="form-bottom">
          <p className="text-center">
            Not a user? please
            <Link to="/register"> Register</Link>
          </p>
          <button
            type="submit"
            className="login-btn"
            onClick={loginHandler}
            disabled={loading}
          >
            {loading ? (
              <>
                <SpinnerButton />
                <span style={{ marginLeft: "10px" }}>Logging In...</span>
              </>
            ) : (
              "LOGIN"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
