import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../context/AppContext";
import Swal from 'sweetalert2'
import { auth } from '../../config/firebase/firebase';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: '25px',
  };

export const ModalLamina = () => {

    const state = useContext(AppContext);
    const handleClose = () => state.setOpen(false);

    const handleMinus = async () => {
      var rest=parseInt(state.cuantityLamina)-1
      if(rest<0){
        rest=0
      }else{
        state.setCuantityLamina(rest)
        const newLamina = {
          laminaid: state.laminaId,
          img: state.imgLamina,
          cuantity: rest,
          filter: state.filterLamina,
          title: state.numberLamina,
          page: state.currentPage,
        };
        axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/lamina/'+ state.laminaId, newLamina)
        .then((newLamina) => {console.log(newLamina)})
        .catch((error) => {console.log(error)})
      }
    }

    const handlePlus = async () => {
      var sum=parseInt(state.cuantityLamina)+1
      state.setCuantityLamina(sum)
      const newLamina = {
        laminaid: state.laminaId,
        img: state.imgLamina,
        cuantity: sum,
        filter: state.filterLamina,
        title: state.numberLamina,
        page: state.currentPage,
      };
      axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/lamina/'+ state.laminaId, newLamina)
      .then((newLamina) => {console.log(newLamina)})
      .catch((error) => {console.log(error)})
    }

    const handlePegar = async () => {
      var rest=parseInt(state.cuantityLamina)-1
      if(rest<0){
        rest=0
      }else{
        state.setFilterLamina(true)
        const newLamina = {
          laminaid: state.laminaId,
          img: state.imgLamina,
          cuantity: rest,
          filter: true,
          title: state.numberLamina,
          page: state.currentPage,
        };
        console.log(newLamina)
        axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/lamina/'+ state.laminaId, newLamina)
        .then((newLamina) => {console.log(newLamina)})
        .catch((error) => {console.log(error)})
      }
      state.setCuantityLamina(rest)
    }

    const handleSolicitar = async () => {
      handleClose()
      Swal.fire({
        title: 'Esta lámina tiene un costo de ' + state.priceLamina + ' tokens',
        text: "Seguro que la quieres solicitar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar solicitud'
      }).then((result) => {
        if (result.isConfirmed){
          var rest=parseInt(state.userInfo.tokens)-parseInt(state.priceLamina)
          if(rest<0){
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Parece que no tienes suficientes tokens, deberías comprar algunos!'
            })
          }
          if(rest>=0){
            const newNotify = {
              title: 'Solicitud',
              info: 'Solicitaste la lámina ' + state.numberLamina,
              type: 'Solicitud',
              cuantity: 1,
              lamina: state.numberLamina,
              tokens: parseInt(state.priceLamina),
            };
            axios.post('http://localhost:8080/api/users/' + auth.currentUser.uid + '/notifys/', newNotify)
            .then((newNotify) =>{
              console.log(newNotify.data.notifyid)
              Swal.fire(
                '¡¡Solicitud realizada!!',
                'Espera mientras comprobamos nuestras existencias para reflejar tu compra, si no podemos conseguirla devolveremos tus tokens',
                'success'
              )
              searchSoli(newNotify.data.notifyid);
              state.setUser(rest)
            })
            .catch((error) =>{
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
        }
      })
    }

    const searchSoli = async (soliId) => {
      console.log('searchSoli')
      axios.get('http://localhost:8080/api/users/')
      .then(res => {
        console.log(res.data);
        setTimeout(async () =>{
          console.log('Timeout');
          res.data?.map((user) =>{
            const albums = user.albums;
            albums?.map((album) => {
              console.log('albumes')
              const laminas = album.laminas;
              laminas?.map((lamina) => {
                console.log('laminas')
                if(lamina.title == state.numberLamina){
                  if(lamina.cuantity > 0){
                    const newNotify = {
                      title: 'Oferta',
                      info: 'Hay una persona buscando la lámina ' + state.numberLamina + ' quieres venderla por ' + state.priceLamina + ' tokens?',
                      type: 'Oferta',
                      cuantity: 1,
                      lamina: state.numberLamina,
                      tokens: parseInt(state.priceLamina),
                      notificationid: parseInt(soliId),
                    };
                    axios.post('http://localhost:8080/api/users/' + album.userref + '/notifys/', newNotify)
                    .then((newNotify) =>{
                      console.log(newNotify)
                    })
                  }
                }
              })
            })
          })
        },2000);
      });
    }

    const handleOfertar = async () => {
      handleClose()
      Swal.fire({
        title: 'Esta lámina tiene un costo de ' + state.priceLamina + ' tokens',
        text: "Especifica cuantas unidades de esta lámina quieres ofertar",
        icon: 'warning',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar oferta'
      }).then((result) => {
        if (result.isConfirmed){
          var rest=parseInt(state.cuantityLamina) - parseInt(result.value)
          if(rest<0){
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Parece que no tienes suficientes unidades de esta lámina, deberías ofertar menos!'
            })
          }
          if(rest>=0){
            const newNotify = {
              title: 'Oferta',
              info: 'Ofertaste ' + result.value + ' unidades de la lámina ' + state.numberLamina,
              type: 'Oferta',
              cuantity: parseInt(result.value),
              lamina: parseInt(state.numberLamina),
              tokens: parseInt(state.priceLamina) * parseInt(result.value),
            };
            axios.post('http://localhost:8080/api/users/' + auth.currentUser.uid + '/notifys/', newNotify)
            .then((newNotify) =>{
              console.log(newNotify)
              Swal.fire(
                '¡¡Oferta realizada!!',
                'Espera mientras encontramos una persona interesada en tus láminas para reflejar tu pago!!',
                'success'
              )
              state.setCuantityLamina(rest)
              const newLamina = {
                laminaid: state.laminaId,
                img: state.imgLamina,
                cuantity: rest,
                filter: state.filterLamina,
                title: state.numberLamina,
                page: state.currentPage,
              };
              axios.put('http://localhost:8080/api/users/' + auth.currentUser.uid + '/albums/lamina/'+ state.laminaId, newLamina)
              .then((newLamina) => {console.log(newLamina)})
              .catch((error) => {console.log(error)})
            })
            .catch((error) =>{
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
        }
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
              {state.numberLamina}
            </Typography>
            <Box
                  sx={{
                    direction: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    height: 'auto',
                    borderRadius: 1,
                    flexGrow: 1,
                    paddingTop: '20px',
                  }}>
              <img
                  key={state.imgLamina}
                  className={`banner ${state.filterLamina ? "sin-filtro" : "filtro-bn"}`}
                  width={'auto'}
                  height={'auto'}
                  border={'3px solid #000'}
                  src={`${state.imgLamina}?w=248&fit=crop&auto=format`}
                  srcSet={`${state.imgLamina}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={state.numberLamina}
                  loading="lazy"
              />
            </Box>
            <Box>
              <Grid container columns={3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                    direction: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    height: 'auto',
                    borderRadius: 1,
                    flexGrow: 1,
                    paddingTop: '20px',
                  }}>
                <Grid item >
                  <Button color="primary" variant="contained" onClick={handleMinus}>-</Button>
                </Grid>
                <Grid item >
                  <h3 id="modal-modal-description">
                    {state.cuantityLamina}
                  </h3>
                </Grid>
                <Grid item >
                  <Button color="primary" variant="contained" onClick={handlePlus}>+</Button>
                </Grid>
              </Grid>
            </Box>
            <Button color="primary" variant="contained" onClick={handlePegar}>Pegar</Button>
            <Button color="primary" variant="contained" sx={{marginLeft:5}} onClick={handleSolicitar}>Solicitar lámina</Button>
            {state.cuantityLamina > 0 ? <Button color="primary" variant="contained" sx={{marginLeft:5}} onClick={handleOfertar}>Ofertar lámina</Button> : <div/>}
          </Box>
              
        </Modal>
    );

};