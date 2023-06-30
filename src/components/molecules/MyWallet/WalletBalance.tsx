import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import SubTitle from "@/components/atoms/SubTitle/SubTitle";
import { useWallet } from "@/context/WalletContext";
import { CiWallet } from "react-icons/ci";
import Routes from "../../../constants/Routes";
import {useRouter} from "next/router";

export const WalletBalance = ({profile, theme}) => {

    const router = useRouter();
    const { coins } = useWallet();

    return (
        <div className="mw-ballance" style={{background: theme?.secondary_color}}>
            <SubTitle>Wallet Balance</SubTitle>
            <div className="status-point">
                <Icon source={Icons.token} width="36"/>
                {coins}
            </div>
            <div className="mw-recharge" onClick={() => router.push(Routes.recharge(profile?.slug))}><CiWallet fontSize={26}/> <span>Recharge Wallet</span> <span className="angle">></span></div>
        </div>
    );
}





