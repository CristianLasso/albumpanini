import React, {useContext, useState} from "react";
import "./AlbumPage.css";
import AppContext from "../../context/AppContext";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {ModalLamina} from '../../components/Modal/ModalLamina';
import AppBar from '../../components/AppBar/AppBar';
import {laminasData} from '../../assets/Laminas World Cup 2018/laminas';

export const AlbumPage = () => {
    const state = useContext(AppContext);

    const handleClick = (lamina) => {
        console.log('Click')
        state.setNumberLamina(lamina.number)
        state.setQuantityLamina('0')
        state.setOpen(true)
        state.setImgLamina(lamina.img)
    }

    return(
        <Box>
            <AppBar/>
            <Grid
                sx={{
                    direction: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    flexWrap: 'wrap',
                    p: 1,
                    m: 1,
                    height: 'auto',
                    borderRadius: 1,
                    flexGrow: 1,
                    padding: '60px',
                  }}
            >
                {laminasData.map((lamina) => (
                    <Grid item key={lamina.img} xs={2} padding={'3px'} border={'2px solid #000'}>
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
                                title={lamina.number}
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