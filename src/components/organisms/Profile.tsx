import React from "react";
import {TopProfile, ProfileAccBalance, FanLevel, ProfileActions, ShareSocial} from "@/components/molecules/MyProfile";

export const Profile = ({user, profile, theme, android_app_link}) => {

    return (
        <>
            <TopProfile user={user} profile={profile} theme={theme} />
            <ProfileAccBalance theme={theme} profile={profile} />
            <FanLevel user={user} theme={theme} />
            <ProfileActions profile={profile} android_app_link={android_app_link} theme={theme} />
            {/*<ShareSocial/>*/}
        </>
   );
}



