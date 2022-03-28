import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginPage.css"
import AppContext from "../../context/AppContext"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export const LoginPage = () => {
  const state = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/home')
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
                <TextField fullWidth color="primary" type='email' label='Email' variant="standard" onChange={handleEmail} />
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