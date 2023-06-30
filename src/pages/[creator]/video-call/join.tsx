import React from "react";
import dynamic from "next/dynamic";
import AuthMiddleware from "../../../middlewares/AuthMiddleware";

const VideoCallContainer = dynamic(
    () => import("@/components/organisms/VideoCall/VideoCallContainer"),
    { ssr: false }
);

interface VideoCallProps {}

const VideoCallJoin: React.FC<VideoCallProps> = () => {
    return (
        <div className="vc-container">
            <VideoCallContainer />
        </div>
    );
};

export default AuthMiddleware(VideoCallJoin);
