import { videoConstants } from '../constants';

const initialState = {
        loading : false,
        error: false,
        page: 1,
        videos: [],
        end: false,
    },

    PostList = (state = initialState, action) => {

        switch (action.type){
            case videoConstants.REQUEST_CREATORS_VIDEOS:
                return {
                    ...state,
                    loading: true
                };
            case videoConstants.RECEIVE_CREATORS_VIDEOS:
                const end = action.videos.list.length < 10 ? true : action.end ? action.end : false;

                return Object.assign({}, state, {
                    loading: false,
                    end: end,
                    page: state.page + 1,
                    videos: [...state.videos, ...action.videos.list]
                });
            case videoConstants.UPDATE_CREATOR_VIDEOS:
                let entityId = action?.payload?.purchase?.entity_id;
                state.videos.map(item => {
                    if(entityId === item?._id) {
                        item['commercial_type'] = 'free';
                        item['photo_portrait'] = action?.payload?.content?.photo_portrait;
                    }
                });
                return Object.assign({}, state, {
                    loading: false,
                    videos: state.videos
                });
            case videoConstants.ERROR_CREATORS_VIDEOS:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    },
    CreatorVideoReducer = (state = {}, action) => {
        switch (action.type){
            case videoConstants.REQUEST_CREATORS_VIDEOS:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            case videoConstants.RECEIVE_CREATORS_VIDEOS:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            case videoConstants.ERROR_CREATORS_VIDEOS:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            case videoConstants.UPDATE_CREATOR_VIDEOS:
                return Object.assign({}, state, {
                    [action.identifier]: PostList(state[action.identifier], action)
                });
            default:
                return state;
        }
    };

export default CreatorVideoReducer;
