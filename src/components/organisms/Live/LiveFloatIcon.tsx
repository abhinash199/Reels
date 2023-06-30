import React, {useEffect} from "react";
import {upcomingLiveActions} from "@/containers/live/actions/upcoming";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import Link from "next/link";

export const LiveFloatIcon = ({id, profile}) => {

    const dispatch = useDispatch();

    const upcomingLive = useSelector(
        (state: ApplicationState) => state.upcomingLive
    );

    useEffect(() => {
        if (id) {
            dispatch(upcomingLiveActions.fetchUpcomingLive(id));
        }
    }, [id]);

    const handleLive = () => {
        if(!upcomingLive.loading) {
            if(upcomingLive?.events?.list[0]?.live_status) {
                let isLive = upcomingLive?.events?.list[0]?.live_status;
                if(isLive === 'ongoing') {
                    return (
                        
                        <div className="liveFloater">
                        <Link href={'/'+profile?.slug+'/live/join'}>
                            <span>Live</span>
                            <img src={profile?.photo?.thumb} />
                             </Link>
                        </div>
                       
                    )
                }
            }
        }
        return  <div className="user-btn"> </div>
    }

    return (
        <>{handleLive()}</>
    );

}
