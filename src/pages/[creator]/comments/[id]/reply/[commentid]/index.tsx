import React from "react";
import { MainLayout} from "@/components/organisms/Layouts";
import {CommentPage} from '@/components/organisms/Comment/CommentPage'

const Comment = () => {

    return (
        <MainLayout title={'REPLY'}>
            <CommentPage reply={true}/>
        </MainLayout>
    );
}

export default Comment;
