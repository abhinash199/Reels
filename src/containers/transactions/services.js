import {Network} from '@/partials/index';

export const transactionService = {
    fetchMyWallet,
    fetchPackages,
    doPurchase,
    showPurchases,
    purchaseLiveGift,
    purchaseLiveEvent,
    purchaseGreeting,
};

function purchaseGreeting(artistId, payload) {
    return Network.postWithLogin('products/store/purchase?artist_id='+artistId+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0&page=1', artistId, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function purchaseLiveGift(artistId, payload) {
    return Network.postWithLogin('customers/passbook/sendgift', artistId, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}


function purchaseLiveEvent(artistId, payload) {
    return Network.postWithLogin('customers/passbook/purchaselive', artistId, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function fetchMyWallet(artistId, page) {
    return Network.getWithLogin('customers/passbook'+'?txn_type=all&page='+page)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function fetchPackages(artistId)
{
    return Network.get('artists/packages?artist_id='+artistId+'&platform='+process.env.NEXT_PUBLIC_PLATFORM)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function doPurchase(artistId, payload) {
    return Network.postWithLogin('customers/passbook/purchasecontent', artistId, payload)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function showPurchases(artistId) {
    return Network.getWithLogin('customers/metaidsv3'+'?artist_id='+artistId+'&platform='+process.env.NEXT_PUBLIC_PLATFORM, artistId)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}


function handleResponse(response)
{
    return response;
}

