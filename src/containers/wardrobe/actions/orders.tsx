import { wardrobeConstants } from '../constants';
import { wardrobeService } from '../services';

export const ordersRequestsActions = {
  ordersRequests,
};

function ordersRequests(params, page) {
  return (dispatch) => {
    dispatch(request());
    wardrobeService
        .ordersRequests(params, page)
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
    return { type: wardrobeConstants.REQUEST_WARDROBE_ORDERS_LISTING };
  }
  function success(orders) {
    return { type: wardrobeConstants.RECEIVE_WARDROBE_ORDERS_LISTING, orders };
  }
  function failure(error) {
    return { type: wardrobeConstants.ERROR_WARDROBE_ORDERS_LISTING, error };
  }
}
