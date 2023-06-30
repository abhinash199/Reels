import {uiConstants} from "../constants";

export const showModal = (payload) => ({
  type: uiConstants.UI_SHOW_MODAL,
  payload: payload,
});

export const hideModal = (payload) => ({
  type: uiConstants.UI_HIDE_MODAL,
  payload: payload,
});

