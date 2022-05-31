import axios from 'axios';

export const AlbumController = {
    register(album) {
        return axios({
            method: 'POST',
            baseURL: process.env.API,
            url: `albums`,
            data: album,
        })
    },
    list() {
        return axios({
            method: 'GET',
            baseURL: process.env.API,
            url: 'albums'
        });
    },
    delete(id) {
        return axios({
            method: 'DELETE',
            baseURL: process.env.API,
            url: `albums/${id}`,
        });
    },
    getAlbum(id) {
        return axios({
            method: 'GET',
            baseURL: process.env.API,
            url: `albums/${id}`,
        });
    },
    updateAlbum(id) {
        return axios({
            method: 'PUT',
            baseURL: process.env.API,
            url: `albums/${id}`,
        });
    }
}

