import profilePic from "../assets/profilePic.png";
import {useNavigate, Outlet} from 'react-router-dom';

function AppLayout() {
    const navigate = useNavigate();
    const goToProjects = () => {
        navigate('/projects');
    }

    return (
        <>
            <div className="app-layout">
                <h2>Light Weight API Monitor</h2>
                <button onClick={goToProjects}>Projects</button>
                <button>API Keys</button>
                <button>Getting Started</button>
                <img src={profilePic} alt="profile pic"/>
            </div>

            <div className="page-container">
                <Outlet/>
            </div>
        </>
    )
}

export default AppLayout