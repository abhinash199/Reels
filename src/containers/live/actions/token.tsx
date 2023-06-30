import {liveService} from '../services';

export const getToken = payload => {
    return liveService
        .getToken(payload)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response;
        });
};
