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
    margin: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    flexWrap: 'wrap',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flex: 1,
    flexDirection: 'column',
};

export const HomePage = () => {
    var lam;
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

    const countLam = (album) => {
        lam = 0;
        for(var i=0; i<album.laminas.length; i++){
            lam = lam + album.laminas[i].cuantity;
        }
        console.log(lam)
    }

    const handleSelectAlbum = (item) => {
        state.setAlbumName(item.albumName)
        state.setCurrentAlbum(item)
        state.setCurrentPage(1)
        console.log(item)
        setTimeout(async () =>{
            navigate("/home/album")
        },2000);
    }

    const handleAgregar = () => {
        state.setOpen(true)
    }
    
    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "center",}}>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} variant="h4" component="h3">
                    Tus albumes son:
                </Typography>
                <List sx={{ width: '100%', maxWidth: '60%', bgcolor: 'background.paper' }}>
                    {albums?.map((album) => (
                        <Box key={album.albumid} display={'flex'} flexDirection={'row'} border={'1px solid #000'} borderRadius={1} marginBottom={1}>
                            <ListItem>
                                <ListItemButton onClick={()=>handleSelectAlbum(album)}>
                                    <ListItemIcon>
                                        <AutoStoriesIcon />
                                    </ListItemIcon>
                                    {countLam(album)}
                                    <ListItemText primary={album.albumName} secondary={'Tienes ' + lam + ' láminas en este álbum'} />
                                </ListItemButton>
                            </ListItem>
                        </Box>
                        
                    ))}
                </List>
                <Button color="primary" sx={{marginTop:5}} variant="contained" onClick={handleAgregar}><BookmarkAddIcon fontSize={'large'}/>Agregar album</Button>
            </Box>
            <div>
                <ModalAlbum/>
            </div>
        </Box>
    );
};