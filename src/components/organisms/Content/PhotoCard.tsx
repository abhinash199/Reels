import React from "react";
import { MediaPhoto, MediaHeader, MediaFooter } from "@/components/molecules/Media";

export const PhotoCard = ({item, profile, onClickHandler, handlePurchase, purchased, theme, loggedIn, storeLike, likes}) => {

    const handlePaidContent = () => {
        return (
            <div className="feed-card-body">
                <p className="post-text" style={{color: theme?.text_color}}>{item.name}</p>
                <div className="gal-listing" onClick={() => handlePurchase(item)}>
                    <a className="gal-list rat-4-4 paid-cont">
                        <div className="icon">
                            <img src="https://icongr.am/jam/padlock-f.svg?size=36&color=ffffff" />
                        </div>
                        { item?.is_album === "true" ? <div className="mediaCount">{item?.stats?.childrens}</div> : '' }
                        <div className="tapText">Tap to unlock</div>
                        <button className="btnUnlock" style={{background: theme?.secondary_color}}>Unlock</button>
                        { item?.age_restriction_label ? <div className="media-age-label">{item?.age_restriction_label}</div> : '' }
                    </a>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="feed-container">
                <div className="feed-card">
                    <MediaHeader created={item?.human_readable_created_date} profile={profile} theme={theme} item={item} />
                    {item?.commercial_type === 'free' ? <MediaPhoto onClickHandler={onClickHandler} item={item} purchased={undefined} theme={theme} /> : (purchased !== undefined && loggedIn ? <MediaPhoto onClickHandler={onClickHandler} item={item} purchased={purchased} theme={theme} /> : handlePaidContent()) }
                    <MediaFooter item={item} theme={theme} profile={profile} storeLike={storeLike} likes={likes} loggedIn={loggedIn}/>
                </div>
            </div>
        </>
    );
}
