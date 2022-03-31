import React, {useContext, useState, useEffect} from "react";
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

import axios from 'axios';


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
    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        myFunction();
        return () => {
            setAlbums({}); // This worked for me
        };
    }, []);

    const myFunction = () => {
        axios.get('http://localhost:8080/api/users/albums/').then(res => {setAlbums(res.data)});
    }

    const handleSelectAlbum = (item) => {
        state.setAlbumName(item.albumName)
        state.setCurrentAlbum(item)
        console.log(item)
        setTimeout(async () =>{
            navigate("/album")
        },2000);
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
                    {albums?.map((album) => (
                        <Box key={album.albumid} display={'flex'} flexDirection={'row'} border={'1px solid #000'} borderRadius={1} marginBottom={1}>
                            <ListItem>
                                <ListItemButton onClick={()=>handleSelectAlbum(album)}>
                                    <ListItemIcon>
                                        <AutoStoriesIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={album.albumName} secondary={album.laminasnumber + " Laminas"} />
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