import {Box, Button, Card, Typography} from '@mui/material'
import icon from '../assets/icons/icon.png'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const loginSignupBox = <Box sx={{
                display:'flex', 
                justifyContent:'center',
                alignItems:'center',
                padding:4,
                gap:2}}>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#0f172a" }}}
                    onClick={()=>{navigate("/login")}}>
                    Log in</Button>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }}}
                    onClick={()=>{navigate("/signup")}}>
                    Sign up</Button>
            </Box>
    const projectsButton = <Box sx={{
                display:'flex', 
                justifyContent:'center',
                alignItems:'center',
                padding:4,
                gap:2}}>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#0f172a" }}}
                    onClick={()=>{navigate("/projects")}}>
                    Check projects</Button>
                <Button variant='contained' size="large" sx={{ bgcolor: "#1e293b","&:hover": { bgcolor: "#0f172a" }}}
                    onClick={()=>{navigate("/projects/new-project")}}>
                    Add project</Button>
            </Box>
    return (
        <Card sx={{p: 4, textAlign: "center", color: "black", border:'none', boxShadow:'none'}}>
            <img src={icon} alt="icon" style={{display: "block", margin: "0 auto", width: 200, height: 200}} />
            <Typography variant="h2" mt={3}>
                Monitor and track your <br />
                APIs instantly.
            </Typography>
            <Typography variant="h5" mt={2} color="gray.300">
                Lightweight, developer-first API monitoring with <br />
                real-time metrics and zero setup overhead.
            </Typography>
            {(localStorage.getItem("token")) ? projectsButton : loginSignupBox}
        </Card>

    )
}

export default Home;