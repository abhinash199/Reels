import { transactionService } from '../services';

export const purchaseLiveGift = (artistId, payload) => {
    return transactionService.purchaseLiveGift(artistId, payload).then(response => {
        return response;
    })
        .catch(error => {
            return error;
        });
};
