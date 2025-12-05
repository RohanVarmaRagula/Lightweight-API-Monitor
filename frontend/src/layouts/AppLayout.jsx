import profilePic from "../assets/profilePic.png";
import {useNavigate, Outlet} from 'react-router-dom';
import Profile from "../components/Profile";
import { useState } from "react";

function AppLayout() {
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id")
    const goToProjects = () => {
        navigate("/projects");
    }
    const goToAPIKeys = () => {
        navigate(`/${user_id}/user-api-keys`)
    }

    return (
        <>
            <div className="app-layout">
                <h2>Light Weight API Monitor</h2>
                <button onClick={goToProjects}>Projects</button>
                <button onClick={goToAPIKeys}>API Keys</button>
                <button>Getting Started</button>
                <img src={profilePic} alt="profile pic" onClick={() => setOpenProfile(!openProfile)}/>
                {openProfile && (
                    <Profile
                        onClose={() => {setOpenProfile(false)}}
                    />
                )}
            </div>

            <div className="page-container">
                <Outlet/>
            </div>
        </>
    )
}

export default AppLayout