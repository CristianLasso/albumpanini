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

export const NotifyPage = () => {
    const state = useContext(AppContext);
    const [notis, setNotis] = useState(null);

    useEffect(() => {
        myFunction();
        return () => {
            setNotis({}); // This worked for me
        };
    }, []);

    const myFunction = () => {
        axios.get('http://localhost:8080/api/users/notifys/').then(res => {setNotis(res.data)});
    }

    const notifys = [
        {
            id: 1,
            title: 'Solicitud',
            info: 'Solicitaste 5 unidades de la lámina 53',
            solicitud: true,
            quantity: 5,
            lamina: '53',
            tokens: 500,
        },
        {
            id: 2,
            title: 'Compra',
            info: 'Recargaste 500 tokens! Aprovechalos',
            solicitud: false,
            quantity: 0,
            lamina: '',
            tokens: 0,
        },
    ]

    const handleSelectNoti = (noti) => {
        console.log(noti)
    }

    const handleCancelarSoli = (noti) => {
        console.log(noti)
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
                const newNotify = {
                    notifyid: noti.notifyid,
                    title: 'Cancelada',
                    info: noti.info,
                    type: 'Cancelada',
                    cuantity: noti.cuantity,
                    lamina: noti.lamina,
                    tokens: 0,
                };
                    axios.put('http://localhost:8080/api/users/notifys/'+ noti.notifyid, newNotify)
                    .then(() => {
                        myFunction()
                        var sum = parseInt(state.token + noti.tokens)
                        state.setToken(sum)
                        Swal.fire(
                            '¡¡Solicitud cancelada!!',
                            '¡Tu solicitud ha sido cancelada con exito y los tokens cargados a tu cuenta para que puedas seguir comprando otras láminas!',
                            'success'
                        )
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
        })
    }

    const handleCancelarOfer = (noti) => {
        console.log(noti)
        Swal.fire({
          title: 'Cancelar Oferta',
          text: "Estas seguro de que quieres cancelar la oferta? Tus láminas seran devueltas.",
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
                const newNotify = {
                    notifyid: noti.notifyid,
                    title: 'Cancelada',
                    info: noti.info,
                    type: 'Cancelada',
                    cuantity: noti.cuantity,
                    lamina: noti.lamina,
                    tokens: 0,
                };
                    axios.put('http://localhost:8080/api/users/notifys/'+ noti.notifyid, newNotify)
                    .then(() => {
                        myFunction()
                        var sum=parseInt(state.cuantityLamina) + parseInt(noti.cuantity)
                        state.setCuantityLamina(sum)
                        const newLamina = {
                            laminaid: state.laminaId,
                            img: state.imgLamina,
                            cuantity: sum,
                            filter: state.filterLamina,
                            title: state.numberLamina,
                            page: state.currentPage,
                        };
                        console.log(sum)
                        axios.put('http://localhost:8080/api/users/albums/lamina/'+ state.laminaId, newLamina)
                        .then((newLamina) => {console.log(newLamina)})
                        .catch((error) => {console.log(error)})
                        Swal.fire(
                            '¡¡Oferta cancelada!!',
                            '¡Tu oferta ha sido cancelada con exito y las lámians devueltas a tu cuenta!',
                            'success'
                        )
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
        })
    }
    
    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "center",}}>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} variant="h4" component="h3">
                    Notificaciones:
                </Typography>
                <List sx={{ width: '100%', maxWidth: '60%', bgcolor: 'background.paper' }}>
                    {notis?.map((noti) => (
                        <Box key={noti.id} display={'flex'} flexDirection={'row'} border={'1px solid #000'} borderRadius={1} marginBottom={1}>
                            <ListItem width={'auto'} height={'auto'} disablePadding>
                                <ListItemButton onClick={()=>handleSelectNoti(noti)}>
                                    <ListItemText primary={noti.title} secondary={noti.info} />
                                </ListItemButton>
                                
                            </ListItem>
                            {noti.type === "Solicitud" ? <Button color="error" variant="contained" size={'large'} width={'auto'} height={'auto'} onClick={()=>handleCancelarSoli(noti)}><CancelIcon fontSize={'small'}/>Cancelar solicitud</Button> : <div/>}
                            {noti.type === "Oferta" ? <Button color="error" variant="contained" size={'large'} width={'auto'} height={'auto'} onClick={()=>handleCancelarOfer(noti)}><CancelIcon fontSize={'small'}/>Cancelar Oferta</Button> : <div/>}
                        </Box>
                        
                    ))}
                </List>
            </Box>
        </Box>
    );
};