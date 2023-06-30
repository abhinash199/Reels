import {liveService} from '../services';

export const purchaseLive = (id, channel) => {
    return liveService
        .purchaseLive(id, channel)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
};
