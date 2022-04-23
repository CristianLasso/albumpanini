import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginPage.css"
import AppContext from "../../context/AppContext"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

import axios from 'axios';



export const LoginPage = () => {
  const state = useContext(AppContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserName = e => setUserName(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //navigate('/home')
    const newUser = {
      username: userName,
      password: password,
    };
    axios.post('https://pi2sis.icesi.edu.co/saamfiapi/public/institutions/1/systems/11/users/login', newUser,
    {headers: {
      "Access-Control-Allow-Origin": "*"
    }})
    .then((newUser) => {
      console.log(newUser)
      navigate('/home')
    })
    .catch((error) => {
      console.log(error)
      return (Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Verifica que la información sea correcta!',
        confirmButtonColor: 'primary',
        confirmButtonText: "Entendido!"
      }))
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
  };


  return (
    <Box>
        <Box sx={style}>
          <Box >
            
            <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h2" component="h1">
                Iniciar Sesion
            </Typography>
          </Box>
          <Box sx={{display:"flex", flexDirection: 'column', alignItems: 'center'}}>
            <form onSubmit={handleSubmit}>
              <Box sx={{marginTop:2}}>
                <TextField fullWidth color="primary" type='username' label='Nombre de usuario' variant="standard" onChange={handleUserName} />
              </Box>
              <Box sx={{marginTop:3}}>
                <TextField fullWidth color="primary" type='password' label='Contraseña' variant="standard" onChange={handlePassword} />
              </Box>   
              <Button color="primary" sx={{marginTop:5}} variant="outlined" type='submit' value='Entrar'>Entrar</Button>
            </form>
            <div/>
            <p>No tienes una cuenta? <Link to='/register'>Registrate</Link> </p>
          </Box>
        </Box>
    </Box>
      
  )
}