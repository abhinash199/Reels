import { photoConstants } from '../constants';
import { photoService } from '../services';

export const creatorPhotosActions = {
    fetchCreatorPhotos
};

function fetchCreatorPhotos(username, id, content, next = false)
{
    return (dispatch, getState) =>
    {
        let { creatorPhotos } = getState();

        if(shouldFetchCreatorPhotos(creatorPhotos, username, next)) {
            const page = creatorPhotos[username] ? creatorPhotos[username].page : 1;
            dispatch(requestCreatorPhotos(username));
            photoService.getCreatorsPhotos(id, content, page)
                .then(response => {
                        // if (response.status === 200) {
                            dispatch(receiveCreatorPhotos(username, response.data));
                        // }
                    }
                ).catch(error => {
                dispatch(failCreatorPhotos(username, error));
            });
        }
    };

    function shouldFetchCreatorPhotos(lists, name, next = false) {
        const activeList = lists.name;
        return (!activeList || (!activeList.loading && !activeList.end && (next ? activeList.page !== 1: next) ))
    }

    function requestCreatorPhotos(username) {return { type: photoConstants.REQUEST_CREATORS_PHOTOS, identifier: username}}
    function receiveCreatorPhotos(username, photos) {return { type: photoConstants.RECEIVE_CREATORS_PHOTOS, identifier: username, photos: photos}}
    function failCreatorPhotos(username, error) {return { type: photoConstants.ERROR_CREATORS_PHOTOS, identifier: username, error:error}}
}





