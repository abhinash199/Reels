import { commentService } from '../services';
import {commentConstants} from "@/containers/comments/constants";

export const commentActions =  {
    fetchComments
};

export const saveComment = (username, id, payload, user) => {
    return (dispatch, getState) => {
        return commentService
            .saveComment(id, payload)
            .then(response => {
               dispatch(updateComments(username, payload, user));
            })
            .catch(error => {
                return error;
            });
    }
}

export const replyOnComment = (username, id, payload, user) => {
    return (dispatch, getState) => {
        return commentService
            .replyOnComment(id, payload)
            .then(response => {
               dispatch(updateComments(username, payload, user));
            })
            .catch(error => {
                return error;
            });
    }
}

function updateComments(username, response, user) {
    return {
        type: commentConstants.UPDATE_COMMENTS,
        identifier: username,
        comment: {
            comment: response?.comment,
            date_diff_for_human: 'just now',
            user: {'picture': user?.avatar},
            commented_by: 'customer',
            type: response?.type
        },
        }
    }

function fetchComments(username, contentId, artistId, next = false) {
    return (dispatch, getState) => {
        let { messages } = getState();

        if(shouldFetchComments(messages, username, next)) {
            const page = messages[username] ? messages[username].page : 1;
            dispatch(requestComments(username));
            commentService.getComments(contentId, artistId, page)
                .then(response => {
                        // if (response.status === 200) {
                        dispatch(receiveComments(username, response.data));
                        // }
                    }
                ).catch(error => {
                dispatch(failComments(username, error));
            });
        }
    };

    function shouldFetchComments(lists, name, next = false) {
        const activeList = lists.name;
        return (!activeList || (!activeList.loading && !activeList.end && (next ? activeList.page !== 1: next) ))
    }

    function requestComments(username) {return { type: commentConstants.REQUEST_COMMENTS_LISTING, identifier: username}}
    function receiveComments(username, comments) {return { type: commentConstants.RECEIVE_COMMENTS_LISTING, identifier: username, comments: comments}}
    function failComments(username, error) {return { type: commentConstants.ERROR_COMMENTS_LISTING, identifier: username, error:error}}
}
