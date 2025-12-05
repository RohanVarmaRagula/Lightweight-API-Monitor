import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
      });
      localStorage.setItem("email", email)
      console.log("Signup success:", res.data);
      navigate("../projects"); 
    } catch (err) {
      console.log("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Sign up</h2>
        <p className="auth-subtitle">
          Please enter your credentials to create an account.
        </p>

        <form className="auth-form" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              id="confirm_password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="btn-primary auth-submit">
              Sign up
            </button>

            <button
              type="button"
              className="btn-ghost auth-switch"
              onClick={() => navigate("../login")}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
