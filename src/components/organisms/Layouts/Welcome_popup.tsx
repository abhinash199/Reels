import React, { useState } from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import { updateProfile } from "@/containers/profile/actions/update";
import { useArtist, useWallet } from "../../../context";
import Routes from "@/constants/Routes";
import { useRouter } from "next/router";
import { Network } from "@/partials/index";
import { Helper } from "@/partials/index";


function Welcome_popup(props: any) {
  const [name, setname] = useState("");
  const { id, profile } = useArtist();

  let router = useRouter();
  const {updateCoins} = useWallet();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let _20CoinPopup = true;
    let payload = {
      name: name,
      _20CoinPopup: _20CoinPopup,
    };

    if (name.trim() !== "") {
      updateProfile(id, payload).then((response) => {
        let encodePayload = {
          first_name: response?.data?.customer?.first_name,
          last_name : response?.data?.customer?.last_name,
          avatar: response?.data?.customer?.photo?.thumb,
          id: response?.data?.customer?._id,
          email: response?.data?.customer?.email,
          email_verified: response?.data?.customer?.email_verified,
          mobile: response?.data?.customer?.mobile,
          mobile_code: response?.data?.customer?.mobile_code,
          mobile_verified: response?.data?.customer?.mobile_verified,
        };
        let encodedData = Helper.encode(encodePayload, {
          expiresIn: "365 days",
        });
        Helper.setCookie("FNUID", encodedData, { expires: 365, path: "/" });
      });
      updateCoins(20);
      setTimeout(() => {
        document.getElementsByClassName("welcome-panel")[0].style.display =
          "none";
          localStorage.removeItem("new_user");
        router.push(Routes.home(profile?.slug));
      }, 2000);
    }
  };

  return (
    <div className="welcome-panel open">
      <h1>Welcome!</h1>
      <figure className="welcome-icon">
        <Icon source={Icons.silvercoin} alt="coin" title="" />
      </figure>
      <h1>Win 20 Coins!</h1>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <input
          type="text"
          name="fullname"
          placeholder="Enter your full name for 20 Coins"
          onChange={(e) => setname(e.target.value)}
        />

        <button
          className="cnt-btn btn btn-primary wd-100 d-block"
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default Welcome_popup;
