import { liveConstants } from "../constants";
import { liveService } from "../services";

export const giftAction = {
  gift,
};

function gift(id) {
  return (dispatch) => {
    dispatch(requestGift());
    liveService
      .getGift(id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(requestGift(response.data));
        }
        dispatch(successGift(response));
      })
      .catch((error) => {
        dispatch(failureGift(error));
      });
  };

  function requestGift() {
    return { type: liveConstants.REQUEST_GET_GIFT };
  }
  function successGift(response) {
    return { type: liveConstants.RECEIVE_GET_GIFT, payload: response };
  }
  function failureGift(error) {
    return { type: liveConstants.ERROR_GET_GIFT, error };
  }
}
