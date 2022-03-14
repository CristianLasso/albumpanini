import React, {useContext, useState} from "react";
import "./HomePage.css";
import AppContext from "../../context/AppContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/AppBar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ModalAlbum} from '../../components/ModalAlbum/ModalAlbum';
import {useGetAlbumsQuery, usePostAlbumMutation} from "../../redux/api/mainAPI";

const albumData = [
    {
        albumName: "Mi primer album",
        laminasNumber: "30",
    },
    {
        albumName: "Album secundario",
        laminasNumber: "13",
    },
    {
        albumName: "El album de mi novia",
        laminasNumber: "7",
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

    const { data: albumsData } = useGetAlbumsQuery();

    const handleSelectAlbum = (item) => {
        state.setAlbumName(item.albumName)
        navigate("/album")
    }

    const handleAgregar = () => {
        state.setOpen(true)
    }
    
    return(
        <Box>
            <AppBar/>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} variant="h4" component="h3">
                    Tus albumes son:
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {albumsData.map((album) => (
                        <Box key={album.albumName}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>handleSelectAlbum(album)}>
                                    <ListItemIcon>
                                        <AutoStoriesIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={album.albumName} secondary={album.laminasNumber + " Laminas"} />
                                </ListItemButton>
                            </ListItem>
                        </Box>
                        
                    ))}
                </List>
                <Button color="primary" sx={{marginTop:5, marginLeft:12}} variant="contained" onClick={handleAgregar}><BookmarkAddIcon fontSize={'large'}/>Agregar album</Button>
            </Box>
            <div>
                <ModalAlbum/>
            </div>
        </Box>
    );
};