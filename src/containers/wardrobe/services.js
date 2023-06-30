import {Network} from '@/partials/index';

export const wardrobeService = {
    getWardrobeListing,
    getWardrobe,
    ordersRequests
};

function getWardrobeListing(id, page) {

    return Network.get('products/lists?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0&type=store&page='+page)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function ordersRequests(id, page) {

    return Network.getWithLogin('products/store/orders?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0&page='+page)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getWardrobe(id, contentId) {
    return Network.get('contents/listsv1?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&bucket_slug=photos&parent_id='+contentId)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response) {
    return response;
}

