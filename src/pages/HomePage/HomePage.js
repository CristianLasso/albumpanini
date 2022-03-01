import React, {useContext, useState} from "react";
import "./HomePage.css";
import AppContext from "../../context/AppContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ImageIcon from '@mui/icons-material/Image';
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/AppBar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const albumData = [
    {
        albumName: "Mi primer album",
        albumLaminas: "30",
    },
    {
        albumName: "Album secundario",
        albumLaminas: "13",
    },
    {
        albumName: "El album de mi novia",
        albumLaminas: "7",
    },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
};

export const HomePage = () => {
    const state = useContext(AppContext);
    const navigate = useNavigate();

    const handleSelectAlbum = (item) => {
        state.setAlbumName(item.albumName)
        navigate("/album")
    }
    
    return(
        <Box>
            <AppBar/>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h4" component="h3">
                    Tus albumes son:
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {albumData.map((album) => (
                        <Box>
                            <ListItem disablePadding key={album.albumName}>
                                <ListItemButton onClick={()=>handleSelectAlbum(album)}>
                                    <ListItemIcon>
                                        <ImageIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={album.albumName} secondary={album.albumLaminas + " Laminas"} />
                                </ListItemButton>
                            </ListItem>
                        </Box>
                        
                    ))}
                </List>
            </Box>
        </Box>
    );
};