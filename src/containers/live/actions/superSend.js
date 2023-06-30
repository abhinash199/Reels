import { liveConstants } from '../constants';
import { liveService } from '../services';

export const superSendActions = {
    fetchSuperSendPage,
};

function fetchSuperSendPage(id)
{
    return (dispatch, getState) => {

        let { superSend } = getState();

        //if((main.sorters.length === 0))  {

            dispatch(requestSuperSendPage());
            liveService.superSendPage(id)
                .then(response => {
                        if (response.status === 200) {
                            dispatch(receiveSuperSendPage(response.data));
                        }
                        dispatch(failSuperSendPage(response));
                    }
                ).catch(error => {
                dispatch(failSupersendPage(error));
            });
       // }
    };

    function requestSuperSendPage() {return { type: liveConstants.REQUEST_SUPERSEND}}
    function receiveSuperSendPage(sorters) {return { type: liveConstants.RECEIVE_SUPERSEND, sorters: sorters}}
    function failSuperSendPage() {return { type: liveConstants.ERROR_SUPERSEND}}

}






