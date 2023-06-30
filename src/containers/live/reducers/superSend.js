import { liveConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        sorters: [],
    },

    SuperSendReducer = (state = initialState, action) => {
        switch (action.type){
            case liveConstants.REQUEST_SUPERSEND:
                return {
                    ...state,
                    loading: true
                };
            case liveConstants.RECEIVE_SUPERSEND:
                return Object.assign({}, state, {
                    loading: false,
                    sorters: action.sorters.data
                });

            case liveConstants.ERROR_SUPERSEND:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default SuperSendReducer;
