import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Sidebar from './Sidebar';
import Drawer from '@mui/material/Drawer';
import MainRoutes from './MainRoutes';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const accountSettings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


function SwitchingTheme() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (

        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : < DarkModeIcon />}
        </IconButton>

    );
}



export default function Header({ logoutChildtoParent, themetoParent }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [open, setOpen] = useState(false);

    const [mode, setMode] = useState("dark");
    themetoParent(mode)

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            
        }),
        [mode],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );



    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const sendData = (data) => {
        setOpen(data);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileMenuOpen = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const selectSettingMenu = (event, index) => {
        if (accountSettings[index] === 'Logout') {
            logoutChildtoParent(true);
        }
        handleMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const menuGeneralId = 'primary-search-general-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {accountSettings.map((setting, index) => (
                <MenuItem key={setting} onClick={(event) => selectSettingMenu(event, index)}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );




    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <div className={` wrapper`}>
                    <CssBaseline />

                    <AppBar position="fixed" className={` item-a`} open={open}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="menu"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                                onClick={handleDrawerOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <h2 >Login</h2>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                                <SwitchingTheme />


                                <IconButton size="large" aria-label="show 4 new mails" >
                                    <Badge badgeContent={4} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"

                                >
                                    <Badge badgeContent={17} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="show 17 new notifications"

                                    aria-haspopup="true"
                                    aria-controls={menuGeneralId}
                                >
                                    <Badge badgeContent={0} color="error">
                                        <SettingsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleProfileMenuOpen}
                                >
                                    <Tooltip title={`Hi `}>
                                        <Badge sx={{ p: 0 }}>
                                            <Avatar alt='' src='' />
                                        </Badge>
                                    </Tooltip>
                                </IconButton>
                                {renderMenu}
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                    
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            }
                        }}
                        color="inherit"
                        variant="persistent"
                        anchor="left"
                        open={open}

                    >
                        <Sidebar  close={sendData} />

                    </Drawer>
                    <MainRoutes open={open} />

                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
