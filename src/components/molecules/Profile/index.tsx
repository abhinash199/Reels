import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import Link from "next/link";

const Profile = ({profile, theme}) => {
    return (
        <div className="user-btn">
            <Link href={'/'+profile?.slug+'/live/join'}>
            <figure className="user-pic">
                <Icon source={profile?.photo?.thumb} alt="user name" title="user name" />
            </figure>
            <span className="user-status" style={{color: theme?.primary_color}}>LIVE</span>
            </Link>
        </div>
    );
}
export default Profile;
