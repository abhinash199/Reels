import React, { useEffect } from "react";
interface SelfVideoConatinerProps {
  userLeft: boolean;
}
const SelffVideoConatiner: React.FC<SelfVideoConatinerProps> = ({
  userLeft,
}) => {
  return (
    <React.Fragment>
      {!userLeft ? (
        <div id="local-video-stream" className="self-video-stream"></div>
      ) : (
        <video
          id="local-video-stream"
          className="self-video-stream"
          autoPlay
        ></video>
      )}
    </React.Fragment>
  );
};
export default SelffVideoConatiner;
