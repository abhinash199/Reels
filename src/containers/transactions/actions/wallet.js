import { transactionConstants } from '../constants';
import { transactionService } from '../services';

export const transactionActions = {
    passbook,
};

function passbook(username, id, next = false)
{
    return (dispatch, getState) =>
    {
        let { passbook } = getState();

        if(shouldFetchPassbook(passbook, username, next)) {
            const page = passbook[username] ? passbook[username].page : 1;
            dispatch(requestPassbook(username));
            transactionService.fetchMyWallet(id, page)
                .then(response => {
                        if (response.status_code === 200) {
                            dispatch(receivePassbook(username, response.data));
                        }
                    }
                ).catch(error => {
                dispatch(failPassbook(username, error));
            });
        }
    };

    function shouldFetchPassbook(lists, name, next = false) {
        const activeList = lists.name;
        return (!activeList || (!activeList.loading && !activeList.end && (next ? activeList.page !== 1: next) ))
    }

    function requestPassbook(username) {return { type: transactionConstants.REQUEST_WALLET_PAGE, identifier: username}}
    function receivePassbook(username, passbook) {return { type: transactionConstants.RECEIVE_WALLET_PAGE, identifier: username, passbook: passbook}}
    function failPassbook(username, error) {return { type: transactionConstants.ERROR_WALLET_PAGE, identifier: username, error:error}}
}






