import { callConstants } from '../constants';

const initialState = {
      loading: true,
      error: false,
      calls: [],
    },
    VideoCallRequestReducer = (state = initialState, action) => {
      switch (action.type){
        case callConstants.REQUEST_VIDEO_CALL_REQUEST:
          return {
            ...state,
            loading: true
          };
        case callConstants.RECEIVE_VIDEO_CALL_REQUEST:
          return Object.assign({}, state, {
            loading: false,
              calls: action.calls
          });

        case callConstants.ERROR_VIDEO_CALL_REQUEST:
          return {
            ...state,
            loading: false,
            error: true
          };
        default:
          return state;
      }
    };

export default VideoCallRequestReducer;
