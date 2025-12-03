import ProjectCard from "./ProjectCard";

function AllProjects() {
    return (
        <div className="cards-grid">
            <ProjectCard
                name="User Service"
                description="Auth + user profiles API."
                health="Healthy"
                n_requests_24h="12,890"
                error_rate="0.7%"
            />

            <ProjectCard
                name="Payments API"
                description="Handles billing, charges & invoicing."
                health="Healthy"
                n_requests_24h="9,432"
                error_rate="0.3%"
            />

            <ProjectCard
                name="Notifications Service"
                description="Email, SMS, and push delivery system."
                health="Degraded"
                n_requests_24h="4,210"
                error_rate="1.9%"
            />

            <ProjectCard
                name="Analytics Engine"
                description="Real-time metrics and event processing."
                health="Healthy"
                n_requests_24h="18,554"
                error_rate="0.2%"
            />

            <ProjectCard
                name="Search Service"
                description="Full-text indexing & query API."
                health="Healthy"
                n_requests_24h="7,892"
                error_rate="0.4%"
            />

            <ProjectCard
                name="File Storage API"
                description="Uploads, CDN & object storage pipeline."
                health="Degraded"
                n_requests_24h="3,671"
                error_rate="2.3%"
            />
        </div>
    )
}

export default AllProjects;