import axios from "axios";
import { useState } from "react";
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
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: { xs: 1, sm: 2, md: 2 }, padding: { xs: 2, sm: 4, md: 10 }, width: '100%', overflow: 'auto' }}>
            <Typography variant="h5" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, textAlign: 'center' }}>
                Now your new project is ready. Click the button below to generate your API key.
            </Typography>
            
            <Typography variant="subtitle1" sx={{ fontSize: { xs: '13px', sm: '14px', md: '16px' } }}>
                Note: This API key cannot be viewed again.
            </Typography>

            {!clicked ? (
                <Button onClick={generateAPIKey} variant="contained" size="large" sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }, width: { xs: '100%', sm: 'auto' }, maxWidth: '300px' }}>
                    Get API Key
                </Button>
            ) : (
                <>
                    <Typography sx={{ fontFamily: "monospace", fontSize: { xs: '12px', sm: '13px', md: '14px' }, overflow: 'auto', maxWidth: '100%', padding: '8px', wordBreak: 'break-all', backgroundColor: '#f5f5f5', borderRadius: '4px', width: '100%', textAlign: 'center' }}>
                        {apiKey}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '13px', sm: '14px', md: '16px' } }}>
                        Now use this api-key in your project for service.
                    </Typography>
                    <Button variant="contained" onClick={()=>{navigate(`../projects`)}} sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }, width: { xs: '100%', sm: 'auto' }, maxWidth: '300px' }}>
                        View Projects
                    </Button>
                </>
            )}
        </Box>
    );
}

export default SetAPIKey;
