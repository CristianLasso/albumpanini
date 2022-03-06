import React, {useContext, useState} from "react";
import "./TokenPage.css";
import AppContext from "../../context/AppContext";
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

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

export const TokenPage = () => {
    const state = useContext(AppContext);

    return(
        <Box>
            <AppBar/>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} variant="h4" component="h3">
                    Tu balance:
                </Typography>
                <Typography sx={{textAlign:'center'}} id="balance" variant="h4" component="h3">
                    <PaidIcon fontSize={'medium'}/>0
                </Typography>
                <Button color="primary" sx={{marginTop:5, marginLeft:12}} variant="contained"><ShoppingBagIcon fontSize={'large'}/> Comprar tokens</Button>
            </Box>
        </Box>
    );
};