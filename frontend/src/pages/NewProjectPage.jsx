import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProjectPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const res = await axios.post(`${API_BASE_URL}/projects`, {
                "name": name,
                "description": description,
                "user_id": localStorage.getItem("user_id")
            })
            navigate(`../projects/${res.data.id}/set-api-key`)

        } catch(err) {
            console.log("Can't create new project:", err.response?.data || err.message);
            alert(err.response?.data?.detail || "Create Project failed.");
        }
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
