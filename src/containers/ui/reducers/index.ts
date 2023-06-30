import {uiConstants} from "../constants";

const initialState = {
  showModal: false,
};

function UIReducer(state = initialState, action: any) {
  switch (action.type) {
    case uiConstants.UI_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
}

export default UIReducer;
