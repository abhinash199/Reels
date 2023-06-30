import { transactionConstants } from '../constants';
import { transactionService } from '../services';

export const transactionActions = {
    showPurchase,
};

function showPurchase(artistId) {
    return dispatch => {
        dispatch(request());
        return transactionService.showPurchases(artistId)
            .then(response => {
                    if(response?.status_code === 200) {
                        dispatch(success(response?.data));
                    }
                }
            ).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: transactionConstants.REQUEST_ORDERS }}
    function success(orders) { return { type: transactionConstants.RECEIVE_ORDERS, orders }}
    function failure(error) { return { type: transactionConstants.ERROR_ORDERS, error }}
}

export const getTransactions = (artistId) => {
    return transactionService.showPurchases(artistId)
        .then(response => {
            return response;
                //if(response?.status_code === 200) {

                //}
            }
        ).catch(error => {
            return error;
        });
}
