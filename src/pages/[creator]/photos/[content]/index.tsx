import React from "react";
import { PhotoPage } from "@/components/organisms/Content";
import { useRouter } from "next/router";
import {useDeviceType} from "@/hooks/useDeviceType";

const SubPhotos = () => {

    let router = useRouter();
    const deviceType = useDeviceType();

    return (
        deviceType === "mobile" || deviceType === "tablet" ?
        <PhotoPage router={router}  />:
        <> You can only view the content on mobile or tablet devices </>
    );
}

export default SubPhotos;
