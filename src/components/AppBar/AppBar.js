import {useState,useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
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

    const handleNotifications = () => {
      console.log('Notificaciones')
    };

    const handleWallet = () => {
      state.setAlbumName('Tu billetera')
      navigate('/wallet')
    };

  return (
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {state.albumName}
          </Typography>
          <IconButton className='button' color="inherit" onClick={handleAlbums}>
            <Badge badgeContent={0} color="error">
              <LibraryBooksIcon />
            </Badge>
          </IconButton>
          <IconButton className='button' color="inherit" onClick={handleNotifications}>
            <Badge badgeContent={5} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className='button' color="inherit" onClick={handleWallet}>
            <Badge badgeContent={0} color="error">
              <AccountBalanceWalletIcon />
            </Badge>
          </IconButton>
          <IconButton className='button' color="inherit" onClick={handleLogout}>
            <Badge badgeContent={0} color="error">
              <NoAccountsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
  );
}