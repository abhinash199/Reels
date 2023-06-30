import { liveConstants } from '../constants';
import { liveService } from '../services';

export const upcomingLiveActions = {
    fetchUpcomingLive,
    fetchUpcomingLiveDirect,
};

function fetchUpcomingLive(id) {
    return (dispatch, getState) => {

        let { upcomingLive } = getState();

        dispatch(requestUpcomingLive());
        liveService.upcomingLive(id)
            .then(response => {
                    if (response.status_code === 200) {
                        dispatch(receiveUpcomingLive(response.data));
                    }
                }
            ).catch(error => {
            dispatch(failUpcomingLive());
        });
    };

    function requestUpcomingLive() {return { type: liveConstants.REQUEST_UPCOMING_LIVE}}
    function receiveUpcomingLive(events) {return { type: liveConstants.RECEIVE_UPCOMING_LIVE, events: events}}
    function failUpcomingLive() {return { type: liveConstants.ERROR_UPCOMING_LIVE}}

}

function fetchUpcomingLiveDirect(id) {
    return liveService.upcomingLive(id)
        .then(response => {
            return response
        });
}






