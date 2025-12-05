import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import { useParams } from "react-router-dom";

function SetAPIKey() {
    const {project_id} = useParams()
    const [clicked, setClicked] = useState(false);
    const [apiKey, setApiKey] = useState(null);

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
        <>
            <h3>Now your new project is ready. Click the button below to generate your API key.</h3>
            <p>Note: This API key cannot be viewed again.</p>

            {!clicked ? (
                <button onClick={generateAPIKey}>
                    Get API Key
                </button>
            ) : (
                <>
                <p style={{ fontFamily: "monospace", marginTop: "16px" }}>
                    {apiKey}
                </p>
                <p>Now use this api-key in your project for service.</p>
                </>
            )}
        </>
    );
}

export default SetAPIKey;
