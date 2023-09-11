import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/HomePage';
import CowPage from './components/CowPage';
import FiveCrowns from './components/FiveCrowns/FiveCrowns';
import './index.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router basename="/cow-game">
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Road Games</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/FiveCrowns">Five Crowns</Nav.Link>
                        <Nav.Link as={Link} to="/CowPage">Cow Game</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/CowPage" element={<CowPage/>} />
            <Route path="/FiveCrowns" element={<FiveCrowns/>} />
        </Routes>
    </Router>
);

