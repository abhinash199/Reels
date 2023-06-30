import axios from 'axios';
import Cookies from "js-cookie";

function withLogin(params) {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'ApiKey': process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            'Platform': process.env.NEXT_PUBLIC_PLATFORM,
            'Authorization': checkLogin(),
            'artistid' : params,
            'product': 'apm',
            'v': '1.0'
        },
    });
}

function withLoginUpload(params) {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: {
            'Content-Type': 'multipart/form-data;',
            'ApiKey': process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            'Platform': process.env.NEXT_PUBLIC_PLATFORM,
            'Authorization': checkLogin(),
            'artistid' : params,
            'product': 'apm',
            'v': '1.0'
        },
    });
}

function withOutLogin () {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: { 'Content-Type': 'application/json', 'ApiKey': process.env.NEXT_PUBLIC_API_ACCESS_KEY, 'Platform': process.env.NEXT_PUBLIC_PLATFORM, 'v': '1.0'},
    });
}

function withExternal (baseURL) {
    let encodedStringBtoA = btoa('2d81caf9fe704ebeb54977e9e581dd36' + ":" + '3a77ec50ea2e41fa8ec05150fbac4ef5');
    return axios.create({
        baseURL: baseURL,
        headers: { 'Content-Type': 'application/json', 'Authorization': "Basic " + encodedStringBtoA},
    });
}

function checkLogin(){
    let token = Cookies.get("FNSID");
    return  token ? token : false;
}

export const Network = {
    instance: () => {
        return withOutLogin();
    },
    get: url => {
        return  withOutLogin().get(url, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
    getExternal: (baseURL, url) => {
        return  withExternal(baseURL).get(url, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
    getWithLogin: (url, params = []) => {
        return  withLogin(params).get(url, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
    post: (url, parameters) => {
        return withOutLogin()
            .post(url, parameters)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
    postWithLogin: (url, params, payload) => {
        return withLogin(params)
            .post(url, payload)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
    postWithLoginUpload: (url, params, payload) => {
        return withLoginUpload(params)
            .post(url, payload)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
};
