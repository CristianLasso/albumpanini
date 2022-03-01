import React from 'react';
import './App.css';
import {AppContextWrapper} from "./context/AppContext";

import {LoginPage} from './pages/LoginPage/LoginPage';
import {HomePage} from './pages/HomePage/HomePage';
import {AlbumPage} from './pages/AlbumPage/AlbumPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AppContextWrapper>
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginPage/>} />
          <Route exact path='/home' element={<HomePage/>} />
          <Route exact path='/album' element={<AlbumPage/>} />
        </Routes>
      </Router>
    </AppContextWrapper>
  );
}

export default App;
