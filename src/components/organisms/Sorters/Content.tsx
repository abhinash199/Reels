import React from "react";
import Swiper from "react-id-swiper";
import Icon from "../../atoms/Icon/Icon";
import {useRouter} from "next/router";
import Routes from "../../../constants/Routes";

export const Content = ({sorter, config, slug, handlePurchase, theme, onClickHandler, orders, onClickHandlerVideo, loggedIn}) => {

    const router = useRouter()
    const layout = theme.template ? theme.template  : "";
    const handlePhotos = (item) => {

        if(item?.coins >= 1) {
            if (orders) {
                let  purchased = orders?.find((x) => {
                    if (x?._id === item?._id && x.type === 'photo') {
                        return {'photo': x.photo};
                    }
                });

                if(purchased !== undefined && loggedIn) {
                    return (
                        <div className="swiper-slide"  key={item._id}>
                            <a className="gal-list rat-4-4" onClick={() => onClickHandler(item, purchased)}>
                                <img src={item?.photo?.medium ? item?.photo?.medium : item?.photo?.medium} alt="" title=""/>
                                {purchased !== undefined ? <Icon source={purchased?.photo?.medium} alt="" title=""/> : <Icon source={item?.photo?.medium} alt="" title=""/>}
                            </a>
                        </div>
                    )
                } else {
                    return (
                        <div className="swiper-slide"  key={item._id}>
                            <div className="gal-list gal-radius rat-4-4 paid-cont" onClick={() => { loggedIn ? handlePurchase(item) : router.push(Routes.login(slug))}}>
                                <div className="icon">
                                    <img src="https://icongr.am/jam/padlock-f.svg?size=36&color=ffffff" />
                                </div>
                                { item?.is_album === "true" ? <div className="mediaCount">{item?.stats?.childrens}</div> : '' }
                                <div className="tapText">Tap to unlock</div>
                                <button className="btnUnlock" style={{background: theme?.secondary_color}}>Unlock</button>
                                { item?.age_restriction_label ? <div className="media-age-label">{item?.age_restriction_label}</div> : '' }
                            </div>
                        </div>
                    )
                }
            } else {
                return (
                    <div className="swiper-slide"  key={item._id}>
                        <div className="gal-list gal-radius rat-4-4 paid-cont" onClick={() => { loggedIn ? handlePurchase(item) : router.push(Routes.login(slug))}}>
                            <div className="icon">
                                <img src="https://icongr.am/jam/padlock-f.svg?size=36&color=ffffff" />
                            </div>
                            { item?.is_album === "true" ? <div className="mediaCount">{item?.stats?.childrens}</div> : '' }
                            <div className="tapText">Tap to unlock</div>
                            <button className="btnUnlock" style={{background: theme?.secondary_color}}>Unlock</button>
                            { item?.age_restriction_label ? <div className="media-age-label">{item?.age_restriction_label}</div> : '' }
                        </div>
                    </div>
                )
            }
        }
        return (

            <div className="swiper-slide"  key={item._id}>
                <a className="gal-list rat-4-4" onClick={() => onClickHandler(item)}>
                    <img src={item?.photo?.medium ? item?.photo?.medium : item?.photo?.medium} alt="" title=""/>
                </a>
            </div>
        )
    }

    const handleVideos = (item) => {
        if(item?.coins >= 1) {
            if (orders) {
                let purchased = orders?.find((x) => {
                    if (x?._id === item?._id && x.type === 'video') {
                        return {'photo': x.photo};
                    }
                });

                if (purchased !== undefined) {
                    return (
                        <div className="swiper-slide" onClick={() => onClickHandlerVideo(item)}  key={item._id}>
                            <a className="gal-list rat-4-4">
                                <img src={item?.video?.thumb} alt="" title=""/>
                            </a>
                        </div>
                    )
                } else {
                    return (
                        <div className="swiper-slide" key={item._id}>
                            <div className="gal-list gal-radius rat-4-4 paid-cont" onClick={() =>{ loggedIn ? handlePurchase(item) : router.push(Routes.login(slug))}}>
                                <div className="icon">
                                    <img src="https://icongr.am/jam/padlock-f.svg?size=36&color=ffffff"/>
                                </div>
                                <div className="tapText">Tap to unlock</div>
                                <button className="btnUnlock" style={{background: theme?.secondary_color}}>Unlock
                                </button>
                                {item?.age_restriction_label ?
                                    <div className="media-age-label">{item?.age_restriction_label}</div> : ''}
                            </div>
                        </div>
                    )
                }
            } else {
                return (
                    <div className="swiper-slide" key={item._id}>
                        <div className="gal-list gal-radius rat-4-4 paid-cont" onClick={() => { loggedIn ? handlePurchase(item) : router.push(Routes.login(slug))}}>
                            <div className="icon">
                                <img src="https://icongr.am/jam/padlock-f.svg?size=36&color=ffffff"/>
                            </div>
                            <div className="tapText">Tap to unlock</div>
                            <button className="btnUnlock" style={{background: theme?.secondary_color}}>Unlock
                            </button>
                            {item?.age_restriction_label ?
                                <div className="media-age-label">{item?.age_restriction_label}</div> : ''}
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="swiper-slide" onClick={() => onClickHandlerVideo(item)} key={item._id}>
                <a className="gal-list rat-4-4">
                    <img src={item?.video?.thumb} alt="" title=""/>
                </a>
            </div>
        )
    }

    const handleItems = () => {
        return sorter?.contents?.map((item) => {
            switch (item?.type) {
                case 'photo':
                    return handlePhotos(item);
                    break;
                case 'video':
                    return handleVideos(item);
                    break;
                default:
                    return <></>;
            }
        });
    }

    return (
        <>
            <h3 className={"list-heading"} style={{color: theme?.secondary_color}}>
                {sorter?.name}
                <a href={slug+'/'+sorter?.bucket?.code} style={{color: theme?.secondary_color}}>View all</a>
            </h3>
            <Swiper {...config}>
                {handleItems()}
            </Swiper>
        </>
    );
}
