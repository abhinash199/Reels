import React, {useEffect, useState} from "react";
import ReactPlayer from 'react-player';

interface VideoStreamConatinerProps {}

const VideoStreamConatiner: React.FC<VideoStreamConatinerProps> = () => {

  return (
     <div className="ve-container">
         <div id={"remote-video-stream"} className="video-stream"/>
     </div>
  );
};

export default VideoStreamConatiner;
