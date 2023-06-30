import React from "react";
import dynamic from "next/dynamic";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

const GoLive = dynamic(() => import("@/components/organisms/Live/GoLive"), {
    ssr: false
});

const Live = () => {
    return (
        <GoLive />
    );
}

export default AuthMiddleware(Live);
