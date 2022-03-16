import React, {useContext, useState} from "react";
import "./AlbumPage.css";
import AppContext from "../../context/AppContext";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {ModalLamina} from '../../components/ModalLamina/ModalLamina';
import AppBar from '../../components/AppBar/AppBar';

export const AlbumPage = () => {
    const state = useContext(AppContext);
    const laminas = state.currentAlbum.laminas;

    //const { data: laminasData } = useGetAlbumsQuery();

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
                {laminas?.map((lamina) => (
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