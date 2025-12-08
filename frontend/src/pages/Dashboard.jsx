import { Box } from "@mui/material"
import ErrorRateCard from "../components/charts/ErrorRateCard"
import SuccessFailurePie from "../components/charts/SuccessFailurePie"
import RequestsPerHour from "../components/charts/RequestsPerHour"
import LatencyChart from "../components/charts/LatencyChart"
import LatencyAnalysisCard from "../components/charts/LatencyAnalysisCard"

function Dashboard() {
    return (
        <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: "baseline"
        }}>
            <Box sx={{
                display: 'grid',
                gap:1, 
                alignItems: "flex-start"
            }}>
                <ErrorRateCard/>
                <SuccessFailurePie/>
                <LatencyAnalysisCard/>
            </Box>
            <Box sx={{
                display: 'grid',
                gap:1,
                flex: 2
            }}>            
                <RequestsPerHour/>
                <LatencyChart/>
            </Box>
        </Box>
    )
}

export default Dashboard
