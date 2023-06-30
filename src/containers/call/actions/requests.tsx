import { callConstants } from "../constants";
import { callService } from "../services";

export const callRequestsActions = {
  callRequests,
};

function callRequests(params, page) {
  return (dispatch) => {
    dispatch(request());
    callService
        .callRequests(params, page)
        .then((response) => {
          if (response.status_code === 200) {
            dispatch(success(response.data));
          }
          if (response.data.status_code === 401) {
            dispatch(failure(response.data));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
  };

  function request() {
    return { type: callConstants.REQUEST_VIDEO_CALL_REQUEST };
  }
  function success(calls) {
    return { type: callConstants.RECEIVE_VIDEO_CALL_REQUEST, calls };
  }
  function failure(error) {
    return { type: callConstants.ERROR_VIDEO_CALL_REQUEST, error };
  }
}
