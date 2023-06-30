import {Network} from '@/partials/index';

export const chatService = {
    createRoom,
    sendMessage,
    getMessages,
};

function createRoom(id) {

    return Network.postWithLogin('directline/createroom', id, {})
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function sendMessage(id, payload) {

    return Network.postWithLogin('directline/sendmessage', id, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getMessages(contentId, page) {
    return Network.get('directline/messagehistory/'+contentId+'?platform='+process.env.NEXT_PUBLIC_PLATFORM+'&visibility=customer&v=1.0&page='+page)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}

