import { useNavigate } from "react-router-dom";

function NewProject() {
    const navigate = useNavigate();
    
    const goToNewProject = () => {
        navigate('/projects/new-project')
    }

    return (
        <button className="new-project-bar" onClick={goToNewProject}>
            <div className="np-icon">+</div>
            <h3 className="np-title">New Project</h3>
            <p className="np-sub">Start monitoring a new API.</p>
        </button>
    );
}

export default NewProject;
