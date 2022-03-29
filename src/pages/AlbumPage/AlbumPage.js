import React, {useContext, useState} from "react";
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
//import {useGetLaminasQuery} from '../../redux/api/mainAPI';

export const AlbumPage = () => {
    const state = useContext(AppContext);
    const laminas = state.currentAlbum.laminas;

    //const { data: laminasData } = useGetLaminasQuery();

    const handleClick = (lamina) => {
        state.setOpen(true)
        state.setLaminaId(lamina.laminaid)
        state.setNumberLamina(lamina.title)
        state.setCuantityLamina(lamina.cuantity)
        state.setImgLamina(lamina.img)
        state.setFilterLamina(lamina.filter)
        console.log(lamina)
    }

    const handleChange = (event, value) => {
        state.setCurrentPage(value);
        console.log(value)
      };

    return(
        <Box>
            <AppBar/>
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
                        {(lamina.page == state.currentPage) ? 
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
            <Pagination sx={{paddingTop: '10px'}} count={38} color="primary" showFirstButton showLastButton onChange={handleChange}/>
            <div>
                <ModalLamina/>
            </div>
        </Box>
    );
};