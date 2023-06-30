import React, {useEffect, useState} from "react";
import Icon from "@/components/atoms/Icon/Icon";
import {Helper} from '@/partials/index';
import { BiUserCircle } from "react-icons/bi";
import {useRouter} from "next/router";
import Routes from "../../../constants/Routes";

export const MenuHeader = ({profile, theme, loggedIn}) => {

    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        fetchUser().then();
    }, []);

    const fetchUser = async () => {
        let me = await Helper.decode(Helper.userToken())
        return setUser(me);
    }

    const getName = () => {
      return user?.first_name ? user?.first_name +' '+ user?.last_name : 'login';
    }

    const getAvatar = () => {
        return user?.avatar ?  <Icon source={user?.avatar} alt={user?.first_name} title={user?.first_name} /> : <BiUserCircle fontSize={60} color={theme?.text_color} />;
    }

    return (
        <>
            <div onClick={() => {loggedIn ? router.push(Routes.profile(profile?.slug)) : router.push(Routes.login(profile?.slug))}} className="sidebar-user link">
                <div className="user-img">
                    {getAvatar()}
                </div>
                <div className="user-name-info"  style={{color: theme?.text_color}}>
                    <span >{getName()}</span>
                    {user?.email ? user?.email : '' }
                </div>
                <div className="angle" style={{color: theme?.text_color}}>></div>
            </div>
            <hr style={{borderColor: theme?.secondary_color}} />
        </>
    );
}
