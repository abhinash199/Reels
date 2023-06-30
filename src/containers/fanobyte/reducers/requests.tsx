import { fanoByteConstants } from '../constants';

const initialState = {
      loading: true,
      error: false,
      greetings: [],
    },
    GreetingRequestReducer = (state = initialState, action) => {
      switch (action.type){
        case fanoByteConstants.REQUEST_GREETING_LISTING:
          return {
            ...state,
            loading: true
          };
        case fanoByteConstants.RECEIVE_GREETING_LISTING:
          return Object.assign({}, state, {
            loading: false,
              greetings: action.greetings
          });

        case fanoByteConstants.ERROR_GREETING_LISTING:
          return {
            ...state,
            loading: false,
            error: true
          };
        default:
          return state;
      }
    };

export default GreetingRequestReducer;
