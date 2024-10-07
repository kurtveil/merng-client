import { IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
export default function SwitchingTheme({colorModContxt}) {
    const theme = useTheme();
    const colorMode = useContext(colorModContxt);
    localStorage.setItem('theme', theme.palette.mode);
    return (
  
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <LightModeIcon /> : < DarkModeIcon />}
      </IconButton>
  
    );
  }