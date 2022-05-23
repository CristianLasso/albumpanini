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
import { auth } from '../../config/firebase/firebase';

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
        axios.get('http://localhost:8080/api/users/' + auth.currentUser.uid + '/notifys/').then(res => {setNotis(res.data)});
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
                    axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/notifys/'+ noti.notifyid, newNotify)
                    .then(() => {
                        myFunction()
                        var sum = parseInt(state.userInfo.tokens + noti.tokens)
                        state.setUser(sum)
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

    const handleAceptarOfer = (noti) => {
        console.log(noti)
        Swal.fire({
          title: 'Aceptar Oferta',
          text: "Estas seguro de que quieres aceptar la oferta?",
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
                const soliAccept = {
                    notifyid: noti.notificationid,
                    title: 'Solicitud aceptada',
                    info: "¡Tu solicitud ha sido aceptada!",
                    type: 'Aceptada',
                    cuantity: noti.cuantity,
                    lamina: noti.lamina,
                    tokens: 0,
                };
                const newNotify = {
                    notifyid: noti.notifyid,
                    title: 'Aceptada',
                    info: noti.info,
                    type: 'Aceptada',
                    cuantity: noti.cuantity,
                    lamina: noti.lamina,
                    tokens: 0,
                };
                    axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/notifys/'+ noti.notificationid, soliAccept)
                    .then((soli) => {console.log(soli)})
                    axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/notifys/'+ noti.notifyid, newNotify)
                    .then(() => {
                        myFunction()
                        axios.get('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/').then(res => {
                            var flag = false;
                            res.data?.map((album) =>{
                                const laminas = album.laminas;
                                laminas?.map((lamina) => {
                                    if(lamina.title == noti.lamina && lamina.cuantity > 0 && !flag){
                                        flag = true;
                                        var res=parseInt(lamina.cuantity) - 1
                                        const newLamina = {
                                            laminaid: lamina.laminaid,
                                            img: lamina.img,
                                            cuantity: res,
                                            filter: lamina.filter,
                                            title: lamina.title,
                                            page: lamina.page,
                                        };
                                        axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/lamina/'+ newLamina.laminaid, newLamina)
                                        .then((newLamina) => {
                                            console.log(newLamina)
                                            var sum = parseInt(state.userInfo.tokens) + noti.tokens
                                            state.setUser(sum)
                                        })
                                        .catch((error) => {console.log(error)})
                                        Swal.fire(
                                            '¡¡Oferta Aceptada!!',
                                            '¡Aceptaste la oferta por tu lámina!',
                                            'success'
                                        )
                                    }
                                })
                            })
                        });
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
          title: 'Rechazar Oferta',
          text: "Estas seguro de que quieres rechazar la oferta?",
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
                    title: 'Rechazada',
                    info: noti.info,
                    type: 'Rechazada',
                    cuantity: noti.cuantity,
                    lamina: noti.lamina,
                    tokens: 0,
                };
                    axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/notifys/'+ noti.notifyid, newNotify)
                    .then(() => {
                        myFunction()
                        Swal.fire(
                            '¡¡Oferta Rechazada!!',
                            '¡Rechazaste la oferta por tu lámina!',
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
                <List sx={{ width: '100%', maxWidth: '80%', bgcolor: 'background.paper' }}>
                    {notis?.map((noti) => (
                        <Box key={noti.id} display={'flex'} flexDirection={'row'} border={'1px solid #000'} borderRadius={1} marginBottom={1}>
                            <ListItem width={'auto'} height={'auto'} disablePadding>
                                <ListItemButton onClick={()=>handleSelectNoti(noti)}>
                                    <ListItemText primary={noti.title} secondary={noti.info} />
                                </ListItemButton>
                                
                            </ListItem>
                            {noti.type === "Solicitud" ? <Button color="error" variant="contained" size={'large'} width={'auto'} height={'auto'} onClick={()=>handleCancelarSoli(noti)}><CancelIcon fontSize={'small'}/>Cancelar solicitud</Button> : <div/>}
                            {noti.type === "Oferta" ? <Button color="success" variant="contained" size={'large'} width={'auto'} height={'auto'} onClick={()=>handleAceptarOfer(noti)}><CancelIcon fontSize={'small'}/>Aceptar Oferta</Button> : <div/>}
                            {noti.type === "Oferta" ? <Button color="error" variant="contained" size={'large'} width={'auto'} height={'auto'} onClick={()=>handleCancelarOfer(noti)}><CancelIcon fontSize={'small'}/>Cancelar Oferta</Button> : <div/>}
                        </Box>
                        
                    ))}
                </List>
            </Box>
        </Box>
    );
};