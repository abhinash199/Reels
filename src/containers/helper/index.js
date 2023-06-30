import axios from 'axios';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const helper = {
  withLogin,
  withOutLogin,
  checkLogin
};

function withLogin() {
  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Cookies.get("EAPISID"),
    },
  });
}

function withOutLogin() {
  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function checkLogin(){
  let token = Cookies.get("EAPISID");
  return  token ? token : false;
};

function checkIsCreator(){
  let token = Cookies.get("EAPISID");
  let decode = jwtDecode(token);
  return decode?.role === 'creator'
};

