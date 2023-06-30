import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import { useWallet } from "@/context/WalletContext";
import { CiWallet } from "react-icons/ci";
import {useRouter} from "next/router";
import Routes from "@/constants/Routes";

export const ProfileAccBalance = ({profile, theme}) => {

    const router = useRouter();
    const { coins } = useWallet();

    return (
        <div className="acc-balance-wrap">
        <div className="acc-balance" style={{background: theme?.secondary_color, color: theme?.primary_color}} onClick={() => router.push(Routes.recharge(profile?.slug))}>
            <div>
                <p>
                    <span><CiWallet /></span> Account Balance
                </p>
                <div className="acc-fig">
                    <Icon source={Icons.coin} alt="" title="" />
                    {coins}
                </div>
            </div>
            <div className="angle">
                >
            </div>
        </div>
        </div>
    );
}





