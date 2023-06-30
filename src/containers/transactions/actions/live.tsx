import { transactionService } from '../services';

export const purchaseLiveEvent = (artistId, payload) => {
    return transactionService.purchaseLiveEvent(artistId, payload).then(response => {
        return response;
    })
        .catch(error => {
            return error;
        });
};
