import React from "react";
import { PhotoPage } from "@/components/organisms/Content";
import { useRouter } from "next/router";

const Photos = () => {

    let router = useRouter();

    return (  
        <PhotoPage router={router}  />  
    );
}

export default Photos;
