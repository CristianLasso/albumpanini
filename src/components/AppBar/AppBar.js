import {useContext, useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import "./AppBar.css"
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

import {auth} from "../../config/firebase/firebase";

import axios from 'axios';

export default function ButtonAppBar() {
    const state = useContext(AppContext);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState('');

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
      state.getUser(auth.currentUser.uid);
      console.log(state.userInfo);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const [notis, setNotis] = useState(0);

    useEffect(() => {
        myFunction();
        return () => {
            setNotis({});
        };
    }, [state.userNotis]);

    const myFunction = () => {
        axios.get('http://localhost:8080/api/users/notifys/').then(res => {setNotis(res.data.length)
        console.log(res.data.length)});
    }

    const handleLogout = async () => {
      try {
        await logout();
        handleClose();
        state.setAlbumName('Tus albumes')
        navigate('/');
      } catch (error) {
        setError('Server Error')
      }
    }
    
    const handleAlbums = () => {
      handleClose();
      state.setAlbumName('Tus albumes')
      navigate('/home/albums')
    };

    const handleNotifications = () => {
      state.setAlbumName('Notificaciones')
      navigate('/home/notifys')
    };

    const handleWallet = () => {
      handleClose();
      state.setAlbumName('Tu billetera')
      navigate('/home/wallet')
    };

    const handlePrice = () => {
      state.setAlbumName('Precios láminas')
      navigate('/home/prices')
    };

  return (
      <AppBar position='fixed'>
        <Toolbar>
          <SportsSoccerIcon sx={{paddingRight: 1, fontSize: 45}} />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {state.albumName}
          </Typography>
          <IconButton className='button' color="inherit" onClick={handleNotifications}>
            <Badge badgeContent={notis} color="error">
              <NotificationsIcon fontSize="large" />
            </Badge>
          </IconButton>
          <div>
            <IconButton className='button' color="inherit" onClick={handleMenu}>
              <Badge badgeContent={0} color="error">
                <MoreVertIcon fontSize="large" />
              </Badge>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Typography variant="h6" component="div" sx={{ paddingLeft:1 }} borderBottom={"1px solid rgba(4, 125, 255, 0.2)"}>
                  <AccountCircleIcon/>{state.userInfo.name} {state.userInfo.lastName}
                </Typography>
                <MenuItem onClick={handleAlbums}><LibraryBooksIcon fontSize="small" />Mis albumes</MenuItem>
                <MenuItem onClick={handleWallet}><AccountBalanceWalletIcon fontSize="small" />Mi billetera</MenuItem>
                {state.userInfo.admin ? <MenuItem onClick={handlePrice}><PaidIcon fontSize="small" />Precios de venta</MenuItem> : ""}
                <MenuItem onClick={handleLogout}><NoAccountsIcon fontSize="small" />Salir</MenuItem>
              </Menu>
          </div>

        </Toolbar>
      </AppBar>
  );
}