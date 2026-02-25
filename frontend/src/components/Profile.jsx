import { useNavigate } from "react-router-dom";
import { Paper, Typography, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, ClickAwayListener} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

function Profile({ onClose }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const email = localStorage.getItem("email") ?? "";

  const logout = () => {
    localStorage.clear();
    onClose();
    navigate("/");
  };

  const goToLogIn = () => {
    onClose();
    navigate("../login");
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Paper elevation={8} role="menu" sx={{
            position: "absolute",    
            top: { xs: 60, sm: 65, md: 70 },
            right: { xs: 8, sm: 16, md: 32 },
            minWidth: { xs: 200, sm: 220, md: 240 },
            maxWidth: { xs: 'calc(100vw - 16px)', sm: '240px', md: '240px' },
            borderRadius: 2.75,      
            border: "1px solid",
            borderColor: "grey.300",
            zIndex: 1400,
            overflow: "hidden",
            background: (theme) =>
                `radial-gradient(circle at top left, rgba(56,189,248,0.08), transparent 55%), ${theme.palette.background.paper}`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 22px 40px rgba(0,0,0,0.12)",
        }}>
        <Paper component="div" square elevation={0} sx={{
            px: 2,
            py: 1,
            borderBottom: "1px solid",
            borderColor: "grey.200",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            background: "transparent",
            }}>
            <Typography variant="body2">
                {email || "Not signed in"}
            </Typography>
        </Paper>

        <MenuList dense>
          {isLoggedIn ? (
            <MenuItem onClick={logout} sx={{ gap: 1 }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Log out</Typography>
              </ListItemText>
            </MenuItem>
          ) : (
            <MenuItem onClick={goToLogIn} sx={{ gap: 1 }}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Log in</Typography>
              </ListItemText>
            </MenuItem>
          )}

          <Divider sx={{ my: 0.5 }} />
        </MenuList>
      </Paper>
    </ClickAwayListener>
  );
}

export default Profile;
