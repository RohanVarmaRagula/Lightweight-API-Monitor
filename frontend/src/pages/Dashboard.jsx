import {useParams} from "react-router-dom"
import { Box, Typography } from "@mui/material"
import ErrorRateCard from "../components/charts/ErrorRateCard"
import SuccessFailurePie from "../components/charts/SuccessFailurePie"
import RequestsPerHour from "../components/charts/RequestsPerHour"
import LatencyChart from "../components/charts/LatencyChart"
import LatencyAnalysisCard from "../components/charts/LatencyAnalysisCard"
import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
    const { project_id } = useParams();

    const [collective24hData, setCollective24hData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);
    const [allData, setAllData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!project_id) return;

        const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const [collectiveRes, hourlyRes, allRes] = await Promise.all([    
                axios.get(`${API_BASE_URL}/metrics/collective_24h_data/${project_id}`),
                axios.get(`${API_BASE_URL}/metrics/hourly_data/${project_id}`),
                axios.get(`${API_BASE_URL}/metrics/data/${project_id}`)
            ]);

            setCollective24hData(collectiveRes.data || null);
            setHourlyData(hourlyRes.data || []);
            setAllData(allRes.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load metrics");
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [project_id]);

    // RequestsPerHour need: [{ hour, success, failure }]
    const requestsPerHour = hourlyData.slice().sort(
            (a, b) => new Date(a.hour_bucket) - new Date(b.hour_bucket) //old to new, in backend it was desc
        ).map((data) => {
            const failed = (data.error_rate * data.request_count) / 100;
            const success = data.request_count - failed;

            const hourLabel = new Date(data.hour_bucket).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            return {
                hour: hourLabel,
                success,
                failure: failed,
            };
        });

    // LatencyChart need: [{ time, latency }]
    const latencies = allData.slice().sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp) //again old to new
        ).map((data) => ({
            time: data.timestamp,
            latency: data.latency_ms,
        }));

    if (loading) {
        return (
        <Box sx={{ p: 2 }}>
            <Typography variant="body1">Loading metrics…</Typography>
        </Box>
        );
    }

    if (error || !collective24hData) {
        return (
        <Box sx={{ p: 2 }}>
            <Typography color="error">
            {error || "Unable to load metrics"}
            </Typography>
        </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            gap: { xs: 1, sm: 1, md: 2 },
            alignItems: "flex-start",
            padding: { xs: '12px', sm: '16px', md: '20px' },
            overflow: 'hidden',
            width: '100%'
        }}>
            <Box sx={{
                display: 'grid',
                gap: { xs: 1, sm: 1, md: 1 },
                alignItems: "flex-start",
                width: { xs: '100%', sm: '100%', md: 'auto' },
                minWidth: { xs: '100%', sm: '100%', md: '300px' },
                flex: { xs: 'none', sm: 'none', md: 0 }
            }}>
                <ErrorRateCard errorRateValue={collective24hData.error_rate}/>
                <SuccessFailurePie success={collective24hData.successful_request_count}
                                    fail={collective24hData.unsuccessful_request_count}/>
                <LatencyAnalysisCard p95_latency={collective24hData.p95_latency_ms}
                                     p99_latency={collective24hData.p99_latency_ms}
                                     avg_latency={collective24hData.avg_latency_ms}/>
            </Box>
            <Box sx={{
                display: 'grid',
                gap: { xs: 1, sm: 1, md: 1 },
                flex: { xs: '1 1 100%', sm: '1 1 100%', md: 2 },
                width: { xs: '100%', sm: '100%', md: 'auto' },
                minWidth: 0,
                overflow: 'hidden'
            }}>            
                <RequestsPerHour requestsPerHour={requestsPerHour}/>
                <LatencyChart latencies={latencies}/>
            </Box>
        </Box>
    )
}

export default Dashboard
