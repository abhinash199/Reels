import {callService} from '../services';

export const getToken = payload => {
    return callService
        .getToken(payload)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response;
        });
};
