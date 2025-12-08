import {Card, CardContent, CardHeader, Chip, Typography} from '@mui/material'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ErrorRateCard() {
    const {project_id} = useParams()
    const [errorRateValue, setErrorRateValue] = useState(0)
    useEffect(()=>{
        const getErrorRate = async() => {
            const res = 2.67 // frm api 
            setErrorRateValue(res)
        }
        getErrorRate();
    }
    ,[project_id])
    const healthComment = 
        errorRateValue < 10 ? 'Healthy' :
        errorRateValue < 50 ? 'Warning' :
        'Critical';
    return(
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardHeader 
                title= 'ERROR RATE'
                subheader= 'Percentage of unsuccessful API calls'
                action={<Chip 
                    label={healthComment}
                    size='small'
                    color={
                        healthComment === 'Healthy' ? 'success':
                        healthComment === 'Warning' ? 'warning':
                        'error'
                    }/>}
                />
            
            <CardContent sx={{display: 'flex', alignItems:'baseline', gap:1}}>
                <Typography variant='h3'>{errorRateValue}%</Typography>
                <Typography variant='body2'>last 24H</Typography>
            </CardContent>
        </Card>
    );

}
export default ErrorRateCard