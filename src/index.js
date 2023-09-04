import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import CowPage from './components/CowPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/NotFoundPage">Not Found</Link>
            </li>
            <li>
                <Link to="/CowPage">Cow Page</Link>
            </li>
          </ul>
        </nav>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/NotFoundPage" element={<NotFoundPage/>} />
            <Route path="/CowPage" element={<CowPage/>} />
        </Routes>
    </Router>
);

