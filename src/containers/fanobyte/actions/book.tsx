import {fanoByteService} from '../services';

export const bookGreetingActions = {
    bookGreeting
};

function bookGreeting(params, payload: any) {
    return fanoByteService.bookGreeting(params, payload).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    });
}
