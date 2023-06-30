import {Network} from '@/partials/index';

export const fanoByteService = {
    bookGreeting,
    greetingRequests,
};

function bookGreeting(params, payload) {
    return Network.postWithLogin('shoutouts/greetings/request?artist_id='+params+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0', params, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function greetingRequests(params, page) {
    return Network.getWithLogin('shoutouts/greetings?page='+page+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0', params)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}

