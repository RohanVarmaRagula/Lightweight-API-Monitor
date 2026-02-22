import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const res = await axios.post(`${API_BASE_URL}/login`, {
                "email": email,
                "password": password
            })
            localStorage.setItem("email", email)
            localStorage.setItem("user_id", res.data.user_id)
            localStorage.setItem("token", res.data.access_token)
            navigate("../")
        } catch (err){
            console.log("Login error:", err.response?.data || err.message);
            alert(err.response?.data?.detail || "Login failed");
        }     
    }  
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Log in</h2>
                <p className="auth-subtitle">Welcome back, please enter your log in credentials.</p>
                
                <form className="auth-form" onSubmit={submitForm}>
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <input 
                            id="Email"
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
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required    
                            className="auth-input"  
                        />
                    </div>
                    <div className="auth-actions">
                        <button type="submit" className="btn-primary auth-submit">
                            Log in
                        </button>

                        <button 
                            type="button" 
                            className="btn-ghost auth-switch"
                            onClick={() => navigate("../signup")}>
                            Create an account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn;