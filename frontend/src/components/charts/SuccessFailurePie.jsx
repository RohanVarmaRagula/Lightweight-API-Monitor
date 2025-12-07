import { Card, CardContent, CardHeader } from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart'

function SuccessFailurePie() {
    const data = [
        { id: 0, value: 3215, label: "success", color: "#26a69a"},   
        { id: 1, value: 478,  label: "failure", color: "#ff9800"},   
    ];

    return (
        <Card sx={{width:320, height:350}}>
            <CardHeader
                title='API STATUS'
                subheader='Success vs Failure of API calls'
            />
            <CardContent sx={{display:'flex', justifyContent: 'center'}}>
                <PieChart 
                    height={200}
                    series={[
                        {
                            data,
                            paddingAngle: 2,
                            cornerRadius: 4,
                            highlightScope: {fade: 'global', highlight: 'item'},
                            arcLabel: (item) => `${item.value.toString()}`,
                            arcLabelMinAngle: 20
                        }
                    ]}
                    sx={{
                        [`& .MuiPieArcLabel-root`]: {
                            fontWeight: 'bold',
                            fontSize: 17
                        },
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default SuccessFailurePie;