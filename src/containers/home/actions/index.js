import { homeConstants } from '../constants';
import { homeService } from '../services';

export const homeActions = {
    fetchHomePage,
};

function fetchHomePage(id)
{
    return (dispatch, getState) => {

        let { home } = getState();

        //if((main.sorters.length === 0))  {

            dispatch(requestHomePage());
            homeService.homePage(id)
                .then(response => {
                        if (response.status === 200) {
                            dispatch(receiveHomePage(response.data));
                        }
                        dispatch(failHomePage(response));
                    }
                ).catch(error => {
                dispatch(failHomePage(error));
            });
       // }
    };

    function requestHomePage() {return { type: homeConstants.REQUEST_HOME_PAGE}}
    function receiveHomePage(sorters) {return { type: homeConstants.RECEIVE_HOME_PAGE, sorters: sorters}}
    function failHomePage() {return { type: homeConstants.ERROR_HOME_PAGE}}

}






