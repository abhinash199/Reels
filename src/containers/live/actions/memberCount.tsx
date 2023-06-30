import {liveService} from '../services';

export const memberCount = (id, channel) => {
    return liveService
        .memberCount(id, channel)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
};
