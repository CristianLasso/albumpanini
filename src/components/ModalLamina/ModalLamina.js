import React, {useContext, useState} from "react";
import AppContext from "../../context/AppContext";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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

export const ModalLamina = () => {

    const state = useContext(AppContext);
    const handleClose = () => state.setOpen(false);

    const handleMinus = () => {
      var rest=parseInt(state.quantityLamina)-1
      if(rest<0){
        rest=0
      }
      state.setQuantityLamina(rest)
    }

    const handlePlus = () => {
      var sum=parseInt(state.quantityLamina)+1
      state.setQuantityLamina(sum)
    }

    const handlePegar = () => {
      state.setFilterLamina("sin-filtro")
      var rest=parseInt(state.quantityLamina)-1
      if(rest<0){
        rest=0
      }
      state.setQuantityLamina(rest)
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
            <Box border={'2px solid #000'} padding={'5px'}>
            <img
                key={state.imgLamina}
                className={state.filterLamina}
                width={'100%'}
                height={'100%'}
                src={`${state.imgLamina}?w=248&fit=crop&auto=format`}
                srcSet={`${state.imgLamina}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={state.numberLamina}
                loading="lazy"
            />
            </Box>
            <Box sx={{ flexGrow: 1 }} padding={'5px'}>
              <Grid container columns={3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                    direction: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    flexWrap: 'wrap',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    height: 'auto',
                    borderRadius: 1,
                    flexGrow: 1,
                    padding: '25px',
                  }}>
                <Grid item >
                  <Button color="primary" variant="contained" onClick={handleMinus}>-</Button>
                </Grid>
                <Grid item >
                  <h3 id="modal-modal-description">
                    {state.quantityLamina}
                  </h3>
                </Grid>
                <Grid item >
                  <Button color="primary" variant="contained" onClick={handlePlus}>+</Button>
                </Grid>
              </Grid>
            </Box>
            <Button color="primary" variant="contained" onClick={handlePegar}>Pegar</Button>
          </Box>
              
        </Modal>
    );

};