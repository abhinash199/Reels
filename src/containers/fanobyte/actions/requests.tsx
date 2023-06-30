import { fanoByteConstants } from "../constants";
import { fanoByteService } from "../services";

export const greetingRequestsActions = {
  greetingRequests,
};

function greetingRequests(params, page) {
  return (dispatch) => {
    dispatch(request());
      fanoByteService
        .greetingRequests(params, page)
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
    return { type: fanoByteConstants.REQUEST_GREETING_LISTING };
  }
  function success(greetings) {
    return { type: fanoByteConstants.RECEIVE_GREETING_LISTING, greetings };
  }
  function failure(error) {
    return { type: fanoByteConstants.ERROR_GREETING_LISTING, error };
  }
}
