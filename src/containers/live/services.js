import axios from 'axios';
import Cookies from "js-cookie";
import {Network} from '@/partials/index';

export const liveService = {
    joinLivePage,
    superSendPage,
    upcomingLive,
    getToken,
    getGift,
    purchaseLive,
    memberCount
};

function upcomingLive(id) {

    return Network.get('lives/v2/upcoming/'+id+'?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0')
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function memberCount() {
    return Network.getExternal(process.env.NEXT_PUBLIC_AGORA_API_URL, 'channel/user/')
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function purchaseLive(id, channel) {
    return Network.postWithLogin('customers/passbook/purchaselive?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&entity_id='+channel, id, {})
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getToken(payload) {
    return Network.getWithLogin('accounts/agora/aggregator/dynamickey?customer_id='+payload.customer_id+'&artist_id='+payload.artist_id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0&channel='+payload.channel)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function getGift(id) {
    return Network.getWithLogin('gifts/lists?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM+'&v=1.0')
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function joinLivePage(id) {

    let countryCookie  = Cookies.get("EAPICID");
    let country = '';
    // if(countryCode) {
    //     country = '?country_code='+countryCode;
    // } else {
    //     country = countryCookie === undefined || countryCookie === null || countryCookie === "" ? '' : '?country_code='+countryCookie;
    // }

    const requestOptions = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: { 'Content-Type': 'application/json',
            'ApiKey': process.env.NEXT_PUBLIC_API_ACCESS_KEY},
    });

    return requestOptions.get('homepagev1?artist_id='+id+'&platform=web')
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}


function superSendPage(id) {

    let countryCookie  = Cookies.get("EAPICID");
    let country = '';
    // if(countryCode) {
    //     country = '?country_code='+countryCode;
    // } else {
    //     country = countryCookie === undefined || countryCookie === null || countryCookie === "" ? '' : '?country_code='+countryCookie;
    // }

    const requestOptions = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: { 'Content-Type': 'application/json',
            'ApiKey': process.env.NEXT_PUBLIC_API_ACCESS_KEY},
    });

    return requestOptions.get('homepagev1?artist_id='+id+'&platform=web')
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response)
{
    // console.log(response);
    return response;
}
