import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./SignupPage.css"
import AppContext from "../../context/AppContext"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';

import {useAddUserMutation} from '../../redux/api/mainAPI';

const locations = [
  {
    value: 'Norte',
    label: 'Norte',
  },
  {
    value: 'Sur',
    label: 'Sur',
  },
  {
    value: 'Centro',
    label: 'Centro',
  },
  {
    value: 'Oriente',
    label: 'Oriente',
  },
  {
    value: 'Occidente',
    label: 'Occidente',
  },
];

export const SignupPage = () => {
  const state = useContext(AppContext);
  const navigate = useNavigate();

  const [createUser] = useAddUserMutation();

  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleName = e => setName(e.target.value);
  const handleNickName = e => setNickName(e.target.value);
  const handleLocation = e => setLocation(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const newUser = {
        name: name,
        nickName: nickName,
        location: location,
        email: email,
        password: password
      };
      const { error: postUserError } = await createUser(newUser);
      if(postUserError !== undefined){
        return (Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Verifica que la información sea correcta!',
          confirmButtonColor: 'primary',
          confirmButtonText: "Entendido!"
        }))
      }else{
        navigate('/home')
      }
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

  const inputStyle = {
    width:300
  }


  return (
    <Box>
        <Box sx={style}>
          <Box >
            
            <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h2" component="h1">
                Registrarse
            </Typography>
          </Box>
          <Box sx={{display:"flex", flexDirection: 'column', alignItems: 'center'}}>
            <form onSubmit={handleSubmit}>
              <Box sx={{marginTop:2}}>
                <TextField fullWidth label="Nombre" variant="standard" onChange={handleName} />
              </Box>
              <Box sx={{marginTop:3}}>
                <TextField fullWidth label='Apodo' variant="standard" onChange={handleNickName} />
              </Box>
              <Box sx={{marginTop:3}}>
              <TextField
                fullWidth
                id="location-select"
                select
                label="Ubicación"
                value={location}
                onChange={handleLocation}
                helperText="Seleccione la zona de la ciudad en donde permanece la mayor parte del tiempo"
                variant="standard"
              >
                {locations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </Box>
              <Box sx={{marginTop:3}}>
                <TextField fullWidth label='Email' variant="standard" onChange={handleEmail} />
              </Box>
              <Box sx={{marginTop:3}}>
                <TextField fullWidth type='password' label='Contraseña' variant="standard" onChange={handlePassword} />
              </Box>
              <Button color="primary" sx={{marginTop:5}} variant="outlined" type='submit' value='Entrar'>Registrarse</Button>
            </form>
            <div/>
            <p>Ya tienes una cuenta? <Link to='/'>Inicia sesión</Link> </p>
          </Box>
        </Box>
    </Box>
      
  )
}