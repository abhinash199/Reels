import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const ShareSocial = () => {
    return (
        <div className="profile-share">
            <p>Share</p>
            <a href="#"><FaFacebookF/></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp/></a>
        </div>
    );
}





