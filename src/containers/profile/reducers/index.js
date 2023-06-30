import { profileConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        user: [],
    },

    ProfileReducer = (state = initialState, action) => {
        switch (action.type){
            case profileConstants.REQUEST_PROFILE_PAGE:
                return {
                    ...state,
                    loading: true
                };
            case profileConstants.RECEIVE_PROFILE_PAGE:
                return Object.assign({}, state, {
                    loading: false,
                    user: action.user
                });

            case profileConstants.ERROR_PROFILE_PAGE:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default ProfileReducer;
