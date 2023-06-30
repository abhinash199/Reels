import { transactionService } from '../services';

export const doPurchase = (id, payload) => {
    return transactionService.doPurchase(id, payload).then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};











