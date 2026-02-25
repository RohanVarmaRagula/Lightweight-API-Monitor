import {Box, Button, Card, Typography} from '@mui/material'
import icon from '../assets/icons/icon.png'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const loginSignupBox = <Box sx={{
                display:'flex', 
                justifyContent:'center',
                alignItems:'center',
                flexDirection: { xs: 'column', sm: 'row' },
                padding: { xs: 2, sm: 3, md: 4 },
                gap: { xs: 1.5, sm: 2, md: 2 },
                width: '100%'}}>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#0f172a" }, width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: '100%', sm: '200px' }}}
                    onClick={()=>{navigate("/login")}}>
                    Log in</Button>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }, width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: '100%', sm: '200px' }}}
                    onClick={()=>{navigate("/signup")}}>
                    Sign up</Button>
            </Box>;
    const projectsButton = <Box sx={{
                display:'flex', 
                justifyContent:'center',
                alignItems:'center',
                flexDirection: { xs: 'column', sm: 'row' },
                padding: { xs: 2, sm: 3, md: 4 },
                gap: { xs: 1.5, sm: 2, md: 2 },
                width: '100%'}}>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#0f172a" }, width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: '100%', sm: '200px' }}}
                    onClick={()=>{navigate("/projects")}}>
                    Check projects</Button>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }, width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: '100%', sm: '200px' }}}
                    onClick={()=>{navigate("/projects/new-project")}}>
                    Add project</Button>
            </Box>;
    return (
        <Card sx={{p: { xs: 2, sm: 3, md: 4 }, textAlign: "center", color: "black", border:'none', boxShadow:'none'}}>
            <img src={icon} alt="icon" style={{display: "block", margin: "0 auto", width: '100%', maxWidth: 200, height: 'auto'}} />
            <Typography variant="h2" mt={3} sx={{ fontSize: { xs: '28px', sm: '36px', md: '44px' }, lineHeight: { xs: 1.3, md: 1.2 } }}>
                Monitor and track your <br />
                APIs instantly.
            </Typography>
            <Typography variant="h5" mt={2} color="gray.300" sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' }, lineHeight: { xs: 1.4, md: 1.5 } }}>
                Lightweight, developer-first API monitoring with <br />
                real-time metrics and zero setup overhead.
            </Typography>
            {(localStorage.getItem("token")) ? projectsButton : loginSignupBox}
        </Card>

    )
}

export default Home;