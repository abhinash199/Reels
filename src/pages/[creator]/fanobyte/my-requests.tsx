import { MainLayout } from "@/components/organisms/Layouts";
import { OrderCard } from "@/components/organisms/FanoByte/OrderCard";
import React, {useEffect} from "react";
import { greetingRequestsActions } from "@/containers/fanobyte/actions/requests";
import {useArtist} from "../../../context";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import Loader from "../../../components/atoms/Loader";
import AuthMiddleware from "../../../middlewares/AuthMiddleware";

interface VideoCallRequestsProps {}

const FanoByteRequests: React.FC<VideoCallRequestsProps> = () => {

    const { id, profile, theme } = useArtist();
    const dispatch = useDispatch();

    const greetingsRequests = useSelector((state: ApplicationState) => state.greetingsRequests);

    useEffect(() => {
        if(id) {
            dispatch(greetingRequestsActions.greetingRequests(id, 1));
        }
    },[id]);

    console.log(greetingsRequests);

    const getGreetings = () => {
        return greetingsRequests.greetings.list.map(item => {
           return (
               <OrderCard greeting={item} theme={theme} />
           )
        });
    }

    return (
        <MainLayout title="My Greetings">
            <div className="call-requests header-footer-enabel">
                {greetingsRequests.loading ? <Loader /> : getGreetings() }
            </div>
        </MainLayout>
    );
};

export default AuthMiddleware(FanoByteRequests);
