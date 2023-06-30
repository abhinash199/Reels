import { Icons } from "@/constants/Icons";
import React, { useState } from "react";
import { BsCameraVideoFill,BsMicMuteFill,BsCameraVideoOffFill} from "react-icons/bs";
interface VideoCallActionButtonsProps {
  channelParameters: any;

}
const VideoCallActionButtons: React.FC<VideoCallActionButtonsProps> = ({
  channelParameters,
}) => {
  const [videoEnable, setVideoEnable] = useState(true);
  const [audioEnable, setAudioEnable] = useState(true); 
  return (
    <div className="vc-actions">
      <button
        onClick={async () => {
          setVideoEnable(!videoEnable);
          channelParameters?.localVideoTrack?.setEnabled(!videoEnable);
        }}
      >
          { videoEnable ? <BsCameraVideoFill fontSize={20} color={'#FFF'} /> : <BsCameraVideoOffFill fill="#fff"  />}
      </button>
      <button
        onClick={async () => {
          setAudioEnable(!audioEnable);
          channelParameters?.localAudioTrack?.setEnabled(!audioEnable);
        }}
      >
        {audioEnable ? <img alt="mic" src={Icons.mic}/> : <BsMicMuteFill  fill="#fff" />}
      </button>
      {/*<button className="icon-Swap"></button>*/}
      {/*<button>*/}
      {/*  <img src={Icons.gift} />*/}
      {/*</button>*/}
    </div>
  );
};
export default VideoCallActionButtons;
