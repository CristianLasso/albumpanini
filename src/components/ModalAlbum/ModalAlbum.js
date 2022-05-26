import React, {useContext, useState} from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Swal from 'sweetalert2';
import { auth } from '../../config/firebase/firebase';
import { laminas } from '../../assets/Laminas';

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

  const inputStyle = {
    width:300
  };

export const ModalAlbum = () => {

    const state = useContext(AppContext);
    const handleClose = () => state.setOpen(false);
    const navigate = useNavigate();
    const [nameChange, setNameChange] = useState('');

    const handleName = e => setNameChange(e.target.value);

    const handleCrear = async (e) => {
        e.preventDefault();
        const newAlbum = {
          albumName:String(nameChange),
          laminasNumber: 0,
          laminas: laminas,
          userref: auth.currentUser.uid
        };
        state.setAlbumName(nameChange)
        state.setCurrentAlbum(newAlbum)
        state.setCurrentPage(1)
        handleClose()
        axios.post('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/', newAlbum)
        .then((newAlbum) => {
          console.log(newAlbum)
          setTimeout(async () =>{
            navigate("/home/album")
            state.charging()
          },6000);
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

    const handleEditar = async (e) => {
      e.preventDefault();
      console.log(state.currentAlbum)
      const newAlbum = {
        albumid: state.setCurrentAlbum.albumid,
        albumName: String(nameChange),
        laminasNumber: 0,
        laminas: state.setCurrentAlbum.laminas,
        userref: auth.currentUser.uid
      };
      state.setCurrentAlbum(newAlbum)
      state.setCurrentPage(1)
      handleClose()
      axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/' + state.currentAlbum.albumid, newAlbum)
        .then((newAlbum) => {
          console.log(newAlbum)
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
        <Modal
          open={state.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Escribe el nombre del Album:
            </Typography>
            {state.edit ?
              <form onSubmit={handleEditar}>
                <Box>
                    <Input sx={inputStyle} color="primary" type='name' placeholder='Nuevo Album' onChange={handleName} />
                </Box>
                <Button sx={{marginTop:5, marginLeft:12}} color="primary" variant="contained" type='submit' value='Crear'>Editar</Button>
              </form>
            : 
              <form onSubmit={handleCrear}>
                <Box>
                    <Input sx={inputStyle} color="primary" type='name' placeholder='Nuevo Album' onChange={handleName} />
                </Box>
                <Button sx={{marginTop:5, marginLeft:12}} color="primary" variant="contained" type='submit' value='Crear'>Crear</Button>
              </form>
            }
          </Box>
        </Modal>
    );

};