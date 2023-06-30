import axios from 'axios';

export const menuService = {
    getMenu,
};

function getMenu(id)
{
    // let countryCookie  = Cookies.get("EAPICID");
    // if(country) {
    //     country = '&country_code='+country;
    // } else {
    //     country = countryCookie === undefined || countryCookie === null || countryCookie === "" ? '' : '&country_code=' + countryCookie;
    // }

        const requestOptions = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: { 'Content-Type': 'application/json',
        'ApiKey': process.env.NEXT_PUBLIC_API_ACCESS_KEY},
    });

    return requestOptions.get('buckets/lists?artist_id='+id+'&platform='+process.env.NEXT_PUBLIC_PLATFORM)
        .then(handleResponse)
        .catch(error => {
            return error;
        })
}

function handleResponse(response)
{
    return response;
}

