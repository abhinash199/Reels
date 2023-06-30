import { transactionConstants } from '../constants';

const initialState = {
        loading : false,
        error: false,
        page: 1,
        passbook: [],
        end: false,
    },

    PostList = (state = initialState, action) => {
        switch (action.type){
            case transactionConstants.REQUEST_WALLET_PAGE:
                return {
                    ...state,
                    loading: true
                };
            case transactionConstants.RECEIVE_WALLET_PAGE:
                const end = action.passbook.list.length < 10 ? true : action.end ? action.end : false;
                return Object.assign({}, state, {
                    loading: false,
                    end: end,
                    page: state.page + 1,
                    passbook: [...state.passbook, ...action.passbook.list]
                });
            case transactionConstants.ERROR_WALLET_PAGE:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    },

    WalletReducer = (state = {}, action) => {
        switch (action.type){
            case transactionConstants.REQUEST_WALLET_PAGE:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            case transactionConstants.RECEIVE_WALLET_PAGE:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            case transactionConstants.ERROR_WALLET_PAGE:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            default:
                return state;
        }
    };

export default WalletReducer;
