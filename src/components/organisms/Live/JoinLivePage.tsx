import React, {useEffect, useState} from "react";
import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";
import {purchaseLive} from "@/containers/live/actions/purchase";
import {upcomingLiveActions} from "@/containers/live/actions/upcoming";
import { useArtist } from "@/context/index";
import {useRouter} from "next/router";
import Routes from "../../../constants/Routes";

 export const JoinLivePage = () => {

     const { id, profile, theme } = useArtist();

     const [status, setStatus] = useState(null);
     const [channel, setChannel] = useState(null);
     const [coins, setCoins] = useState(0);

     const router = useRouter();

     useEffect(() => {

         if(id) {
             upcomingLiveActions.fetchUpcomingLiveDirect(id).then(events => {
                 if (events?.data?.list[0]) {
                     let resChannel = (events?.data?.list[0]?._id);
                     let resStatus = (events?.data?.list[0]?.live_status);
                     let resCoins = (events?.data?.list[0]?.coins);
                     setStatus(resStatus);
                     setChannel(resChannel);
                     setCoins(resCoins);
                 }
             });
         }
     }, [id]);

     const handleLive = () => {
         if(status && status === 'ongoing') {
            if(coins >= 1) {
                purchaseLive(id, channel).then(response => {
                    if(response?.data?.purchase?.entity_id) {
                       window.location.href =  '/' + profile?.slug + '/live';
                    } else {
                        window.location.href =  '/' + profile?.slug + '/live';
                    }
                });
            } else {
                window.location.href =  '/' + profile?.slug + '/live';
            }
         } else {
             //Open Chat Window
         }
     }

       return (
         <>
            <div className="landing-container" style={{background: theme?.primary_color}}>
                <div className="back-btn" onClick={() => router.push(Routes.home(profile?.slug))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                </div>

                <div className="join-live">
                    <figure className="live-celeb" style={{border: "8px solid " + theme?.secondary_color}}>
                        <Icon source={profile?.picture} />
                    </figure>
                    <h3>LIVE</h3>

                    <Button className="btn btn-primary wd-100 d-block" onClick={(e) => handleLive()} style={{background: theme?.secondary_color}}>
                    JOIN LIVE
                    </Button>
                </div>

                <style jsx global>
                    {`
                        .back-btn svg{
                            fill: ${theme?.secondary_color};
                        }
                    `}
                </style>
            </div>
         </>
   );
}







