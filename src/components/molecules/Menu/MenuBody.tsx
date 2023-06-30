import React from "react";
import {useRouter} from "next/router";
import Routes from "../../../constants/Routes";

export const MenuBody = ({profile, theme, loggedIn}) => {
    const router = useRouter();
    return (

        <div className="ac-balance link" style={{color: theme?.text_color}} onClick={() => {loggedIn ? router.push(Routes.wallet(profile?.slug)) : router.push(Routes.login(profile?.slug))}}>
            <div className="coin-figure">
               View Wallet Balance
            </div>
            <div className="angle"><span>></span></div>
        </div>
    );
}
