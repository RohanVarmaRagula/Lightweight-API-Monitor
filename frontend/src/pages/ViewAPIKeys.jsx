import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";

function ViewAPIKeys({basedOn}) {
    const {id} = useParams()
    const [keys, setKeys] = useState([])

    useEffect(() => {
        const getAPIKeys = async() => { 
            try {
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
        <table className="api-keys-table">
            <thead className="ak-head">
                <tr className="ak-head-row">
                    <th className="ak-col ak-col-key">API Key</th>
                    <th className="ak-col ak-col-project">Project</th>
                    <th className="ak-col ak-col-created">Created On</th>
                </tr>
            </thead>

            <tbody className="ak-body">
                {keys.map((item, idx) => (
                    <tr key={idx} className="ak-row">
                        <td className="ak-cell ak-cell-key">{item.api_key}</td>
                        <td className="ak-cell ak-cell-project">{item.project_name}</td>
                        <td className="ak-cell ak-cell-date">{
                        new Date(item.created_at).toLocaleDateString()}
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
}

export default ViewAPIKeys;
