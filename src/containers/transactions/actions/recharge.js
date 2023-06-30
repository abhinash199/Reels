import { transactionConstants } from '../constants';
import { transactionService } from '../services';

export const transactionActions = {
    recharge,
};

function recharge(artistId) {
    return dispatch => {
        dispatch(request());
        return transactionService.fetchPackages(artistId)
            .then(response => {
                    if(response?.status_code === 200) {
                        dispatch(success(response?.data));
                    }
                }
            ).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: transactionConstants.REQUEST_RECHARGE_PAGE }}
    function success(packages) { return { type: transactionConstants.RECEIVE_RECHARGE_PAGE, packages }}
    function failure(error) { return { type: transactionConstants.ERROR_RECHARGE_PAGE, error }}
}
