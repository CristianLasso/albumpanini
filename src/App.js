import React from 'react';
import './App.css';
import {AppContextWrapper} from "./context/AppContext";

import {LoginPage} from './pages/LoginPage/LoginPage';
import {SignupPage} from './pages/SignupPage/SignupPage';
import {HomePage} from './pages/HomePage/HomePage';
import {AlbumPage} from './pages/AlbumPage/AlbumPage';
import {TokenPage} from './pages/TokenPage/TokenPage';
import {NotifyPage} from './pages/NotifyPage/NotifyPage';
import {PricePage} from './pages/PricePage/PricePage';
import AppBar from './components/AppBar/AppBar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AppContextWrapper>
      <Router>
        
        <Routes>
          <Route exact path='/' element={<LoginPage/>} />
          <Route exact path='/register' element={<SignupPage/>} />
          <Route exact path='/home' element={
            <div>
              <AppBar/>
              <HomePage/>
            </div>} 
          />
          <Route exact path='/album' element={
            <div>
              <AppBar/>
              <AlbumPage/>
            </div>} 
          />
          <Route exact path='/wallet' element={
            <div>
              <AppBar/>
              <TokenPage/>
            </div>} 
          />
          <Route exact path='/notifys' element={
            <div>
              <AppBar/>
              <NotifyPage/>
            </div>} 
          />
          <Route exact path='/prices' element={
            <div>
              <AppBar/>
              <PricePage/>
            </div>} 
          />
        </Routes>
      </Router>
    </AppContextWrapper>
  );
}

export default App;
