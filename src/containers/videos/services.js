import {Network} from '@/partials/index';

export const videoService = {
    getCreatorsVideos,
};

function getCreatorsVideos(id, content, page) {

    if(content === undefined) {
        content = 'videos';
    }

    return Network.get('contents/listsv1?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&bucket_slug='+content+'&page='+page)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}


