import { menuConstants } from '../constants';
import { menuService } from '../services';

export const menuActions = {
    fetchMenu,
};

function fetchMenu(id)
{
    return (dispatch, getState) => {

        let { menu } = getState();

        //if((main.sorters.length === 0))  {

            dispatch(requestMenu());
            menuService.getMenu(id)
                .then(response => {
                //    console.log(response);

                        // if (response.status === 200) {
                            dispatch(receiveMenu(response.data));
                        // }
                        dispatch(failMenu(response));
                    }
                ).catch(error => {
                dispatch(failMenu(error));
            });
       // }
    };

    function requestMenu() {return { type: menuConstants.REQUEST_MENU}}
    function receiveMenu(menus) {return { type: menuConstants.RECEIVE_MENU, menus: menus}}
    function failMenu() {return { type: menuConstants.ERROR_MENU}}

}












