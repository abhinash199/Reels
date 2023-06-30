import StartVideoCall from "./VideoCallUtils";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SelffVideoConatiner from "./SelfVideoStreamContainer";
import VideoCallActionButtons from "./VideoCallActionButtons";
import VideoCallBottomConatiner from "./VideoCallBottomContainer";
import VideoStreamConatiner from "./VideoStreamConatiner";
import {Helper} from "../../../partials";
import {getToken} from "@/containers/call/actions/token";
import { useArtist } from "@/context/index";

interface VideoCallConatinerProps {}

const VideoCallContainer: React.FC<VideoCallConatinerProps> = ({}) => {
    const router = useRouter();
    const channel = router?.query?.vid;
    const [userLeft, setUserLeft] = useState(false);
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    const { id, profile } = useArtist();

    let channelParameters = {
        localAudioTrack: null,
        localVideoTrack: null,
        remoteAudioTrack: null,
        remoteVideoTrack: null,
        remoteUid: id,
    };

    const fetchUser = async () => {
        return await Helper.decode(Helper.userToken());
    }

    useEffect(() => {

        fetchUser().then(user => {
            if(user && id) {
                let payload = {
                    customer_id : user?.id,
                    artist_id : id,
                    channel: channel
                };

                getToken(payload).then(response => {
                    StartVideoCall(
                        {
                            appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
                            channel: response?.channel,
                            token: response?.access_token,
                            uid: response?.customer_uid,
                        },
                        channelParameters,
                        agoraEngine
                    );
                });

            }
        });
    }, [id]);

    return (
        <React.Fragment>
            <VideoStreamConatiner />

            <SelffVideoConatiner userLeft={userLeft} />

            <VideoCallActionButtons channelParameters={channelParameters}  />

            <VideoCallBottomConatiner
                agoraEngine={agoraEngine}
                channelParameters={channelParameters}

                setUserLeft={setUserLeft}
                profile = {profile}
            />
        </React.Fragment>
    );
};

export default VideoCallContainer;
