import {callService} from '../services';

export const bookCallActions = {
    bookCall
};

function bookCall(params, payload: any) {
    return callService.bookCall(params, payload).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    });
}
