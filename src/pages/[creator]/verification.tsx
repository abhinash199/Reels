import React, {useEffect, useState} from "react";
import { useArtist, useAuth } from "@/context/index";
import { OtpForm } from "@/components/organisms/Form";
import {useRouter} from "next/router";
import {sendOtp, otpVerify} from "@/containers/auth/actions";
import Routes from "../../constants/Routes";
import {Helper} from "@/partials/Helper";
// import Moe from '@moengage/web-sdk';

const Verification = () => {

    let router = useRouter();

    const { mobile } = router.query;
    let mobileNumber:String = '';
    if (typeof mobile === 'string') {
       const decodedBuffer = Buffer.from(mobile, 'base64');
       mobileNumber = decodedBuffer.toString('utf-8');
    }
   
    let mobileCode =  router?.query?.code;
    let destination =  router?.query?.destination;

    const { id, profile, theme } = useArtist();
    const { loggedIn } = useAuth();

    const [input, setInput] = useState('');
    const [error, setError] = useState({error: false, errorMessage: ''});
    const [errorMobile, setErrorMobile] = useState(false);
    const [loginSubmitted, setLoginSubmitted] = useState(false);

    useEffect(() => {
        if (router.asPath !== router.route) {
            let creator =  router?.query?.creator;
            if (loggedIn && creator) {
                if(!destination) {
                    router.push(Routes.home(creator));
                } else {
                    router.push(Routes.content(creator, destination));
                }
            }
        }
    },[router]);

    const verifyOtp = (event) => {
        event.preventDefault();
            let payload = {
                identity:'mobile',
                mobile:mobileNumber,
                mobile_code: mobileCode,
                activity:'login',
                otp: input,
            };

            otpVerify(payload, id).then(response => {  
                          
                if(response?.error){
                        setError({error: response.error, errorMessage: response?.error_messages?.[0]});
                        setTimeout(() => {
                            setError({ error: false, errorMessage: '' });
                          }, 3000);
                        setInput('');
                }
                if(response?.data?.token !== undefined) {
                    // Update user properties for user in moengage
                    // response.data.customer.first_name && Moe.add_first_name(response.data.customer.first_name);
                    // response.data.customer.last_name && Moe.add_last_name(response.data.customer.last_name);
                    // response.data.customer.email && Moe.add_email(response.data.customer.email);
                    // response.data.customer.mobile && Moe.add_mobile(response.data.customer.mobile);
                    // response.data.customer.customer_id && Moe.add_user_name(response.data.customer.customer_id);
                    // response.data.customer.gender && Moe.add_gender(response.data.customer.gender);
                    // response.data.customer.dob && Moe.add_birthday(response.data.customer.dob);
    
                    Helper.setCookie('FNSID', response?.data?.token, { expires: 365, path: "/" });
                    let encodePayload = {
                        'first_name' : response?.data?.customer?.first_name,
                        'last_name' : response?.data?.customer?.last_name,
                        'avatar' : response?.data?.customer?.photo?.thumb,
                        'id' : response?.data?.customer?.customer_id,
                        'email' : response?.data?.customer?.email,
                        'email_verified' : response?.data?.customer?.email_verified,
                        'mobile' : response?.data?.customer?.mobile,
                        'mobile_code' : response?.data?.customer?.mobile_code,
                        'mobile_verified' : response?.data?.customer?.mobile_verified,
                    }

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
                    let encodedData = Helper.encode(encodePayload, { expiresIn: "365 days" });
                    Helper.setCookie('FNUID', encodedData, { expires: 365, path: "/" });
                    if(!destination) {
                        router.push(Routes.home(profile?.slug));
                    } else {
                        window.location.href ='/'+profile?.slug +'/'+destination;
                    }
                }
            }
            ).catch();
    };

    const resendOtp = (event) => {
        event.preventDefault();

        if (mobileNumber.length >= 10) {
            let payload = {
                identity: 'mobile',
                mobile: mobileNumber,
                mobile_code: mobileCode,
                activity: 'login'

            };
            sendOtp(payload, id).then(response => {
                setError({error: response.error, errorMessage: response?.error_messages?.[0]});
                setTimeout(() => {
                    setError({ error: false, errorMessage: '' });
                  }, 3000);
            }).catch();

        } else {
            setError({error: true, errorMessage: 'Please enter a valid phone number.'});
        }
    }

    const handleBack = () => {
        if(!destination) {
            router.push(Routes.login(profile?.slug));
        } else {
            router.push(Routes.loginWithDestination(profile?.slug, destination));
        }
    }

    return (
        <div className="login-container" style={{background: theme?.primary_color}}>
            <div className="otpWrap">
            <div className="back-btn" onClick={() => handleBack()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
            </div>
            <h1 className="main-heading" style={{color: theme?.secondary_color}}>OTP Verification</h1>
            <OtpForm input={input} setInput={setInput}  verifyOtp={verifyOtp} error={error} mobileNumber={mobileNumber} errorMobile={errorMobile} resendOtp={resendOtp} theme={theme} mobileCode={mobileCode} />
            </div>

            <style jsx global>
                {`
                    .back-btn svg{
                        fill: ${theme?.secondary_color};
                    }
                `}
            </style>
        </div>
    );
}

export default Verification;
