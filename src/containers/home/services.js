import axios from 'axios';
import Cookies from "js-cookie";

export const homeService = {
    homePage
};

function homePage(id) {

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

    return requestOptions.get('homepagev1?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM)
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
