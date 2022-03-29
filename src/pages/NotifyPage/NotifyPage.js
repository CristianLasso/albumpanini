import React, {useContext, useEffect, useState} from "react";
import "./NotifyPage.css";
import AppContext from "../../context/AppContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
};

export const NotifyPage = () => {
    const state = useContext(AppContext);

    const notifys = [
        {
            id: 1,
            title: 'Solicitud',
            info: 'Solicitaste 5 unidades de la lámina 53',
            soli: true,
            quantity: 5,
            lamina: '53',
            tokens: 500,
        },
        {
            id: 2,
            title: 'Compra',
            info: 'Recargaste 500 tokens! Aprovechalos',
            soli: false,
            quantity: 0,
            lamina: '',
            tokens: 0,
        },
    ]

    const handleSelectNoti = (item) => {
        console.log(item.title)
    }

    const handleCancelar = () => {
        Swal.fire({
          title: 'Cancelar solicitud',
          text: "Estas seguro de que quieres cancelar la solicitud? Tus tokens seran devueltos.",
          icon: 'warning',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
            if (result.isConfirmed) {
                var sum = parseInt(state.token + 500)
                state.setToken(sum)
                Swal.fire(
                    '¡¡Solicitud cancelada!!',
                    '¡Tu solicitud ha sido cancelada con exito y los tokens cargados a tu cuenta para que puedas seguir comprando otras láminas!',
                    'success'
                )
            }
        })
      }
    
    return(
        <Box>
            <AppBar/>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} variant="h4" component="h3">
                    Notificaciones:
                </Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {notifys?.map((noti) => (
                        <Box key={noti.id} display={'flex'} flexDirection={'row'} border={'1px solid #000'} borderRadius={1} marginBottom={1}>
                            <ListItem width={'auto'} height={'auto'} disablePadding>
                                <ListItemButton onClick={()=>handleSelectNoti(noti)}>
                                    <ListItemText primary={noti.title} secondary={noti.info} />
                                </ListItemButton>
                                
                            </ListItem>
                            {noti.soli ? <Button color="error" variant="contained" size={'large'} width={'auto'} height={'auto'} onClick={()=>handleCancelar(noti)}><CancelIcon fontSize={'small'}/>Cancelar solicitud</Button> : <div/>}
                        </Box>
                        
                    ))}
                </List>
            </Box>
        </Box>
    );
};