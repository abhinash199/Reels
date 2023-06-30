import { likeService } from '../services';

export const saveLike = (id, payload) => {
        return likeService
            .saveLike(id, payload)
            .then(response => {
               return response;
            })
            .catch(error => {
                return error;
            });
}
