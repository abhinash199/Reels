import { photoConstants } from '../constants';

const initialState = {
        loading : false,
        error: false,
        page: 1,
        photos: [],
        end: false,
    },

    PostList = (state = initialState, action) => {
        switch (action.type){
            case photoConstants.REQUEST_CREATORS_PHOTOS:
                return {
                    ...state,
                    loading: true
                };
            case photoConstants.RECEIVE_CREATORS_PHOTOS:
                const end = action.photos.list.length < 10 ? true : action.end ? action.end : false;
                return Object.assign({}, state, {
                    loading: false,
                    end: end,
                    page: state.page + 1,
                    photos: [...state.photos, ...action.photos.list]
                });
            case photoConstants.ERROR_CREATORS_PHOTOS:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    },

    CreatorPhotoReducer = (state = {}, action) => {
        switch (action.type){
            case photoConstants.REQUEST_CREATORS_PHOTOS:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            case photoConstants.RECEIVE_CREATORS_PHOTOS:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            case photoConstants.ERROR_CREATORS_PHOTOS:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            default:
                return state;
        }
    };

export default CreatorPhotoReducer;
