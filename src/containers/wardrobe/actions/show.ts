import { photoService } from '../services';

export const fetchAlbum = (id, contentId) => {
    return photoService
        .getAlbum(id, contentId)
        .then(response => {
            return response?.data;
        })
        .catch(error => {
            return error;
        });
};











