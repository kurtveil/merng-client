import React from 'react'
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../../pages/Home';
import Projects from '../projects/Projects';
import Products from '../products/Products';
import Clients from '../clients/Clients';
import Project from '../../pages/Project';
import NotFound from '../../pages/NotFound';
import Billing from '../../pages/Billing';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

export default function MainRoutes({open}) {
  return (
    <Router>
    <div className={`item-b`}>
    <Main open={open} >
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/projects/:id' element={<Project />} />
            <Route path='projects' element={<Projects />} />
            <Route path='products' element={<Products  />} />
            <Route path='clients' element={<Clients  />} />
            <Route path='billing' element={<Billing  />} />
            <Route path='*' element={<NotFound  />} />
        </Routes>
    </Main>
</div>
</Router>
  )
}
