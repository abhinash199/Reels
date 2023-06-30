import {Network} from '@/partials/index';

export const profileService = {
    getProfile,
    updateProfile,
    getEmailOtp,
    verifyEmailOTP
};

function getProfile(artistId) {
    return Network.getWithLogin('customers/profilev2', artistId)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function updateProfile(artistId, payload) {

    return Network.postWithLoginUpload('customers/updateprofilev2', artistId, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getEmailOtp(artistId, payload) {

    return Network.postWithLogin('customers/requestotp', artistId, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function verifyEmailOTP(artistId, payload) {

    return Network.postWithLogin('customers/verifyotp', artistId, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}
