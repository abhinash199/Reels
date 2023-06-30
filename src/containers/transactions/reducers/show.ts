import { transactionConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        orders: [],

    },
    OrderReducer = (state = initialState, action) => {
        switch (action.type){
            case transactionConstants.REQUEST_ORDERS:
                return {
                    ...state,
                    loading: true
                };
            case transactionConstants.RECEIVE_ORDERS:
                return Object.assign({}, state, {
                    loading: false,
                    orders: action.orders
                });

            case transactionConstants.ERROR_ORDERS:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default OrderReducer;
