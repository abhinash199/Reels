import React from "react";
import { MainLayout} from "@/components/organisms/Layouts";
import {DirectLinePage} from '@/components/organisms/Chat/ChatPage'
import AuthMiddleware from "@/middlewares/AuthMiddleware";

const DirectLine = () =>{

    return (
        <MainLayout title={'directline'} activeCode={'direct-line'} >
            <DirectLinePage />
        </MainLayout>
    );

}

export default AuthMiddleware(DirectLine);
