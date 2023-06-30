import React from "react";
import { VideoPage } from "@/components/organisms/Content";
import { useRouter } from "next/router";

const SubVideos = () => {

    let router = useRouter();

    return (
        <VideoPage router={router}  />
    );
}

export default SubVideos;
