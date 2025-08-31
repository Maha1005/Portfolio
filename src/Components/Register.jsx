import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    try {
      await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
      });
      alert("Successfully Registered, Please Login!!");
      navigate("/");
    } catch (err) {
      console.log("error while Sign up: " + err);
      alert("Please Enter Valid Credentials, May be the User already exists");
    }
  };

  return (
    <div className="body">
      <div className="outer-body">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="body-login">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="input-box"
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input-box"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input-box"
            required
          />
          <button type="submit" className="sign-in">
            Sign Up
          </button>
        </form>
        <p className="login-msg">
          Already have an Account?{" "}
          <button
            className="sign-in"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;