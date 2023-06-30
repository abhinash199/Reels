import { transactionService } from '../services';

export const purchaseGreeting = (artistId, payload) => {
    return transactionService.purchaseGreeting(artistId, payload).then(response => {
        console.log(response);
        return response;
    })
        .catch(error => {
            return error;
        });
};
