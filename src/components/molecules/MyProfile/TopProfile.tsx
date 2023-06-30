import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import Routes from "@/constants/Routes";
import Link from "next/link";
import CopyButton from "@/components/atoms/CopyButton/CopyButton";

export const TopProfile = ({user, profile, theme}) => {

    let {first_name, last_name, email, picture} = user?.customer;

    return (
        <div className="profile-top">
            <figure className="profile-img">
                <Icon source={picture} alt="" title="" />
            </figure>
            <h3 className="profile-name" style={{color: theme?.text_color}}>
                {first_name+' '+last_name}
                <span className="profile-email" style={{color: theme?.text_color}}>{email} <CopyButton text={email} style={{color: theme?.text_color}}/></span>
            </h3>
            <Link href={Routes.editProfile(profile?.slug)} className="btn btn-line" style={{color: theme?.text_color}}>
                Edit Profile
            </Link>
        </div>
    );
}





