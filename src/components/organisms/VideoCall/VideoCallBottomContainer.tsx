import routes from "@/constants/routes";
import { Icons } from "@/constants/Icons";
import { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
interface VideoCallBottomConatinerProps {
  agoraEngine: IAgoraRTCClient;
  channelParameters;
  setUserLeft: any;
  profile: any;
}
const VideoCallBottomConatiner: React.FC<VideoCallBottomConatinerProps> = ({
  agoraEngine,
  channelParameters,
  setUserLeft,
                                                                             profile
}) => {
  const router = useRouter();
  const handleUserLeft = async () => {
    await agoraEngine.channelName;
    await agoraEngine.leave();
    setUserLeft(true);
    router?.push('/'+profile?.slug+'/video-call/my-requests');
  };

  useEffect(() => {
    agoraEngine.on("user-left", () => {
      handleUserLeft();
    });
  }, []);

  return (
    <div className="vc-bottom">
      <button
        onClick={() => {handleUserLeft().then(r => '')}}
        className="declined-btn"
      >
        <img src={Icons.disconnectCall} />
      </button>
      <div className="vc-callername-time">
        <p>
          <strong>{profile?.first_name}</strong>
          {/*<span>Actor, Host</span>*/}
        </p>
        {/*<p style={{ textAlign: "right" }}>*/}
        {/*  00:10s*/}
        {/*  <span>remaining</span>*/}
        {/*</p>*/}
      </div>
    </div>
  );
};
export default VideoCallBottomConatiner;
