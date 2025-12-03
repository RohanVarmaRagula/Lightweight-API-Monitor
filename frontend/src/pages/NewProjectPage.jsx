import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProjectPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // habdle API calls here 
        // data = api call for project details to get id

        // navigate("/projects/${data.id}/set-api-key")
        navigate("../projects/1/set-api-key")
    };

    return (
        <form onSubmit={handleSubmit} className="new-project-form">
            <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                    id="projectName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="projectDesc">Description</label>
                <textarea
                    id="projectDesc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
            </div>

            <button type="submit" className="btn-primary">
                Create Project
            </button>
        </form>
    );
}

export default NewProjectPage;
