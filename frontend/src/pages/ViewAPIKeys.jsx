import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";

function ViewAPIKeys({ basedOn }) {
    const { id } = useParams();
    const [keys, setKeys] = useState([]);
    const navigate = useNavigate();

    const statusColors = {
        ACTIVE: "green",
        DISABLED: "gray",
        EXPIRED: "red"
    };

    useEffect(() => {
        const getAPIKeys = async () => {
            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const URL =
                    basedOn === "user_id"
                        ? `${API_BASE_URL}/api_key/user/${id}`
                        : `${API_BASE_URL}/api_key/project/${id}`;

                const res = await axios.get(URL);
                setKeys(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getAPIKeys();
    }, [id, basedOn]);

    const handleStatusChange = async (apiKeyId, newStatus) => {
        if (newStatus === "ACTIVE") {
            return
        }
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            await axios.patch(`${API_BASE_URL}/api_keys/${apiKeyId}/disable`);

            setKeys(prev =>
                prev.map(k =>
                    k.id === apiKeyId ? { ...k, status: newStatus } : k
                )
            );

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={{ xs: 1, sm: 2 }}
            sx={{ padding: { xs: "12px", sm: "16px", md: "24px" }, width: "100%", overflow: "auto" }}
        >
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
                            <td className="ak-cell ak-cell-key">
                                {item.api_key.substr(0, 5)}
                                {"*".repeat(item.api_key.length - 5)}
                            </td>

                            <td className="ak-cell ak-cell-project">
                                {item.project_name}
                            </td>

                            <td className="ak-cell ak-status">

                                {item.status === "EXPIRED" ? (
                                    <span style={{
                                        color: statusColors.EXPIRED,
                                        fontWeight: 600
                                    }}>
                                        EXPIRED
                                    </span>
                                ) : item.status === "DISABLED" ? (
                                    <span style={{
                                        color: statusColors.DISABLED,
                                        fontWeight: 600
                                    }}>
                                        DISABLED
                                    </span>
                                ) : (
                                    <Select
                                        size="small"
                                        value={item.status}
                                        onChange={(e) =>
                                            {
                                                console.log(item)
                                                handleStatusChange(item.id, e.target.value)}
                                        }
                                        sx={{
                                            color: statusColors[item.status],
                                            fontWeight: 600,
                                            minWidth: 120
                                        }}
                                    >
                                        <MenuItem value="ACTIVE">
                                            ACTIVE
                                        </MenuItem>
                                        <MenuItem value="DISABLED">
                                            DISABLED
                                        </MenuItem>
                                    </Select>
                                )}

                            </td>

                            <td className="ak-cell ak-cell-date">
                                {new Date(item.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {basedOn === "project_id" && (
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate(`../projects/${id}/set-api-key`);
                    }}
                    sx={{
                        bgcolor: "#1e293b",
                        "&:hover": { bgcolor: "#0f172a" },
                        width: { xs: "100%", sm: "auto" },
                        maxWidth: "300px"
                    }}
                >
                    New API Key
                </Button>
            )}
        </Box>
    );
}

export default ViewAPIKeys;