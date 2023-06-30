import { photoConstants } from '../constants';

const initialState = {
    loading: true,
    error: false,
    album: [],
},
    AlbumReducer = (state = initialState, action) => {
        switch (action.type){
            case photoConstants.REQUEST_ALBUM:
                return {
                    ...state,
                    loading: true
                };
            case photoConstants.RECEIVE_ALBUM:
                return Object.assign({}, state, {
                    loading: false,
                    album: action.album
                });

            case photoConstants.ERROR_ALBUM:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default AlbumReducer;
