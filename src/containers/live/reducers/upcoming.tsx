import { liveConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        events: [],
    },

    UpcomingLiveReducer = (state = initialState, action) => {
        switch (action.type){
            case liveConstants.REQUEST_UPCOMING_LIVE:
                return {
                    ...state,
                    loading: true
                };
            case liveConstants.RECEIVE_UPCOMING_LIVE:
                return Object.assign({}, state, {
                    loading: false,
                    events: action.events
                });

            case liveConstants.ERROR_UPCOMING_LIVE:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default UpcomingLiveReducer;
