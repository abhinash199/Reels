import React from "react";
import Swiper from "react-id-swiper";
import Routes from "@/constants/Routes";
import {useRouter} from "next/router";

export const Slideshow = ({sorter, config, profile, theme}) => {

    const router = useRouter();

    const handleRedirect = (item) => {
        switch (item?.type) {
            case 'photo':
                return router.push(Routes.photos(profile?.slug));
                break;
            case 'video':
                return router.push(Routes.videos(profile?.slug));
                break;
            case 'private-video-call':
                return router.push(Routes.videoCall(profile?.slug));
                break;
            case 'directline':
                return router.push(Routes.directLine(profile?.slug));
                break;
            case 'greeting': 
                return router.push(Routes.fanoByteBooking(profile?.slug));
            default:
                return 1;
        }
    }

    const handleItems = () => {
        return sorter?.banners?.map((item) => {
            return (
                <div className="swiper-slide" key={item._id}>
                    <div className="banner-slide" onClick={() => handleRedirect(item)}>
                        <img src={item?.photo?.medium} alt="" title=""/>
                    </div>
                </div>
            );
        });
    }

    return (
        <Swiper {...config}>
            {theme?.template !=='template-2' && handleItems()}
        </Swiper>
    );
}
