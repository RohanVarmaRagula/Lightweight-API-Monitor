import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile({onClose}) {
    const navigate = useNavigate();
    const profileRef = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const logout = () => {
        localStorage.clear()
        onClose()
        navigate("/home");
    };
    const goToLogIn = () => {
        navigate("../login");
    }
    
    const logOutButton = (<button className="pm-item logout" onClick={logout}>Log out</button>);
    const logInButton = (<button className="pm-item login" onClick={goToLogIn}>Log in</button>);
    const isLoggedIn = !!localStorage.getItem("token")
    return (
        <div ref={profileRef} className="profile-menu">
            <p className="pm-email">{localStorage.email}</p>
            {isLoggedIn ? logOutButton : logInButton}
        </div>
    )
}

export default Profile;