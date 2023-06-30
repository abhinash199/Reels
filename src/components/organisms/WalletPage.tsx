import React from "react";
import { WalletBalance, WalletHistory } from "@/components/molecules/MyWallet";
import Loader from "@/components/atoms/Loader";

export const WalletPage = ({passbook, username, profile, theme, setElement}) => {
       return (
      <>
      <div className="wallet-wrap">
          <WalletBalance profile={profile} theme={theme} />
          <WalletHistory passbook={passbook} username={username} theme={theme} setElement={setElement} />
      </div>
      </>
   );

}



