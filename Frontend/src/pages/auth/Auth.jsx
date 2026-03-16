import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser, registerUser } from "../../services/authService";
import "../../styles/Auth.css";
import Loader from "../../components/Loader";
import { toastSuccess, toastError } from "../../components/Toast";
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
        login(data.user);
        toastSuccess("Login successful!");
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        await registerUser(name, email, password);

        toastSuccess("Account created successfully. Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error.message);
      toastError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {loading ? <Loader /> : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="switch-text">
          {isLogin ? "Create an account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
}
