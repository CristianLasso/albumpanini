import {useState,useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./AppBar.css"
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function ButtonAppBar() {
    const state = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
      state.setAlbumName('Tus albumes')
      navigate('/');
    }
    
    const handleAlbums = () => {
      state.setAlbumName('Tus albumes')
      navigate('/home')
    };

  return (
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {state.albumName}
          </Typography>
          <Button className="button" onClick={handleAlbums} color="inherit" startIcon={<AutoAwesomeMotionIcon fontSize="large"/>}>Mis albumes</Button>
          <Button className="button" onClick={handleLogout} color="inherit" startIcon={<AccountCircleIcon fontSize="large"/>}>Salir</Button>
        </Toolbar>
      </AppBar>
  );
}