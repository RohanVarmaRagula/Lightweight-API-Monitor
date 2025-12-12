import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function SetAPIKey() {
    const {project_id} = useParams()
    const [clicked, setClicked] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const navigate = useNavigate();

    const generateAPIKey = async () => {
        setClicked(true);
        try {
            console.log("project_id from URL:", project_id);
            const res = await axios.post(`${API_BASE_URL}/api_key`, {
                "project_id": project_id 
            })
            setApiKey(res.data.key);
        }
        catch(err) {
            console.log("API key error:", err.response?.data || err.message);
            alert(JSON.stringify(err.response?.data || err.message, null, 2));
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding:10}}>
            <Typography variant="h5">
                Now your new project is ready. Click the button below to generate your API key.
            </Typography>
            
            <Typography variant="subtitle1">
                Note: This API key cannot be viewed again.
            </Typography>

            {!clicked ? (
                <Button onClick={generateAPIKey} variant="contained" size="large" sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }}}>
                    Get API Key
                </Button>
            ) : (
                <>
                    <Typography style={{ fontFamily: "monospace"}}>
                        {apiKey}
                    </Typography>
                    <Typography variant="subtitle1">
                        Now use this api-key in your project for service.
                    </Typography>
                    <Button variant="contained" onClick={()=>{navigate(`../projects`)}} sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }}}>
                        View Projects
                    </Button>
                </>
            )}
        </Box>
    );
}

export default SetAPIKey;
