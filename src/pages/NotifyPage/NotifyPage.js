import React, {useContext, useEffect, useState} from "react";
import "./NotifyPage.css";
import AppContext from "../../context/AppContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/AppBar';
import Typography from '@mui/material/Typography';


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

export const NotifyPage = () => {
    const state = useContext(AppContext);

    const notifys = [];

    const handleSelectAlbum = (item) => {
        console.log(item.title)
    }
    
    return(
        <Box>
            <AppBar/>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} variant="h4" component="h3">
                    Notificaciones:
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {notifys?.map((noti) => (
                        <Box key={noti.title}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>handleSelectAlbum(noti)}>
                                    <ListItemIcon>
                                        <AutoStoriesIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={noti.title} secondary={noti.info} />
                                </ListItemButton>
                            </ListItem>
                        </Box>
                        
                    ))}
                </List>
            </Box>
        </Box>
    );
};