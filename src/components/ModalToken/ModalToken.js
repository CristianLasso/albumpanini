import React, {useContext, useState} from "react";
import AppContext from "../../context/AppContext";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

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

export const ModalToken = () => {
    const state = useContext(AppContext);
    const [plusToken, setPlusToken] = useState(0);

    const handleClose = () => state.setOpen(false);
    const handleToken = e => setPlusToken(e.target.value);

    const handleComprar = async (e) => {
        e.preventDefault();
        var sum = parseInt(state.userInfo.tokens) + parseInt(plusToken)
        state.setUser(sum)
        handleClose()
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
    );

};