import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

function ViewAPIKeys({basedOn}) {
    const {id} = useParams()
    const [keys, setKeys] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getAPIKeys = async() => { 
            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const URL = (basedOn == "user_id") ?
                            `${API_BASE_URL}/api_key/user/${id}` :
                            `${API_BASE_URL}/api_key/project/${id}`;
                const res = await axios.get(URL);
                console.log(res.data)
                setKeys(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAPIKeys();
    }, [id, basedOn])

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={{ xs: 1, sm: 2, md: 2 }} sx={{ padding: { xs: '12px', sm: '16px', md: '24px' }, width: '100%', overflow: 'auto' }}>
            <table className="api-keys-table">
                <thead className="ak-head">
                    <tr className="ak-head-row">
                        <th className="ak-col ak-col-key">API Key</th>
                        <th className="ak-col ak-col-project">Project</th>
                        <th className="ak-col ak-col-status">Status</th>
                        <th className="ak-col ak-col-created">Created On</th>
                    </tr>
                </thead>

                <tbody className="ak-body">
                    {keys.map((item, idx) => (
                        <tr key={idx} className="ak-row">
                            <td className="ak-cell ak-cell-key" data-label="API Key">{item.api_key.substr(0, 5)}{"*".repeat(item.api_key.length - 5)}</td>
                            <td className="ak-cell ak-cell-project" data-label="Project">{item.project_name}</td>
                            <td className="ak-cell ak-status" data-label="Status">{item.status}</td>
                            <td className="ak-cell ak-cell-date" data-label="Created On">{
                            new Date(item.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {   
                basedOn == "project_id" ?
                    <Button variant="contained" onClick={()=>{navigate(`../projects/${id}/set-api-key`)}} sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }, width: { xs: '100%', sm: 'auto' }, maxWidth: '300px' }}>
                        New API Key
                    </Button>
                    : <></>
            }
        </Box>
    );
}

export default ViewAPIKeys;
