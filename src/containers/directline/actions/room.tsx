import { chatService } from '../services';
import {chatConstants} from "@/containers/directline/constants";

export const createRoom = (id) => {
    return chatService
        .createRoom(id)
        .then(response => {
            return response?.data;
        })
        .catch(error => {
            return error;
        });
};

export const sendMessage = (username, id, payload) => {
    return (dispatch, getState) => {
        return chatService
            .sendMessage(id, payload)
            .then(response => {
                dispatch(updateMessages(username, response));
            })
            .catch(error => {
                return error;
            });
    }

};

function updateMessages(username, response) { return { type: chatConstants.UPDATE_MESSAGES, identifier: username, message: response?.data?.chat_message}}

export const chatActions =  {
    fetchMessages
};

function fetchMessages(username, content, next = false) {
    return (dispatch, getState) => {
        let { messages } = getState();

        if(shouldFetchMessages(messages, username, next)) {
            const page = messages[username] ? messages[username].page : 1;
            dispatch(requestMessages(username));
            chatService.getMessages(content, page)
                .then(response => {
                        // if (response.status === 200) {
                        dispatch(receiveMessages(username, response.data));
                        // }
                    }
                ).catch(error => {
                dispatch(failMessages(username, error));
            });
        }
    };

    function shouldFetchMessages(lists, name, next = false) {
        const activeList = lists.name;
        return (!activeList || (!activeList.loading && !activeList.end && (next ? activeList.page !== 1: next) ))
    }

    function requestMessages(username) {return { type: chatConstants.REQUEST_MESSAGES, identifier: username}}
    function receiveMessages(username, messages) {return { type: chatConstants.RECEIVE_MESSAGES, identifier: username, messages: messages}}
    function failMessages(username, error) {return { type: chatConstants.ERROR_MESSAGES, identifier: username, error:error}}
}
