import { commentConstants } from '../constants';

const initialState = {
        loading : false,
        error: false,
        page: 1,
        comments: [],
        end: false,
    },

    CommentList = (state = initialState, action) => {
        switch (action.type){
            case commentConstants.REQUEST_COMMENTS_LISTING:
                return {
                    ...state,
                    loading: true
                };
            case commentConstants.RECEIVE_COMMENTS_LISTING:
                const end = action.comments.list.length < 20 ? true : action.end ? action.end : false;
                return Object.assign({}, state, {
                    loading: false,
                    end: end,
                    page: state.page + 1,
                    comments: [...state.comments, ...action.comments.list]
                });
            case commentConstants.UPDATE_COMMENTS:
                return Object.assign({}, state, {
                    comments: [...state.comments, action.comment]
                });
            case commentConstants.ERROR_COMMENTS_LISTING:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    },

    CommentReducer = (state = {}, action) => {
        switch (action.type){
            case commentConstants.REQUEST_COMMENTS_LISTING:
                return Object.assign({}, state, {
                    [action.identifier]: CommentList(state[action.identifier], action)
                });
            case commentConstants.RECEIVE_COMMENTS_LISTING:
                return Object.assign({}, state, {
                    [action.identifier]: CommentList(state[action.identifier], action)
                });
            case commentConstants.UPDATE_COMMENTS:
                return Object.assign({}, state, {
                    [action.identifier]: CommentList(state[action.identifier], action)
                });
            case commentConstants.ERROR_COMMENTS_LISTING:
                return Object.assign({}, state, {
                    [action.identifier]: CommentList(state[action.identifier], action)
                });
            default:
                return state;
        }
    };

export default CommentReducer;
