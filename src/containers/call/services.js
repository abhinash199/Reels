import {Network} from '@/partials/index';

export const callService = {
    getSlots,
    bookCall,
    callRequests,
    joinCall,
    updateCall,
    getToken
};

function getToken(payload) {
    return Network.getWithLogin('accounts/agora/dynamickey?customer_id='+payload.customer_id+'&artist_id='+payload.artist_id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0&channel='+payload.channel)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getSlots(payload) {
    return Network.post('videocall/slots', payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function bookCall(params, payload) {
    return Network.postWithLogin('videocall/request', params, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function joinCall(video_id, params) {
    return Network.postWithLogin('videocall/join?video_id='+video_id+'&join_by=customer&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0&product=celebyte', params, {})
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function updateCall(id, params) {
    return Network.postWithLogin('videocall/update?_id='+id+'&updated_by=customer&status=accepted&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0&product=celebyte', params, {})
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function callRequests(params, page) {
    return Network.getWithLogin('videocall/list?page='+page, params)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    console.log(response);
    return response;
}

