import { liveConstants } from "../constants";

const initialState = {
    loading: true,
    error: false,
    gift: [],
  },
  GiftReducer = (state = initialState, action) => {
    switch (action.type) {
      case liveConstants.REQUEST_GET_GIFT:
        return {
          ...state,
          loading: true,
        };
      case liveConstants.RECEIVE_GET_GIFT:
        return Object.assign({}, state, {
          loading: false,
          error: false,
          gift: action.payload.data,
        });
      case liveConstants.ERROR_GET_GIFT:
        return {
          ...state,
          loading: false,
          error: true,
        };
      default:
        return state;
    }
  };

export default GiftReducer;
