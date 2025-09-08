import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!selected) {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
         localStorage.setItem("role",res.data.role)
        navigate("/dashboard");
      } catch (err) {
        console.log("error while Log in: " + err);
        alert("User doesn't exist! Please Enter Valid User credentials");
      }
    } else {
      try {
        const res = await axios.post("http://localhost:3000/login/admin", {
          email,
          password
        })
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role",res.data.role)
        navigate("/dashboard");
      } catch (err) {
        console.log("error while Log in: " + err);
        alert("You are not an admin!")
      }
    }
    
  }
  return (
    <div className="body">
      <div className="outer-body">
        <h2>Login Here</h2>
        <form onSubmit={handleSubmit} className="body-login">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input-box"
            required
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input-box"
            required
          />
         <div className="role-select">
            <label>
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => setSelected(e.target.checked)}
              />
              Admin
            </label>
          </div>
          <button type="submit" className="login">
            Login
          </button>
        </form>
        <p className="login-msg">
          Don't have any Account?{" "}
          <button
            className="sign-in"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;