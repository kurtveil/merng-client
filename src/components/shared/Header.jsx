import * as React from 'react';
import { createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import MainRoutes from './MainRoutes';
import Sidebar from './Sidebar';
import SwitchingTheme from './SwitcherTheme';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useMemo } from 'react';
const accountSettings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const drawerWidth = 240;
const menuGeneralId = 'primary-search-general-menu';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header({ logoutChildtoParent }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const themeStorage = localStorage.getItem('theme');
    const [mode, setMode] = useState(themeStorage);
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const selectSettingMenu = (event, index) => {
        if (accountSettings[index] === 'Logout') {
            logoutChildtoParent(true);
        }
        handleDrawerClose();
    };

    const themePreference = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
    
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            
        }),
    );

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuGeneralId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleDrawerClose}
        >
            {accountSettings.map((setting, index) => (
                <MenuItem key={setting} onClick={(event) => selectSettingMenu(event, index)}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    

    const sendData = (data) => {
        setOpen(data);
    }

    return (
        <ColorModeContext.Provider value={colorMode}>

            <ThemeProvider theme={themePreference}>

          
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Persistent
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <SwitchingTheme colorModContxt={ColorModeContext} />


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
                            aria-controls={menuGeneralId}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleDrawerOpen}
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
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Sidebar close={sendData} />
            </Drawer>
            <Main open={open} >
                <MainRoutes  open={open} />
            </Main>
        </Box>
        </ThemeProvider>
        </ColorModeContext.Provider>
    );
}