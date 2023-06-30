import { wardrobeConstants } from '../constants';

const initialState = {
      loading: true,
      error: false,
        orders: [],
    },
    WardrobeOrdersReducer = (state = initialState, action) => {
      switch (action.type){
        case wardrobeConstants.REQUEST_WARDROBE_ORDERS_LISTING:
          return {
            ...state,
            loading: true
          };
        case wardrobeConstants.RECEIVE_WARDROBE_ORDERS_LISTING:
          return Object.assign({}, state, {
            loading: false,
              orders: action.orders
          });

        case wardrobeConstants.ERROR_WARDROBE_ORDERS_LISTING:
          return {
            ...state,
            loading: false,
            error: true
          };
        default:
          return state;
      }
    };

export default WardrobeOrdersReducer;
