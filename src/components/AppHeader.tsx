import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useProSidebar } from "react-pro-sidebar";
import { useState } from "react";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteLocalStorage =()=>{
    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
    }
    if(localStorage.getItem("user")){
      localStorage.removeItem("user");
    }
    
  }
  const handleLogout = () => {
    setAnchorEl(null);
    deleteLocalStorage()
    navigate("/");
  };

  const CompteMenuItem = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        {/* <Box component="img" sx={styles.appLogo} src="/src/assets/logo.png" /> */}
        {/* <Box
          component="img"
          sx={styles.appLogo}
          src="/src/assets/logo-removebg2.png"
        /> */}
        <Box/>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          sx={{color :'dark'}}
        >
          <MenuTwoToneIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton title="Notifications" sx={{color :'dark'}}>
          <Badge badgeContent={4} color="error">
            <NotificationsTwoToneIcon />
          </Badge>
        </IconButton>

        <IconButton title="Settings" sx={{color :'dark'}}>
          <SettingsTwoToneIcon />
        </IconButton>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, background:"green" }}>M</Avatar>
          </IconButton>
        </Tooltip>

        {/* Contenu Menu ItEM */}
        <CompteMenuItem />
        {/* ===Fin contenu menu ITEM */}
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: "neutral.light",
  },
  // appBar: {
  //     bgcolor: "white.light",
  //   },
  appLogo: {
    borderRadius: 2,
    width: 170,
    ml: 2,
    cursor: "pointer",
  },
};

export default AppHeader;