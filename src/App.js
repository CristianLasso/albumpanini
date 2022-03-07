import React from 'react';
import './App.css';
import {AppContextWrapper} from "./context/AppContext";

import {LoginPage} from './pages/LoginPage/LoginPage';
import {HomePage} from './pages/HomePage/HomePage';
import {AlbumPage} from './pages/AlbumPage/AlbumPage';
import {TokenPage} from './pages/TokenPage/TokenPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AppContextWrapper>
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginPage/>} />
          <Route exact path='/home' element={<HomePage/>} />
          <Route exact path='/album' element={<AlbumPage/>} />
          <Route exact path='/wallet' element={<TokenPage/>} />
        </Routes>
      </Router>
    </AppContextWrapper>
  );
}

export default App;
