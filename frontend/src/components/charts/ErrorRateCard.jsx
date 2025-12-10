import {Card, CardContent, CardHeader, Chip, Typography} from '@mui/material'

function ErrorRateCard({errorRateValue}) {
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