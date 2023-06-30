import React, {useState, useEffect} from 'react';
import { SignInForm, SocialSignInForm} from '@/components/organisms/Form';
import {sendOtp} from "@/containers/auth/actions";
import Routes from "@/constants/Routes";
import { useArtist, useAuth } from "@/context/index";
import Link from 'next/link';
import {useRouter} from "next/router";

function Login() {
    const router = useRouter();
    const { id, profile, theme } = useArtist();
    const { loggedIn } = useAuth();
    let destination =  router?.query?.destination;

    const [input, setInput] = useState('');
    const [country, setCountry] = useState('+91');
    const [error, setError] = useState({error: false, errorMessage: ''});
    const [loginSubmitted, setLoginSubmitted] = useState(false);

    const getOtp = (event) => {
        event.preventDefault();

        if(input.length >= 10){
            let payload = {
                identity:'mobile',
                mobile:input,
                mobile_code: country,
                activity:'login'
            };
            sendOtp(payload, id).then(response => {
                if(response?.error){
                    setError({error: true, errorMessage: response?.error_messages});
                    setTimeout(() => {
                        setError({ error: false, errorMessage: '' });
                      }, 3000);
                    return false;
                }
               if(response?.status_code === 200) {
                   if(!destination) {
                       router.push(Routes.loginVerification(profile?.slug, input, country));
                   } else {
                       router.push(Routes.loginVerificationWithDestination(profile?.slug, input, country, destination));
                   }
               } else {
               }
            }).catch();
        } else {
            setError({error: true, errorMessage: 'Please enter a valid phone number.'});
        }
    }

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

    return (
        <div className="login-container" style={{background: theme?.primary_color}}>

            <h1 className="main-heading" style={{color: theme?.text_color}}>SIGN IN</h1>

            <div>
                <SignInForm input={input} setInput={setInput}  getOtp={getOtp} error={error} theme={theme} setCountry={setCountry} country={country}/>
            </div>

            <div>
                <SocialSignInForm theme={theme} profile={profile} destination={destination} />
            </div>

            <div>
                <h3 className="pink-heading" style={{color: theme?.secondary_color}}>Why Login?</h3>
                <div className="login-footer-wrapper">
                    <ul className="why-login-content">
                        <li style={{color: theme?.text_color}}>Get Free Coins</li>
                        <li style={{color: theme?.text_color}}>Attend Live Sessions</li>
                    </ul>
                    <ul>
                        <li style={{color: theme?.text_color}}>Watch Exclusive Content</li>
                        <li style={{color: theme?.text_color}}>Directly Message The Artist</li>
                    </ul>
                </div>
            </div>

            <p className="copyright-text" style={{color: theme?.text_color}}>By signing in, you agree to the <Link href={Routes.termsUse} target="_blank">Terms of Use</Link> and <Link href={Routes.privacyPolicy} target="_blank">Privacy Policy</Link></p>
        </div>
    );
}

export default Login;

