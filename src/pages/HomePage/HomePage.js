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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/AppBar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ModalAlbum} from '../../components/ModalAlbum/ModalAlbum';
import { auth } from '../../config/firebase/firebase';

import Swal from 'sweetalert2';
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
        axios.get('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/').then(res => {setAlbums(res.data)});
    }

    const countLam = (album) => {
        lam = 0;
        for(var i=0; i<album.laminas.length; i++){
            lam = lam + album.laminas[i].cuantity;
        }
    }

    const handleSelectAlbum = (item) => {
        state.setAlbumName(item.albumName)
        state.setCurrentAlbum(item)
        state.setCurrentPage(1)
        state.charging()
        setTimeout(async () =>{
            navigate("/home/album")
        },2000);
    }

    const handleAgregar = () => {
        state.setOpen(true)
    }

    const handleEditar = (item) => {
        state.setCurrentAlbum(item)
        state.setEdit(true)
        state.setOpen(true)
    }

    const handleEliminar = (item) => {
        axios.delete('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/' + item.albumid)
        .then((album) => {
          console.log(album)
        })
        .catch((error) => {
          console.log(error)
          return (Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Parece que algo salio mal!',
            confirmButtonColor: 'primary',
            confirmButtonText: "Entendido!"
          }))
        })
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
                                <Button color="primary" variant="contained" onClick={()=>handleEditar(album)} ><EditIcon fontSize={'small'}/></Button>
                                <Button sx={{marginLeft:2}} color="primary" variant="contained" onClick={()=>handleEliminar(album)} ><DeleteForeverIcon fontSize={'small'}/></Button>
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