import { useNavigate, Outlet } from "react-router-dom";
import Profile from "../components/Profile";
import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Box, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import icon16 from "../assets/icons/icon.png";

function AppLayout() {
  const [openProfile, setOpenProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1e293b", fontFamily:"monospace"}}>
        <Toolbar sx={{ display: "flex", gap: { xs: 1, sm: 2, md: 2 }, padding: { xs: '8px 16px', sm: '8px 24px', md: '8px 32px' } }}>
          <IconButton edge="start" aria-label="logo" onClick={() => navigate("/")} sx={{ p: 0 }}>
            <img src={icon16} alt="icon" style={{ width: 50, height: 50 }} />
          </IconButton>

          <Typography color="white" variant="h5" sx={{ flexGrow: 1, pl: { xs: 1, sm: 2 }, display: { xs: 'none', sm: 'block' }, fontSize: { xs: '18px', sm: '20px', md: '24px' }}}>
            Lightweight API Monitor
          </Typography>

          {/* Desktop Navigation Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: "center" }}>
            <Button variant="outlined" onClick={() => navigate("/projects/new-project")} sx={{ bgcolor: "#1e293b", color: "white", borderColor: "#64748b", "&:hover": { bgcolor: "#0f172a", borderColor: "#e2e8f0" }, fontSize: { md: '14px' } }}>
              Add Project
            </Button>

            <Button variant="outlined" onClick={() => navigate("/projects")} sx={{ bgcolor: "#1e293b", color: "white", borderColor: "#64748b", "&:hover": { bgcolor: "#0f172a", borderColor: "#e2e8f0" }, fontSize: { md: '14px' } }}>
              Projects
            </Button>

            <Button variant="outlined" onClick={() => navigate(`/${user_id}/user-api-keys`)} sx={{ bgcolor: "#1e293b", color: "white", borderColor: "#64748b", "&:hover": { bgcolor: "#0f172a", borderColor: "#e2e8f0" }, fontSize: { md: '14px' } }}>
              API Keys
            </Button>

            <Button variant="outlined" onClick={() => navigate("/getting-started")} sx={{ bgcolor: "#1e293b", color: "white", borderColor: "#64748b", "&:hover": { bgcolor: "#0f172a", borderColor: "#e2e8f0" }, fontSize: { md: '14px' } }}>
              Getting Started
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton 
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{ marginTop: '40px' }}
          >
            <MenuItem onClick={() => { navigate("/projects/new-project"); setAnchorEl(null); }}>
              Add Project
            </MenuItem>
            <MenuItem onClick={() => { navigate("/projects"); setAnchorEl(null); }}>
              Projects
            </MenuItem>
            <MenuItem onClick={() => { navigate(`/${user_id}/user-api-keys`); setAnchorEl(null); }}>
              API Keys
            </MenuItem>
            <MenuItem onClick={() => { navigate("/getting-started"); setAnchorEl(null); }}>
              Getting Started
            </MenuItem>
          </Menu>

          <IconButton onClick={() => setOpenProfile((s) => !s)} sx={{ p: 0 }}>
              <Avatar sx={{ width: 44, height: 44, bgcolor: "#0f172a" }}>
                  <PersonIcon/>
              </Avatar>
          </IconButton>
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
