import {Network} from '@/partials/index';

export const commentService = {
    saveGift,
    saveComment,
    getComments,
    replyOnComment
};

function saveGift(id, payload) {
    return Network.postWithLogin('passbook/sendsticker/comment', id, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function saveComment(id, payload) {
    return Network.postWithLogin('customers/savecomment', id, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function replyOnComment(id, payload){
    return Network.postWithLogin('customers/replyoncomment', id, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getComments(contentId, artistId, page) {
    return Network.get('comments/lists?content_id='+contentId+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&artist_id='+artistId+'&page='+page)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}

