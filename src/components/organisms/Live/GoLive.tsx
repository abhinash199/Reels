import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
/** custom imports */
import { LivePage } from "@/components/organisms/Live/LivePage";
import {getToken} from "@/containers/live/actions/token";
import { useArtist, useAuth, useWallet } from "@/context/index";
import {upcomingLiveActions} from "@/containers/live/actions/upcoming";
import {Helper} from "../../../partials";
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import {router} from "next/client";
import { purchaseLiveEvent } from "@/containers/transactions/actions/live";

/**
 * Agora client declaration
 */
// @ts-ignore
// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE); //disabling rtc logs

// let codec = Utils.getMobileOperatingSystem() === "iOS" ? "h264" : "vp8";
//let codec = "vp8";

const client = AgoraRTC.createClient({
    codec: "vp8",
    mode: "rtc",
});

const rtmClient = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_APP_ID, {
    enableLogUpload: false,
    //logFilter: false,
});

function GoLive() {
    const [propsData, setPropsData] = useState(undefined);

    const { id, profile, theme } = useArtist();
    const { loggedIn } = useAuth();
    const { coins } = useAuth();

    const fetchUser = async () => {
        return await Helper.decode(Helper.userToken());
    }

    useEffect(() => {
            fetchUser().then(user => {
                if(user && id) {
                    upcomingLiveActions.fetchUpcomingLiveDirect(id).then(events => {
                        if(events?.data?.list[0]) {
                            console.log(events?.data?.list[0])
                           let channel = (events?.data?.list[0]?._id);
                            let resStatus = (events?.data?.list[0]?.live_status);
                            let resCoins = (events?.data?.list[0]?.coins);
                            let isSuperSendActive = (events?.data?.list[0]?.supersend);
                            let superSendCoins = (events?.data?.list[0]?.supersend_coins);

                            if(resStatus === 'ongoing') {
                                let payload = {
                                    customer_id : user?.id,
                                    artist_id : id,
                                    channel: channel
                                }

                                if(resCoins >= 1){
                                    let payloadEvent = {
                                        entity_id: channel,
                                        platform: process.env.NEXT_PUBLIC_PLATFORM,
                                        artist_id : id,
                                    };
                                    purchaseLiveEvent(id, payloadEvent).then(res => {
                                        getToken(payload).then(response => {

                                            console.log(response);

                                            let channelName = response?.channel;
                                            let token = response?.access_token;
                                            let customerId = response?.customer_uid;
                                            let customerUUId = response?.customer_id;
                                            let customerAvatar = user?.avatar;
                                            let customerUsername = user?.first_name;
                                            let giftChannel = response?.gift_channel;
                                            let chatKey = response?.pubnub_publish_key;
                                            let chatSecret = response?.pubnub_subcribe_key;
                                            let chatChannel = response?.comment_channel;

                                            if(!channelName) {
                                                //router.push(`/${creator}`);
                                            }

                                            const pubnub = new PubNub({
                                                publishKey: chatKey,
                                                subscribeKey: chatSecret,
                                                uuid: customerUUId
                                            });

                                            let userData = {
                                                channelName: channelName,
                                                giftChannel: giftChannel,
                                                chatChannel: chatChannel,
                                                customerUUId: customerUUId,
                                                customerAvatar: customerAvatar,
                                                customerUsername: customerUsername,
                                                creatorId: id,
                                                profile: profile,
                                                userToken: token,
                                                customerId: customerId,
                                                pubnub: pubnub,
                                                isSuperSendActive: isSuperSendActive,
                                                superSendCoins: superSendCoins,
                                            };

                                            setPropsData(userData);
                                        }).catch(error => {
                                            console.log(error);
                                        })
                                    }).catch(err => '');
                                } else {
                                    getToken(payload).then(response => {

                                        console.log(response);

                                        let channelName = response?.channel;
                                        let token = response?.access_token;
                                        let customerId = response?.customer_uid;
                                        let customerUUId = response?.customer_id;
                                        let customerAvatar = user?.avatar;
                                        let customerUsername = user?.first_name;
                                        let giftChannel = response?.gift_channel;
                                        let chatKey = response?.pubnub_publish_key;
                                        let chatSecret = response?.pubnub_subcribe_key;
                                        let chatChannel = response?.comment_channel;

                                        if(!channelName) {
                                            //router.push(`/${creator}`);
                                        }

                                        const pubnub = new PubNub({
                                            publishKey: chatKey,
                                            subscribeKey: chatSecret,
                                            uuid: customerUUId
                                        });

                                        let userData = {
                                            channelName: channelName,
                                            giftChannel: giftChannel,
                                            chatChannel: chatChannel,
                                            customerUUId: customerUUId,
                                            customerAvatar: customerAvatar,
                                            customerUsername: customerUsername,
                                            creatorId: id,
                                            profile: profile,
                                            userToken: token,
                                            customerId: customerId,
                                            pubnub: pubnub,
                                            isSuperSendActive: isSuperSendActive,
                                            superSendCoins: superSendCoins,
                                        };

                                        setPropsData(userData);
                                    }).catch(error => {
                                        console.log(error);
                                    })
                                }
                            } else {
                                router.push('/' + profile?.slug + '/live/join')
                            }

                        }
                    });
                }
            });
    }, [id]);

    function startLive() {
        return (
            <PubNubProvider client={propsData.pubnub}>
            <LivePage
                rtmClient={rtmClient}
                client={client}
                channel={rtmClient.createChannel(propsData.channelName)}
                channelName={propsData.channelName}
                giftChannel={propsData.giftChannel}
                chatChannel={propsData.chatChannel}
                customerUsername={propsData.customerUsername}
                customerUUId={propsData.customerUUId}
                customerAvatar={propsData.customerAvatar}
                creatorId={propsData.creatorId}
                profile={propsData.profile}
                token={propsData?.userToken}
                customerId={propsData?.customerId}
                theme={theme}
                isSuperSendActive={propsData?.isSuperSendActive ? propsData?.isSuperSendActive: false}
                superSendCoins={propsData?.superSendCoins}
                coins={coins}
            />
            </PubNubProvider>
        );
    }

    return (
        <>
            {propsData?.channelName !== undefined ? startLive() : null}
        </>
    );
}

export default GoLive;
