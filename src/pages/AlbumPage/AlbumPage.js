import React, {useContext, useState} from "react";
import "./AlbumPage.css";
import AppContext from "../../context/AppContext";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {ModalLamina} from '../../components/Modal/ModalLamina';
import AppBar from '../../components/AppBar/AppBar';

const laminaData = [
    {
        img: 'https://www.laststicker.com/i/cards/3852/00.jpg',
        number: '00',
        title: 'Panini',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/1.jpg',
        number: '1',
        title: 'FIFA Fair Play',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/2.jpg',
        number: '2',
        title: 'FIFA World Cup Trophy',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/3.jpg',
        number: '3',
        title: 'Style guide',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/4.jpg',
        number: '4',
        title: 'Style guide',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/5.jpg',
        number: '5',
        title: 'FIFA World Cup Logo',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/6.jpg',
        number: '6',
        title: 'FIFA World Cup Logo',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/7.jpg',
        number: '7',
        title: 'Official Ball',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/8.jpg',
        number: '8',
        title: 'Ekaterinburg Arena',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/9.jpg',
        number: '9',
        title: 'Kaliningrad Stadium',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/10.jpg',
        number: '10',
        title: 'Kazan Arena',
        filter: 'filtro-bn'
    },
    {
        img: 'https://www.laststicker.com/i/cards/3852/11.jpg',
        number: '11',
        title: 'Spartak Stadium',
        filter: 'filtro-bn'
    },
];

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
                {laminaData.map((lamina) => (
                    <Grid xs={2} padding={'3px'} border={'2px solid #000'}>
                        <ImageListItem key={lamina.img} onClick={()=>handleClick(lamina)}>
                            <img
                                className={lamina.filter}
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