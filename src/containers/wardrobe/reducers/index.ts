import { wardrobeConstants } from '../constants';

const initialState = {
        loading : false,
        error: false,
        page: 1,
        products: [],
        end: false,
    },

    WardrobeList = (state = initialState, action) => {
        switch (action.type){
            case wardrobeConstants.REQUEST_WARDROBE_LISTING:
                return {
                    ...state,
                    loading: true
                };
            case wardrobeConstants.RECEIVE_WARDROBE_LISTING:
                const end = action.products.lists.length < 10 ? true : action.end ? action.end : false;
                return Object.assign({}, state, {
                    loading: false,
                    end: end,
                    page: state.page + 1,
                    products: [...state.products, ...action.products.lists]
                });
            case wardrobeConstants.ERROR_CREATORS_PHOTOS:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    },

    WardrobeListingReducer = (state = {}, action) => {
        switch (action.type){
            case wardrobeConstants.REQUEST_WARDROBE_LISTING:
                return Object.assign({}, state, {
                    [action.identifier]: WardrobeList(state[action.identifier], action)
                });
            case wardrobeConstants.RECEIVE_WARDROBE_LISTING:
                return Object.assign({}, state, {
                    [action.identifier]: WardrobeList(state[action.identifier], action)
                });
            case wardrobeConstants.ERROR_WARDROBE_LISTING:
                return Object.assign({}, state, {
                    [action.identifier]: WardrobeList(state[action.identifier], action)
                });
            default:
                return state;
        }
    };

export default WardrobeListingReducer;
