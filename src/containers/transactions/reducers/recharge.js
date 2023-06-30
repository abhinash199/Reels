import { transactionConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        packages: [],

    },

    RechargeReducer = (state = initialState, action) => {
        switch (action.type){
            case transactionConstants.REQUEST_RECHARGE_PAGE:
                return {
                    ...state,
                    loading: true
                };
            case transactionConstants.RECEIVE_RECHARGE_PAGE:
                return Object.assign({}, state, {
                    loading: false,
                    packages: action.packages.package
                });

            case transactionConstants.ERROR_RECHARGE_PAGE:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default RechargeReducer;
