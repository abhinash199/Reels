import {Network} from '@/partials/index';

export const userService = {
    reportContent
};

function reportContent(payload, id) {
    return Network.postWithLogin('support/customer/report/content', id, payload,`platform:${process.env.NEXT_PUBLIC_PLATFORM}`)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response)
{
    return response;
}
