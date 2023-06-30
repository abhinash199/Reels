import { videoConstants } from '../constants';
import { videoService } from '../services';

export const creatorVideosActions = {
    fetchCreatorVideos,
    updateCreatorVideos
};

function fetchCreatorVideos(username, id, content, next = false)
{
    return (dispatch, getState) =>
    {
        let { creatorVideos } = getState();

        if(shouldFetchCreatorVideos(creatorVideos, username, next)) {
            const page = creatorVideos[username] ? creatorVideos[username].page : 1;

            dispatch(requestCreatorVideos(username));
            videoService.getCreatorsVideos(id, content, page)
                .then(response => {
                        // if (response.status === 200) {
                            dispatch(receiveCreatorVideos(username, response.data));
                        // }
                    }

                ).catch(error => {
                dispatch(failCreatorVideos(username, error));
            });
        }
    };

    function shouldFetchCreatorVideos(lists, name, next = false) {
        const activeList = lists.name;
        return (!activeList || (!activeList.loading && !activeList.end && (next ? activeList.page !== 1: next) ))
    }

    function requestCreatorVideos(username) {return { type: videoConstants.REQUEST_CREATORS_VIDEOS, identifier: username}}
    function receiveCreatorVideos(username, videos) {
        return { type: videoConstants.RECEIVE_CREATORS_VIDEOS, identifier: username, videos: videos
        }}
    function failCreatorVideos(username, error) {return { type: videoConstants.ERROR_CREATORS_VIDEOS, identifier: username, error:error}}
}

function updateCreatorVideos(username, payload) {
    return { type: videoConstants.UPDATE_CREATOR_VIDEOS, identifier: username, payload: payload}
}










