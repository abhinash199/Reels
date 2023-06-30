import { chatConstants } from '../constants';

const initialState = {
        loading : false,
        error: false,
        page: 1,
        messages: [],
        end: false,
    },

    MessageList = (state = initialState, action) => {
        switch (action.type){
            case chatConstants.REQUEST_MESSAGES:
                return {
                    ...state,
                    loading: true
                };
            case chatConstants.RECEIVE_MESSAGES:
                const end = action.messages.list.length < 20 ? true : action.end ? action.end : false;
                return Object.assign({}, state, {
                    loading: false,
                    end: end,
                    page: state.page + 1,
                    messages: [...action.messages.list, ...state.messages]
                });
            case chatConstants.UPDATE_MESSAGES:
                return Object.assign({}, state, {
                    messages: [...state.messages, action.message]
                });
            case chatConstants.ERROR_MESSAGES:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    },

    MessageReducer = (state = {}, action) => {
        switch (action.type){
            case chatConstants.REQUEST_MESSAGES:
                return Object.assign({}, state, {
                    [action.identifier]: MessageList(state[action.identifier], action)
                });
            case chatConstants.RECEIVE_MESSAGES:
                return Object.assign({}, state, {
                    [action.identifier]: MessageList(state[action.identifier], action)
                });
            case chatConstants.UPDATE_MESSAGES:
                return Object.assign({}, state, {
                    [action.identifier]: MessageList(state[action.identifier], action)
                });
            case chatConstants.ERROR_MESSAGES:
                return Object.assign({}, state, {
                    [action.identifier]: MessageList(state[action.identifier], action)
                });
            default:
                return state;
        }
    };

export default MessageReducer;
