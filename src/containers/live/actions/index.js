import { liveConstants } from '../constants';
import { liveService } from '../services';

export const joinLiveActions = {
    fetchJoinLivePage,
};

function fetchJoinLivePage(id)
{
    return (dispatch, getState) => {

        let { joinLive } = getState();

        //if((main.sorters.length === 0))  {

            dispatch(requestJoinLivePage());
            liveService.joinLivePage(id)
                .then(response => {
                        if (response.status === 200) {
                            dispatch(receiveJoinLivePage(response.data));
                        }
                        dispatch(failJoinLivePage(response));
                    }
                ).catch(error => {
                dispatch(failJoinLivePage(error));
            });
       // }
    };

    function requestJoinLivePage() {return { type: liveConstants.REQUEST_JOIN_LIVE}}
    function receiveJoinLivePage(sorters) {return { type: liveConstants.RECEIVE_JOIN_LIVE, sorters: sorters}}
    function failJoinLivePage() {return { type: liveConstants.ERROR_JOIN_LIVE}}

}






