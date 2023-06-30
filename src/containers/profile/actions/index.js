import { profileConstants } from '../constants';
import { profileService } from '../services';

export const profileActions = {
    fetchProfile,
};

function fetchProfile(artistId) {
    return (dispatch, getState) => {

        let { profile } = getState();

        //if((main.sorters.length === 0))  {

            dispatch(requestProfilePage());
            profileService.getProfile(artistId)
                .then(response => {
                        if (response.status_code === 200) {
                            dispatch(receiveProfilePage(response.data));
                        }
                        dispatch(failProfilePage(response));
                    }
                ).catch(error => {
                dispatch(failProfilePage(error));
            });
       // }
    };

    function requestProfilePage() {return { type: profileConstants.REQUEST_PROFILE_PAGE}}
    function receiveProfilePage(user) {return { type: profileConstants.RECEIVE_PROFILE_PAGE, user: user}}
    function failProfilePage() {return { type: profileConstants.ERROR_PROFILE_PAGE}}

}






