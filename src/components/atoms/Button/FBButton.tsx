import React, {useEffect, useState} from "react";
import {
    LoginSocialFacebook,
} from 'reactjs-social-login';
import Icon from "../Icon/Icon";
import {Icons} from "@/constants/Icons";
import {socialLogin} from "@/containers/auth/actions";
import {useArtist} from "@/context/ArtistContext";
import {Helper} from "@/partials/Helper";
import Routes from "@/constants/Routes";
import {useRouter} from "next/router";

const FBButton = ({profile, destination}) => {

    let router = useRouter();

    const REDIRECT_URI = '';
    const [response, setResponse] = useState({
        email: '',
        first_name: '',
        family_name: '',
    });

    const { id } = useArtist();

    useEffect(() => {
        if(response?.email !== '') {
            let payload = {
                identity: 'facebook',
                email: response?.email,
                facebook_id :  process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                first_name: response?.first_name,
            }
            socialLogin(payload, id).then(response => {
                let new_user = response.data.new_user;
                let firstname= response.data.customer.first_name;
                let lastname= response.data.customer.last_name;  
                let rewardNameUpdate = response.data.reward_name_update;
                const user={
                    new_user,
                    firstname,
                    lastname,
                    rewardNameUpdate
                } 
                localStorage.setItem("new_user",JSON.stringify(user));
                if(response?.data?.token !== undefined) {
                    Helper.setCookie('FNSID', response?.data?.token, { expires: 365, path: "/" });
                    let encodePayload = {
                        'first_name' : response?.data?.customer?.first_name,
                        'last_name' : response?.data?.customer?.last_name,
                        'avatar' : response?.data?.customer?.photo?.thumb,
                        'id' : response?.data?.customer?.customer_id,
                        'email' : response?.data?.customer?.email,
                        'email_verified' : response?.data?.customer?.email_verified,
                    }
                    let encodedData = Helper.encode(encodePayload, { expiresIn: "365 days" });
                    Helper.setCookie('FNUID', encodedData, { expires: 365, path: "/" });
                    if(!destination) {
                        router.push(Routes.home(profile?.slug));
                    } else {
                        router.push(Routes.content(profile?.slug, destination));
                    }
                }
            });

        }
    }, [response]);

    return (
        <LoginSocialFacebook
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            fieldsProfile={
                'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
            }
            redirect_uri={REDIRECT_URI}
            onResolve={({ provider, data }) => {
                // @ts-ignore
                setResponse(data);
            }}
            onReject={err => {
                console.log(err);
            }}
        >
            <Icon source={Icons.fb} />
        </LoginSocialFacebook>
    );

}

export default FBButton;
