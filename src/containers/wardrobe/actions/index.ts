import { wardrobeConstants } from '../constants';
import { wardrobeService } from '../services';

export const wardrobeActions = {
    fetchWardrobe
};

function fetchWardrobe(username, id, next = false) {
    return (dispatch, getState) =>
    {
        let { products } = getState();

        if(shouldFetchWardrobe(products, username, next)) {
            const page = products[username] ? products[username].page : 1;
            dispatch(requestWardrobe(username));
            wardrobeService.getWardrobeListing(id, page)
                .then(response => {
                        // if (response.status === 200) {
                            dispatch(receiveWardrobe(username, response.data));
                        // }
                    }
                ).catch(error => {
                dispatch(failWardrobe(username, error));
            });
        }
    };

    function shouldFetchWardrobe(lists, name, next = false) {
        const activeList = lists.name;
        return (!activeList || (!activeList.loading && !activeList.end && (next ? activeList.page !== 1: next) ))
    }

    function requestWardrobe(username) {return { type: wardrobeConstants.REQUEST_WARDROBE_LISTING, identifier: username}}
    function receiveWardrobe(username, products) {return { type: wardrobeConstants.RECEIVE_WARDROBE_LISTING, identifier: username, products: products}}
    function failWardrobe(username, error) {return { type: wardrobeConstants.ERROR_WARDROBE_LISTING, identifier: username, error:error}}
}





