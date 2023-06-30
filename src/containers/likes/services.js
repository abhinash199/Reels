import {Network} from '@/partials/index';

export const likeService = {
    saveLike,
};

function saveLike(id, payload) {
    return Network.postWithLogin('customers/like', id, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}

