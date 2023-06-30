import React from "react";
import { CiLock, CiSettings, CiCircleQuestion, CiStar, CiMemoPad, CiWarning, CiLogout } from "react-icons/ci";
import {IoIosNotificationsOutline} from "react-icons/io";
import Routes from "@/constants/Routes";
import Link from "next/link";
import {useRouter} from "next/router";
import {Helper} from '@/partials/index';

export const ProfileActions = ({profile, android_app_link, theme}) => {

    const router = useRouter();

    const doLogout = (e) => {
        e.preventDefault();
        Helper.clearSiteCookie("FNSID");
        Helper.clearSiteCookie("FNUID");
        localStorage.removeItem("new_user");
        return router.push(Routes.login(profile?.slug));
    }

    return (
        <div className="profile-actions">
            {/*<a href="#"><i><IoIosNotificationsOutline /></i> Notifications <span className="angle">></span></a>*/}
            {/*<a href="#"><i><CiSettings /></i> Account Settings <span className="angle">></span></a>*/}
            <Link href={Routes.faq} target='_blank' style={{color: theme?.text_color, borderTop: "1px solid "+theme?.text_color}}><i><CiCircleQuestion color={theme?.text_color} /></i> FAQs <span className="angle">></span></Link>
            {/* <Link href={android_app_link} target='_blank' style={{color: theme?.text_color, borderTop: "1px solid "+theme?.text_color}}><i><CiStar color={theme?.text_color} /></i> Rate Us <span className="angle">></span></Link> */}
            <Link href={Routes.termsUse} target='_blank' style={{color: theme?.text_color, borderTop: "1px solid "+theme?.text_color}}><i><CiMemoPad color={theme?.text_color} /></i> Terms & Conditions <span className="angle">></span></Link>
            <Link href={Routes.privacyPolicy} target='_blank' style={{color: theme?.text_color, borderTop: "1px solid "+theme?.text_color}}><i><CiLock  color={theme?.text_color} /></i> Privacy Policy <span className="angle">></span></Link>
            {/*<Link href={Routes.editProfile(profile?.slug)} target='_blank'><i><CiWarning /></i> Disclaimer <span className="angle">></span></Link>*/}
            <a href="#javascript" style={{color: theme?.text_color , borderTop: "1px solid "+theme?.text_color}} onClick={(e) => doLogout(e)}><i><CiLogout /></i> Logout <span className="angle">></span></a>
        </div>
    );
}





