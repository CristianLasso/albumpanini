import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./SignupPage.css"
import AppContext from "../../context/AppContext"
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../config/firebase/firebase';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';

import axios from 'axios';

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

  const { signup } = useAuth();
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleName = e => setName(e.target.value);
  const handleLastName = e => setLastName(e.target.value);
  const handleDocumentId = e => setDocumentId(e.target.value);
  const handlePhone = e => setPhone(e.target.value);
  const handleLocation = e => setLocation(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handlePasswordConfirmation = e => setPasswordConfirmation(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden');
      setTimeout(() => setError(''), 1500);
    } else {
      try {
        await signup(email, password);
        state.saveUser(name, lastName, documentId, phone, location, email, password);
        navigate('/home/albums');
        saveUser();
      } catch (error) {
        setError('Error de credenciales');
        console.log(error);
        setTimeout(() => setError(''), 1500);
        return (Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Verifica que la información sea correcta!',
          confirmButtonColor: '#388e3c',
          confirmButtonText: "Entendido!"
        }))
      }
    }
  }

  const saveUser = async () => {
    console.log('Post de user')
    const newUser = {
      userid: auth.currentUser.uid,
      username: name + " " + lastName,
      email: email
    };
    axios.post('http://localhost:8080/api/users/', newUser)
    .then((newUser) => {
      console.log(newUser)
    })
  }

  const style = {
    top: '50%',
    left: '50%',
    minWidth: '400px',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '200px',
    marginRight: '200px'
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
                <TextField fullWidth label="Apellido" variant="standard" onChange={handleLastName} />
              </Box>
              <Box sx={{marginTop:3}}>
                <TextField fullWidth label="Documento de identidad" variant="standard" onChange={handleDocumentId} />
              </Box>
              <Box sx={{marginTop:3}}>
                <TextField fullWidth label='Telefono' variant="standard" onChange={handlePhone} />
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
              <Box sx={{marginTop:3}}>
                <TextField fullWidth type='password' label='Confirmar contraseña' variant="standard" onChange={handlePasswordConfirmation} />
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