import React, {useContext, useState} from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {useGetAlbumsQuery, usePostAlbumMutation} from "../../redux/api/mainAPI";

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
    
    const [createAlbum] = usePostAlbumMutation();

    const handleCrear = async (e) => {
        e.preventDefault();
        console.log("Creado")
        state.setAlbumName(nameChange)
        handleClose()
        navigate('/album')
        const album = {
          albumName: {nameChange},
          laminasNumber: 0,
        };
        const { error: postAlbumError } = await createAlbum(
          album
        );
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
              Escribe el nombre de tu nuevo Album:
            </Typography>
            <form onSubmit={handleCrear}>
                <Box>
                    <Input sx={inputStyle} color="primary" type='name' placeholder='Nuevo Album' onChange={handleName} />
                </Box>
                <Button sx={{marginTop:5, marginLeft:12}} color="primary" variant="contained" type='submit' value='Crear'>Crear</Button>
            </form>
          </Box>
        </Modal>
    );

};