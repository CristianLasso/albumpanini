import axios from 'axios';

const path = "user/album/";

export const getAllAlbum = () => {
    console.log("Cargando albumes...");
    return axios.get(path).then(res =>{
        console.log("AllAlbum");
        console.log(res)
    });
}