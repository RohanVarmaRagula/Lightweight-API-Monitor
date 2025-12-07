import { Box } from "@mui/material"
import ErrorRateCard from "../components/charts/ErrorRateCard"
import SuccessFailurePie from "../components/charts/SuccessFailurePie"
import RequestsPerHour from "../components/charts/RequestsPerHour"
import LatencyChart from "../components/charts/LatencyChart"

function Dashboard() {
    return (
        <Box sx={{
            display: 'flex',
            gap: 2
        }}>
            <Box sx={{
                display: 'grid',
                gap:2,
            }}>
                <ErrorRateCard/>
                <SuccessFailurePie/>
            </Box>
            <Box sx={{
                display: 'grid',
                gap:2,
                flex: 2
            }}>            
                <RequestsPerHour/>
                <LatencyChart/>
            </Box>
        </Box>
    )
}

export default Dashboard
