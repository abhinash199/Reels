import { userService } from "../services";

export const sendOtp = (payload, id) => {
    return userService.sendOtp(payload, id).then((response) => {
            return response;
        });
}

export const otpVerify = (payload, id) => {
    return userService
        .otpVerify(payload, id)
        .then((response) => {
            return response;
        });
}

export const socialLogin = (payload, id) => {
    return userService
        .socialLogin(payload, id)
        .then((response) => {
            return response;
        });
}
