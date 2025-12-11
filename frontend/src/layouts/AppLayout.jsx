import { useNavigate, Outlet } from "react-router-dom";
import Profile from "../components/Profile";
import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import icon16 from "../assets/icons/icon.png";

function AppLayout() {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1e293b", fontFamily:"monospace"}}>
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <IconButton edge="start" aria-label="logo" onClick={() => navigate("/")}>
            <img src={icon16} alt="icon" style={{ width: 60, height: 60 }} />
          </IconButton>

          <Typography color="white" variant="h5" sx={{ flexGrow: 1, pl: 1}}>
            Lightweight API Monitor
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button variant="outline" onClick={() => navigate("/projects")} sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#0f172a" }}}>
              Projects
            </Button>

            <Button variant="outline" onClick={() => navigate(`/${user_id}/user-api-keys`)} sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#0f172a" }}}>
              API Keys
            </Button>

            <Button variant="outline" onClick={() => navigate("/getting-started")} sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#0f172a" }}}>
              Getting Started
            </Button>

            <IconButton onClick={() => setOpenProfile((s) => !s)} sx={{ p: 0 }}>
                <Avatar sx={{ width: 44, height: 44 }}>
                    <PersonIcon/>
                </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {openProfile && <Profile onClose={() => setOpenProfile(false)} />}

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
