import { useState } from "react";

function SetAPIKey() {
    const [clicked, setClicked] = useState(false);
    const [apiKey, setApiKey] = useState(null);

    const generateAPIKey = async () => {
        setClicked(true);

        // later you'll do:
        // const res = await fetch(...)
        // const data = await res.json();
        // setApiKey(data.api_key);

        // TEMPORARY fake key:
        setApiKey("temporary-api-key-12345");
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
