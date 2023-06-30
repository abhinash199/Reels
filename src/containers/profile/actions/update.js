import { profileService } from '../services';

export const updateProfile = (artistId, payload) => {
    return profileService.updateProfile(artistId, payload)
        .then(response => {
            return response
        }
        ).catch(error => {
            return error.response;
        });
}

export const getEmailOtp = (id, payload) => {
    return profileService
        .getEmailOtp(id, payload)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
};

export const verifyEmailOTP = (id, payload) => {
    return profileService
        .verifyEmailOTP(id, payload)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response;
        });
};
