import { profileConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        user: [],
    },

    UpdateProfileReducer = (state = initialState, action) => {
        switch (action.type){
            case profileConstants.REQUEST_UPDATE_PAGE:
                return {
                    ...state,
                    loading: true
                };
            case profileConstants.RECEIVE_UPDATE_PAGE:
                return Object.assign({}, state, {
                    loading: false,
                    user: action.user.data
                });

            case profileConstants.ERROR_UPDATE_PAGE:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default UpdateProfileReducer;
