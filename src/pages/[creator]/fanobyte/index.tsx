import { MainLayout } from "@/components/organisms/Layouts";
import Routes from "@/constants/Routes";
import HowItWorks from "@/components/organisms/FanoByte/HowItWorks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {useArtist, useWallet} from "@/context/index";
import ReactPlayer from "react-player/lazy";
import {Icons} from "@/constants/Icons";
import Icon from "@/components/atoms/Icon/Icon";
import Toast from "@/components/atoms/Toast";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface VideoCallRequestProps {}

const Fanobyte: React.FC<VideoCallRequestProps> = () => {
    const router = useRouter();
    const [toggleClass, setToggleClass] = useState(false);
    const { id, profile, theme, fanoByteIntro, fanoBytePrice } = useArtist();
    const { coins } = useWallet();
    const [player, setPlayer] = useState(true);
    const [mute, setMute] = useState(true);
    const [errorMessage, setErrorMessage] = useState<JSX.Element | string>(''); // Set the type as JSX.Element or string

    const handlePlayer = () => {
        return (
            <>
                {player && (
                    <ReactPlayer
                        className="video-stream"
                        url={fanoByteIntro?.url}
                        width="100%"
                        height="100%"
                        controls
                        config={{ file: { attributes: { controlsList: "nodownload" } } }}
                        playing={true}
                        onReady={() =>console.log('ready')}
                        muted={mute}
                    />
                )}
            </>
        )
    }

    const element = <>Insufficient coins! <br/> Please recharge the wallet. </>;

    return (
        <MainLayout title={"FanoByte"} activeCode={'fanobyte'}>
            <div id="ve-page" className={`fanobyte header-footer-enabel ${toggleClass ? "call-request" : ""}`}>

                {
                    fanoByteIntro?.url ? (
                        <div className="mute-switch" onClick={() => setMute(!mute)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m7.727 6.313-4.02-4.02-1.414 1.414 18 18 1.414-1.414-2.02-2.02A9.578 9.578 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.13 8.13 0 0 1-1.671 4.914l-1.286-1.286C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V2.132L7.727 6.313zM4 17h2.697L14 21.868v-3.747L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"></path></svg>
                        </div>
                    ) : <></>
                }

                <div className="ve-container">
                    {fanoByteIntro?.url ? handlePlayer() : <p style={{color: theme?.secondary_color}}>Artist’s video explaining Fanobyte</p>}
                </div>

                <div
                    className={`ve-request ${
                        toggleClass ? "header-footer-enabel call-request" : ""
                    } `}
                    style={{background: theme?.primary_color}}
                >
                    <button
                        onClick={() => {
                            setToggleClass(!toggleClass);
                        }}
                        className="slider-btn"></button>

                    <div className="text-center">
                        <svg width="73" height="62" viewBox="0 0 73 62" fill={theme?.secondary_color} xmlns="http://www.w3.org/2000/svg">
                            <path d="M72.8701 54.2931L68.421 39.9602C70.5043 36.0513 71.5989 31.6493 71.5989 27.2121C71.5989 12.2454 59.3816 0.0606689 44.3749 0.0606689C38.7253 0.0606689 33.2875 1.78625 28.6972 5.0261C21.6352 5.2374 15.0323 8.1251 10.0536 13.161C5.03953 18.2673 2.25004 25.0287 2.25004 32.1423C2.25004 36.5795 3.34465 40.9815 5.42794 44.8904L0.978878 59.2233C0.802328 59.7868 0.943568 60.4206 1.36729 60.8432C1.64977 61.125 2.07349 61.301 2.49721 61.301C2.67376 61.301 2.815 61.2658 2.99155 61.2306L17.7511 56.6525C21.4234 58.4133 25.3781 59.2937 29.4741 59.2937C35.1237 59.2937 40.5261 57.5682 45.1517 54.3283C49.0005 54.2227 52.6727 53.3423 56.0978 51.6871L70.8574 56.2652C71.4224 56.4412 72.0579 56.2652 72.4817 55.8778C72.9054 55.4552 73.0466 54.8565 72.8701 54.2931ZM56.6981 32.1423C56.6981 25.3809 54.1558 18.8659 49.5655 13.8653C45.5048 9.42809 40.173 6.50517 34.3468 5.44869C37.4541 4.00484 40.8792 3.26531 44.3396 3.26531C57.5808 3.26531 68.3151 14.0061 68.3151 27.1769C68.3151 31.2971 67.2558 35.3822 65.2078 38.9742C64.9959 39.3616 64.9253 39.8194 65.0666 40.242L68.8094 52.2858L56.3803 48.412C55.9919 48.2712 55.5329 48.3064 55.1798 48.5177C53.3436 49.4685 51.4016 50.1376 49.3889 50.5602C54.0498 45.5948 56.6981 39.0094 56.6981 32.1423ZM8.74708 45.2074C8.88832 44.7848 8.8177 44.327 8.60584 43.9396C6.55786 40.3476 5.49856 36.2978 5.49856 32.1423C5.49856 18.9364 16.2681 8.23075 29.4741 8.23075C42.68 8.23075 53.4496 18.9716 53.4496 32.1423C53.4496 45.313 42.68 56.0539 29.4741 56.0539C25.6606 56.0539 21.9883 55.1735 18.6339 53.4831C18.2455 53.307 17.8218 53.2718 17.4333 53.3775L5.00422 57.2512L8.74708 45.2074Z" fill={theme?.secondary_color}  />
                            <path d="M29.5073 21.9651H16.2661C13.7238 21.9651 11.6758 24.0076 11.6758 26.5431V39.7843C11.6758 42.3198 13.7591 44.3623 16.2661 44.3623H29.5073C32.0497 44.3623 34.0976 42.3198 34.0976 39.7843V26.5431C34.1329 24.0076 32.0497 21.9651 29.5073 21.9651Z" fill={theme?.secondary_color}  />
                            <path d="M45.5039 24.0425C45.2215 23.8664 44.9037 23.8664 44.6212 24.0073L36.5705 28.2332C35.829 28.6206 35.4053 29.3601 35.4053 30.1701V36.1567C35.4053 36.9667 35.8643 37.7062 36.5705 38.0936L44.6565 42.3195C44.7977 42.39 44.939 42.4252 45.0802 42.4252C45.2568 42.4252 45.398 42.39 45.5392 42.2843C45.8217 42.1082 45.963 41.8265 45.963 41.5096V24.8172C45.963 24.5003 45.7864 24.1834 45.5039 24.0425Z" fill={theme?.secondary_color}  />
                        </svg>

                        <h3 style={{color: theme?.secondary_color}}>Get Personalized video message from {profile?.first_name}</h3>
                    </div>

                    <button
                        className="btn btn-primary d-block"
                        onClick={() => {
                            if(coins < fanoBytePrice){
                                setErrorMessage(element);
                                setTimeout(()=>setErrorMessage(''),3000)
                                return;
                            }
                            router.push(Routes.fanoByteBooking(profile?.slug));
                        }}
                        style={{background: theme?.secondary_color, color: theme?.primary_color, }}
                    >
                        <span>REQUEST NOW @ {fanoBytePrice}</span>
                        <span><Icon source={Icons.token} width="25"/></span>
                    </button>

                    {/*<Icon source={Icons.token} width="25"/>*/}

                    <HowItWorks theme={theme} />

                    <button
                        onClick={() => {
                            router.push(Routes.fanoByteRequests(profile?.slug));
                        }}
                        className="btn btn-white d-block"
                    >
                        My Messages
                    </button>

                    <span className="responseTime" style={{color: theme?.secondary_color, }}>Typically responds within 7 days</span>

                    {/*<div className="sharingJoy">*/}
                    {/*    <div className="frow space-between">*/}
                    {/*        <div className="" style={{color: theme?.text_color}}>Fans sharing the joy</div>*/}
                    {/*        <a className="view" style={{color: theme?.text_color}}>View all</a>*/}
                    {/*    </div>*/}

                    {/*    <div className="joyGrid">*/}
                    {/*        <div style={{borderColor: theme?.secondary_color}}>*/}
                    {/*            <a>*/}
                    {/*                <img src="//placehold.it/180x240" />*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div style={{borderColor: theme?.secondary_color}}>*/}
                    {/*            <a>*/}
                    {/*                <img src="//placehold.it/180x240" />*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div style={{borderColor: theme?.secondary_color}}>*/}
                    {/*            <a>*/}
                    {/*                <img src="//placehold.it/180x240" />*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div style={{borderColor: theme?.secondary_color}}>*/}
                    {/*            <a>*/}
                    {/*                <img src="//placehold.it/180x240" />*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <style jsx global>
                        {`
                    .ve-request .slider-btn:before {
                        border-bottom-color: ${theme?.secondary_color};
                    }
                    .mute-switch svg{
                      fill: ${theme?.text_color}
                    }
                `}
                    </style>
                </div>
                {errorMessage && (
                    <Toast
                        icon={faTimes}
                        position="bottom-right"
                        title={"Error"}
                        description={errorMessage}
                    />
                    )}
            </div>

        </MainLayout>
    );
};

export default Fanobyte;
