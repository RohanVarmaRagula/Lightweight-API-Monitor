import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProjectCard({
    name, 
    id,
    description,
    acceptable_error_rate,
    n_requests_24h,
    error_rate
}) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newErrorRate, setNewErrorRate] = useState(acceptable_error_rate);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentAcceptableErrorRate, setCurrentAcceptableErrorRate] = useState(acceptable_error_rate);
    
    const statusClass = currentAcceptableErrorRate > error_rate ? "status-dot status-healthy" : "status-dot status-degraded";
    const navigate = useNavigate()

    useEffect(() => {
        if (isEditModalOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => document.body.classList.remove("modal-open");
    }, [isEditModalOpen]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleUpdateErrorRate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const encodedName = encodeURIComponent(name);
            await axios.patch(`${API_BASE_URL}/projects/name/${encodedName}?new_acceptable_error_rate=${newErrorRate}`);
            setCurrentAcceptableErrorRate(newErrorRate);
            setSuccess("Acceptable error rate updated successfully!");
            setIsEditModalOpen(false);
        } catch(err) {
            setError(err.response?.data?.detail || "Failed to update error rate");
            console.log("Error updating error rate:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="project-card">
            <div className="project-card-header">
                <div>
                    <h3 className="project-title">{name}</h3>
                    <p className="project-description">{description}</p>
                </div>

                <div className="project-health">
                    <span className={statusClass} />
                    <span className="project-health-text">{acceptable_error_rate > error_rate ? "Healthy":"Degraded"}</span>
                </div>
            </div>

            <div className="project-card-body">
                <div className="project-stat">
                    <p className="stat-label">Requests (24h)</p>
                    <p className="stat-value">{n_requests_24h}</p>
                </div>
                <div className="project-stat">
                    <p className="stat-label">Error rate</p>
                    <p className="stat-value">{error_rate}</p>
                </div>
            </div>
            
            <div className="project-card-footer">
                <button className="btn-secondary" onClick={() => navigate(`${id}/dashboard`)}>View Dashboard</button>
                <button className="btn-ghost" onClick={()=>navigate(`${id}/project-api-keys`)}>API Keys ▸</button>
                <button className="btn-secondary" onClick={() => setIsEditModalOpen(true)}>Acceptable Error Rate: {currentAcceptableErrorRate}</button>
            </div>

            {success && <div className="success-message">{success}</div>}

            {isEditModalOpen && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Update Acceptable Error Rate</h2>
                            <button 
                                className="modal-close"
                                onClick={() => setIsEditModalOpen(false)}
                            >✕</button>
                        </div>
                        <form onSubmit={handleUpdateErrorRate}>
                            <div className="form-group">
                                <label htmlFor="errorRateInput">New Acceptable Error Rate</label>
                                <input
                                    id="errorRateInput"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    value={newErrorRate}
                                    onChange={(e) => setNewErrorRate(parseFloat(e.target.value))}
                                    required
                                />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn-ghost"
                                    onClick={() => setIsEditModalOpen(false)}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )

}

export default ProjectCard;