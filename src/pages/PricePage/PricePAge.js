import * as React from 'react';

import Swal from 'sweetalert2'

import { DataGrid } from '@mui/x-data-grid';
import CalculateIcon from '@mui/icons-material/Calculate';
import Button from '@mui/material/Button';

import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 85 },
  { field: 'number', headerName: 'No.', width: 95 },
  { field: 'lamina', headerName: 'Lámina', width: 180 },
  { field: 'category', headerName: 'Categoría', width: 150 },
  { field: 'price', headerName: 'Precio', width: 110 },
];

const rows = [
  { id: 1, number: 1, lamina: 'Ball', category: 'Special', price: 500 },
  { id: 2, number: 2, lamina: 'Ball', category: 'Estadio', price: 500 },
  { id: 3, number: 3, lamina: 'Ball', category: 'Jugador', price: 500 },
  { id: 4, number: 4, lamina: 'Ball', category: 'Escudo', price: 500 },
  { id: 5, number: 5, lamina: 'Ball', category: 'Special', price: 500 },
  { id: 6, number: 6, lamina: 'Ball', category: 'Estadio', price: 500 },
  { id: 7, number: 7, lamina: 'Ball', category: 'Jugador', price: 500 },
  { id: 8, number: 8, lamina: 'Ball', category: 'Escudo', price: 500 },
  { id: 9, number: 9, lamina: 'Ball', category: 'Special', price: 500 },
  { id: 10, number: 10, lamina: 'Ball', category: 'Estadio', price: 500 },
  { id: 11, number: 11, lamina: 'Ball', category: 'Jugador', price: 500 },
  { id: 12, number: 12, lamina: 'Ball', category: 'Escudo', price: 500 },
  { id: 13, number: 13, lamina: 'Ball', category: 'Special', price: 500 },
  { id: 14, number: 14, lamina: 'Ball', category: 'Estadio', price: 500 },
  { id: 15, number: 15, lamina: 'Ball', category: 'Jugador', price: 500 },
  { id: 16, number: 16, lamina: 'Ball', category: 'Escudo', price: 500 },
  { id: 17, number: 17, lamina: 'Ball', category: 'Special', price: 500 },
];

export const PricePage = () => {

    const handleCalculate = () => {
        console.log('Calcular precios')
        const newNotify = {
            title: '¡¡Actualización de precios!!',
            info: 'Los precios de las láminas fueron actualizados, deberias echarles un vistazo!',
            solicitud: false,
            quantity: 0,
            lamina: 0,
            tokens: 0,
        };
        axios.post('http://localhost:8080/api/users/notifys/', newNotify)
        .then((newNotify) =>{
            console.log(newNotify)
            Swal.fire(
              '¡¡Actualización de precios completada!!',
              'Los precios han sido actualizados y se ha enviado la notificación a los usuarios!',
              'success'
            )
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

  return (
    <div style={{ height: '580px', width: '100%', paddingTop: '70px'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      <Button sx={{position: 'fixed', top: '75px', right: '5px'}} color="primary" variant="contained" onClick={handleCalculate}><CalculateIcon fontSize={'large'}/>Recalcular precios</Button>
    </div>
  );
}