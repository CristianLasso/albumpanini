import React, {useContext, useState, useEffect} from "react";
import "./AlbumPage.css";
import AppContext from "../../context/AppContext";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import {ModalLamina} from '../../components/ModalLamina/ModalLamina';
import AppBar from '../../components/AppBar/AppBar';
import {laminasData} from '../../assets/Laminas World Cup 2018/laminas';

import axios from 'axios';

export const AlbumPage = () => {
    const state = useContext(AppContext);
    const [prices, setPrices] = useState([]);
    const laminas = state.currentAlbum.laminas;

    useEffect(() => {
        myFunction();
        return () => {
            setPrices({});
        };
    }, []);

    const myFunction = () => {
        axios.get('http://localhost:8080/api/precios/').then(res => {setPrices(res.data)});
    }

    const handleClick = (lamina) => {
        prices?.map((precio) => {
            if(precio.lamina === lamina.title){
                state.setPriceLamina(precio.price);
            }
        })
        state.setNumberLamina(lamina.title)
        state.setLaminaId(lamina.laminaid)
        state.setCuantityLamina(lamina.cuantity)
        state.setImgLamina(lamina.img)
        state.setFilterLamina(lamina.filter)
        state.setOpen(true)
    }

    const handleChange = (event, value) => {
        state.setCurrentPage(value);
        console.log(value)
      };

    return(
        <Box>
            <Grid
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "center",
                    flexWrap: 'wrap',
                    m: 1,
                    height: '100%',
                    width: '100%',
                    paddingTop: '60px'
                  }}
            >
                {laminas?.map((lamina) => (
                    <Box>
                        {(lamina.page === state.currentPage) ? 
                            <Grid item key={lamina.title} padding={'3px'} border={'2px solid #000'} margin={'auto'} width={'180px'}>
                                
                                    <ImageListItem onClick={()=>handleClick(lamina)}>
                                        <img
                                            className={`banner ${lamina.filter ? "sin-filtro" : "filtro-bn"}`}
                                            src={`${lamina.img}?w=248&fit=crop&auto=format`}
                                            srcSet={`${lamina.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={lamina.title}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            position={'top'}
                                            title={lamina.title}
                                        />
                                    </ImageListItem>
                                
                                
                            </Grid> 
                        : null}
                    </Box>
                ))}
                
            </Grid>
            <Pagination sx={{paddingTop: '10px', position: 'absolute', left: '50%', transform: 'translate(-50%)'}} count={36} color="primary" showFirstButton showLastButton onChange={handleChange}/>
            <div maxHeight={'200px'}>
                <ModalLamina/>
            </div>
        </Box>
    );
};