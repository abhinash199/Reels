import { MainLayout } from "@/components/organisms/Layouts";
import JoinCallCard from "@/components/organisms/VideoCall/JoinCallCard";
import React, {useEffect} from "react";
import { callRequestsActions } from "@/containers/call/actions/requests";
import { joinCallActions } from "@/containers/call/actions/join";
import {useArtist} from "../../../context";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import Loader from "../../../components/atoms/Loader";
import AuthMiddleware from "../../../middlewares/AuthMiddleware";

interface VideoCallRequestsProps {}

const VideoCallRequests: React.FC<VideoCallRequestsProps> = () => {

    const { id, profile, theme } = useArtist();
    const dispatch = useDispatch();

    const calls = useSelector((state: ApplicationState) => state.calls);

    useEffect(() => {
        if(id) {
            dispatch(callRequestsActions.callRequests(id, 1));
        }
    },[id]);

    const joinVideoCall = (item) => {
        joinCallActions.joinCall(item?._id, id).then(response => {
            if(response?.data?.customer_id) {
                window.location.href  = '/'+profile?.slug+'/'+'video-call/join?vid='+item?._id;
            }
        })
    }

    const acceptVideoCall = (item) => {
        joinCallActions.updateCall(item?._id, id).then(response => {
            dispatch(callRequestsActions.callRequests(id, 1));
        })
    }

    return (
        <MainLayout title="My Requests">
            <div className="call-requests header-footer-enabel">
                {calls.loading ? <Loader /> : <JoinCallCard calls={calls} joinVideoCall={joinVideoCall} acceptVideoCall={acceptVideoCall} theme={theme} /> }

            </div>
        </MainLayout>
    );
};

export default AuthMiddleware(VideoCallRequests);
