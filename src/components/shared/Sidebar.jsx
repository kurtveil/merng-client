import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const menu = (
    [
        {
            name: 'Clients',
            route: '/clients'
        },
        {
            name: 'Projects',
            route: '/projects'
        },
        {
            name: 'Products',
            route: '/products'
        },
        {
            name: 'About me',
            route: 'about-me'
        },
        {
            name: 'Billing',
            route: '/billing'
        }
    ]
);
export default function Sidebar(props) {
    const [open, setOpen] = React.useState(false);
    const themeSetting = useTheme();
    const handleDrawerClose = () => {
        setOpen(open);
        props.close(false)
    };

  return <div className='item-c'>
          
                    <DrawerHeader >
                        <IconButton onClick={handleDrawerClose} color='primary' size='large'>
                            {themeSetting.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List >
                        {menu.map((text, index) => (
                            <ListItem  key={text.name} disablePadding>
                                <ListItemButton  to={text.route}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText  primary={text.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List >
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>


    </div>
  
}
