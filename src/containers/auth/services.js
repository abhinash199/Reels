import {Network} from '@/partials/index';

export const userService = {
    sendOtp,
    otpVerify,
    socialLogin
};

function sendOtp(payload, id) {
    return Network.postWithLogin('customers/requestotp', id, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function otpVerify(payload, id) {
    return Network.postWithLogin('customers/login/verifyotp', id, JSON.stringify(payload))
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function socialLogin(payload, id) {
    return Network.postWithLogin('customers/sociallogin', id, JSON.stringify(payload))
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response)
{
    return response;
}
