function ProjectCard({
    name, 
    description,
    health,
    n_requests_24h,
    error_rate
}) {
    const statusClass = health == "Healthy" ? "status-dot status-healthy" : "status-dot status-degraded";

    return (
        <div className="project-card">
            <div className="project-card-header">
                <div>
                    <h3 className="project-title">{name}</h3>
                    <p className="project-description">{description}</p>
                </div>

                <div className="project-health">
                    <span className={statusClass} />
                    <span className="project-health-text">{health}</span>
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
                <button className="btn-secondary">View Dashboard</button>
                <button className="btn-ghost">API Keys ▸</button>
            </div>
        </div>
    )

}

export default ProjectCard;