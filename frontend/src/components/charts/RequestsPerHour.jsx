import { Card, CardHeader, CardContent } from "@mui/material";
import { BarChart } from "@mui/x-charts";

function RequestsPerHour({requestsPerHour}) {
    // const requestsPerHour = [
    //     { hour: "00:00", success: 120, failure: 5 },
    //     { hour: "01:00", success: 98,  failure: 3 },
    //     { hour: "02:00", success: 87,  failure: 4 },
    //     { hour: "03:00", success: 102, failure: 2 },
    //     { hour: "04:00", success: 80,  failure: 1 },
    //     { hour: "05:00", success: 65,  failure: 2 },
    //     { hour: "06:00", success: 150, failure: 8 },
    //     { hour: "07:00", success: 220, failure: 10 },
    //     { hour: "08:00", success: 310, failure: 15 },
    //     { hour: "09:00", success: 420, failure: 12 },
    //     { hour: "10:00", success: 480, failure: 18 },
    //     { hour: "11:00", success: 530, failure: 20 },
    //     { hour: "12:00", success: 610, failure: 25 },
    //     { hour: "13:00", success: 580, failure: 19 },
    //     { hour: "14:00", success: 540, failure: 14 },
    //     { hour: "15:00", success: 500, failure: 17 },
    //     { hour: "16:00", success: 520, failure: 15 },
    //     { hour: "17:00", success: 610, failure: 22 },
    //     { hour: "18:00", success: 700, failure: 30 },
    //     { hour: "19:00", success: 680, failure: 25 },
    //     { hour: "20:00", success: 620, failure: 18 },
    //     { hour: "21:00", success: 540, failure: 12 },
    //     { hour: "22:00", success: 420, failure: 10 },
    //     { hour: "23:00", success: 310, failure: 7 },
    //     ];

    return (
        <Card sx={{width:'100%'}}>
            <CardHeader
                title="REQUESTS VOLUME"
                subheader="Number of API Requests (per hour)"
            />
            <CardContent sx={{ width: '100%' }}>
                <BarChart
                    height={250}
                    xAxis={[{data: requestsPerHour.map(item => item.hour), label:'Time'}]}
                    series={[
                        {
                            data: requestsPerHour.map(item => item.success), 
                            color: "#1e9275ff", 
                            stack:'1',
                            label:'Successful requests',
                            // barLabel: requestsPerHour.map(item => item.success)
                        },
                        {
                            data: requestsPerHour.map(item => item.failure), 
                            color: "#ff9800", 
                            stack:'1', 
                            label:'Failed requests',
                            // barLabel: requestsPerHour.map(item => item.failure)
                        }
                    ]}
                    
                />    
            </CardContent>
        </Card>
    )
}
export default RequestsPerHour;