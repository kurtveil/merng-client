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




export default function MainRoutes({ open }) {
    return (
        <Router>
            <div className={`py-5`}>
                    <Routes >
                        <Route path='/' element={<Home />} />
                        <Route path='/projects/:id' element={<Project />} />
                        <Route path='projects' element={<Projects />} />
                        <Route path='products' element={<Products />} />
                        <Route path='clients' element={<Clients />} />
                        <Route path='billing' element={<Billing />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
            </div>
        </Router>
    )
}
