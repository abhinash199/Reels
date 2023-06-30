import {Network} from '@/partials/index';

export const photoService = {
    getCreatorsPhotos,
    getAlbum,
};

function getCreatorsPhotos(id, content, page) {

    if(content === undefined) {
        content = 'photos';
    }

    return Network.get('contents/listsv1?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&bucket_slug='+content+'&page='+page)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getAlbum(id, contentId) {
    return Network.get('contents/listsv1?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&bucket_slug=photos&parent_id='+contentId)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}

