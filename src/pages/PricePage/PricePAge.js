import React, {useContext, useState, useEffect} from "react";

import Swal from 'sweetalert2'

import { DataGrid } from '@mui/x-data-grid';
import CalculateIcon from '@mui/icons-material/Calculate';
import Button from '@mui/material/Button';

import axios from 'axios';

const columns = [
  { field: 'precioid', headerName: 'ID', width: 85 },
  { field: 'number', headerName: 'No.', width: 95 },
  { field: 'lamina', headerName: 'Lámina', width: 180 },
  { field: 'section', headerName: 'Sección', width: 150},
  { field: 'category', headerName: 'Categoría', width: 150 },
  { field: 'range', headerName: 'Rango', width: 110 },
  { field: 'categoryprice', headerName: 'Precio x Categoría', width: 190 },
  { field: 'rangeprice', headerName: 'Precio x Rango', width: 190 },
  { field: 'price', headerName: 'Precio Mayor', width: 190 },
];

export const PricePage = () => {

  const [prices, setPrices] = useState([]);

    useEffect(() => {
        myFunction();
        return () => {
            setPrices({});
        };
    }, []);

    const myFunction = () => {
        axios.get('http://localhost:8080/api/precios/').then(res => {setPrices(res.data)});
    }

    const handleCalculate = () => {
        console.log(prices)
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
    <div style={{ height: '510px', width: '100%', paddingTop: '140px'}}>
      <DataGrid 
        getRowId={(row) => row.precioid}
        rows={prices}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[30]}
      />
      <Button sx={{position: 'fixed', top: '75px', right: '5px'}} color="primary" variant="contained" onClick={handleCalculate}><CalculateIcon fontSize={'large'}/>Recalcular precios</Button>
    </div>
  );
}