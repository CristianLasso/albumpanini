import React, {useContext, useState} from "react";
import "./AlbumPage.css";
import AppContext from "../../context/AppContext";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {ModalLamina} from '../../components/ModalLamina/ModalLamina';
import AppBar from '../../components/AppBar/AppBar';
//import {laminasData} from '../../assets/Laminas World Cup 2018/laminas';
import {useGetLaminasQuery} from '../../redux/api/mainAPI';

export const AlbumPage = () => {
    const state = useContext(AppContext);
    const laminas = state.currentAlbum.laminas;

    const { data: laminasData } = useGetLaminasQuery();

    const handleClick = (lamina) => {
        console.log('Click')
        state.setOpen(true)
        state.setNumberLamina(lamina.laminaid)
        state.setQuantityLamina(lamina.cuantity)
        state.setImgLamina(lamina.img)
        if(lamina.filter){
            state.setFilterLamina('sin-filtro')
        }else{
            state.setFilterLamina('filtro-bn')
        }
    }

    return(
        <Box>
            <AppBar/>
            <Grid
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    flexWrap: 'wrap',
                    m: 1,
                    height: '100%',
                    width: '100%',
                    paddingTop: '60px'
                  }}
            >
                {laminas?.map((lamina) => (
                    <Grid item key={lamina.laminaid} padding={'3px'} border={'2px solid #000'} margin={'auto'} width={'180px'}>
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
                                title={lamina.laminaid}
                                subtitle={lamina.title}
                            />
                        </ImageListItem>
                    </Grid> 
                ))}
            </Grid>
            
            <div>
                <ModalLamina/>
            </div>
        </Box>
    );
};