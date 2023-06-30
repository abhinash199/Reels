import React from "react";
import { JoinLivePage } from "@/components/organisms/Live/JoinLivePage";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

const JoinLive = () => {
    return (
        <JoinLivePage/>
    );
}


export default AuthMiddleware(JoinLive);
