import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";

function AllProjects() {
    const user_id = localStorage.getItem("user_id")
    const [projects, setProjects] = useState([])
    useEffect(() => {
        const getProjects = async() => {
            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const res = await axios.get(`${API_BASE_URL}/projects/user/${user_id}`)
                for (const project of res.data) {
                    const projectMetrics = await axios.get(`${API_BASE_URL}/metrics/collective_24h_data/${project.id}`)
                    project.metrics = projectMetrics.data
                }
                setProjects(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getProjects();
    }, [user_id])

    return (
        <div className="cards-grid">
            {projects.map(item => (
                (<ProjectCard key={item.id}
                    name={item.name}
                    id={item.id}
                    description={item.description}
                    n_requests_24h={item.metrics.request_count}
                    error_rate={item.metrics.error_rate}/>)
            ))}
        </div>
    )
}

export default AllProjects;