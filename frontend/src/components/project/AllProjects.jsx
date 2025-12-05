import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { API_BASE_URL } from "../../config";

function AllProjects() {
    const user_id = localStorage.getItem("user_id")
    const [projects, setProjects] = useState([])
    useEffect(() => {
        const getProjects = async() => {
            try {
                const res = await axios.get(`${API_BASE_URL}/projects/user/${user_id}`)
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
                    description={item.description}/>)
            ) )}
        </div>
    )
}

export default AllProjects;