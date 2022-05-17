import React, {useContext, useState} from "react";
import AppContext from "../../context/AppContext";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2'

import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  };

  const inputStyle = {
    width:300
  };

  const methods = [
    {
      value: 'NEQUI',
      label: 'NEQUI',
    }
  ];

export const ModalToken = () => {
    const state = useContext(AppContext);
    const [plusToken, setPlusToken] = useState(0);
    const [pasarela, setPasarela] = useState(false);
    const [method, setMethod] = useState("");
    const [acceptanceToken, setAcceptanceToken] = useState("");
    const [number, setNumber] = useState("");
    const [conditions, setConditions] = useState("");
    const [checked, setChecked] = useState(false)
    const [completed, setCompleted] = useState(false);
    const [charging, setCharging] = useState(false);

    const handlePasarela = () => setPasarela(!pasarela);
    const handleMethod = e => setMethod(e.target.value);
    const handleNumber = e => setNumber(e.target.value);
    const handleClose = () => state.setOpen(false);
    const handleToken = e => setPlusToken(e.target.value);
    const handleCheck = e => {setChecked(e.target.checked)};

    const handleComprar = async (e) => {
        e.preventDefault();
        axios.get('https://sandbox.wompi.co/v1/merchants/pub_test_hf1wK6tjoL404BFRXX4iXxz9BQwjZjDu')
        .then(res => {
          console.log(res);
          setAcceptanceToken(res.data.data.presigned_acceptance.acceptance_token);
          setConditions(res.data.data.presigned_acceptance.permalink);
          handlePasarela();
        });
        setChecked(false);
        setCompleted(false);
        handleClose()
      }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(acceptanceToken);
      console.log(plusToken);
      console.log(number);
      var reference = Date.now();
      console.log(reference);
      const newTransaction = 
        {
          "acceptance_token": acceptanceToken,
          "amount_in_cents": parseInt(plusToken + "00"),
          "currency": "COP",
          "customer_email": state.userInfo.email,
          "reference": "trans"+reference,
          "payment_method": 
              {
                  "type": method,
                  "phone_number": number
              }
      }
      const config = {
        headers: { 'Authorization': 'Bearer ' + 'pub_test_hf1wK6tjoL404BFRXX4iXxz9BQwjZjDu' }
      };
      console.log(newTransaction);
      axios.post('https://sandbox.wompi.co/v1/transactions', newTransaction, config)
      .then(res => {
        console.log(res.data.data.id);
        waitPay(res.data.data.id);
        setCharging(true);
      })
      .catch((error) => {
        console.log(error)
        handlePasarela();
        return (Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Parece que algo salio mal!',
          confirmButtonColor: 'primary',
          confirmButtonText: "Entendido!"
        }))
      })
    }

    const waitPay = (id) => {
      setTimeout(async () =>{
        console.log('timeout')
          axios.get('https://sandbox.wompi.co/v1/transactions/'+id)
          .then(res => {
            console.log(res)
            console.log(res.data.data.status)
            if(res.data.data.status == 'APPROVED'){
              //3991111111
              setCharging(false);
              setCompleted(true);
              var sum = parseInt(state.userInfo.tokens) + parseInt(plusToken)
              state.setUser(sum)
              handlePasarela();
              Swal.fire(
                '¡¡Pago aprobado!!',
                'Tus tokens han sido sumados correctamente! Usalos bien!',
                'success'
              )
            }
            else if(res.data.data.status == 'DECLINED'){
              //3992222222
              setCharging(false);
              setCompleted(true);
              handlePasarela();
              Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Parece que rechazaste el pago! Cambiaste de parecer?',
                confirmButtonColor: 'primary',
                confirmButtonText: "Entendido!"
              })
            }
            else if(res.data.data.status == 'ERROR'){
              setCharging(false);
              setCompleted(true);
              handlePasarela();
              Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Parece que algo salio mal! Intentalo de nuevo más tarde',
                confirmButtonColor: 'primary',
                confirmButtonText: "Entendido!"
              })
            }
            else if(res.data.data.status == 'PENDING'){
              waitPay(id);
            }
          })
      },8000);
      console.log(completed);
    }

    return(
      <Box>
        <Modal
          open={state.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cuantos tokens deseas comprar:
            </Typography>
            <form onSubmit={handleComprar}>
                <Box>
                    <Input sx={inputStyle} color="primary" type='name' placeholder='Tokens' onChange={handleToken} />
                </Box>
                <Button sx={{marginTop:5, marginLeft:12}} color="primary" variant="contained" type='submit' value='Comprar'>Comprar</Button>
            </form>
          </Box>
        </Modal>
        <Modal
          open={pasarela}
          onClose={handlePasarela}
        >
          <Box sx={style}>
            {charging ? <CircularProgress /> : 
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Selecciona tu metodo de pago:
                </Typography>
                <TextField
                  fullWidth
                  id="pay-method"
                  select
                  label="Metodo de pago"
                  value={method}
                  onChange={handleMethod}
                  helperText="Por el momento solo tenemos disponible pagos Nequi!"
                  variant="standard"
                >
                  {methods.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <form onSubmit={handleSubmit}>
                  <Box sx={{marginTop:3}}>
                    <TextField fullWidth label='Número de celular' variant="standard" onChange={handleNumber} />
                  </Box>
                  <Button disabled={!checked} sx={{marginTop:5, marginLeft:12}} color="primary" variant="contained" type='submit' value='Pago'>Pagar {plusToken} pesos</Button>
                </form>
                <FormGroup sx={{justifyContent: 'center'}}>
                  <FormControlLabel control={<Checkbox onChange={handleCheck}/>} label='He leído y acepto los' />
                  <a href={conditions} target="_blank">Términos y condiciones</a>
                </FormGroup>
              </Box>
            }
          </Box>
        </Modal>
      </Box>
        
    );

};