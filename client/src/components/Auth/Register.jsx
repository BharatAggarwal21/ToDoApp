import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authstyles.css";
import AuthServices from "../../Services/AuthServices";
import { toast } from "react-hot-toast";
import SpinnerButton from "../Spinner/SpinnerButton";
import { getErrorMessage, isValidEmail } from "../../Utils/StringUtils";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //register function
  const registerHandler = async (e) => {
  e.preventDefault();
  if (!isValidEmail(email)) {
    return toast.error("Please enter a valid email");
  }

  try {
    setLoading(true);

    const data = {
      email,
      password,
      username,
    };

    const res = await AuthServices.registerUser(data);

    toast.success(res.data.message);
    navigate("/login");
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
            type="text"
            className="form-control"
            placeholder="Enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-bottom">
          <p className="text-center">
            Already a user? please
            <Link to="/login"> Login</Link>
          </p>
          <button
  type="submit"
  className="login-btn"
  onClick={registerHandler}
  disabled={loading}
>
  {loading ? (
    <>
      <SpinnerButton />
      <span style={{ marginLeft: "10px" }}>
        Registering...
      </span>
    </>
  ) : (
    "REGISTER"
  )}
</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
