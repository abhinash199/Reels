import React from "react";
import { MediaPhoto, MediaVideo, MediaHeader, MediaFooter } from "@/components/molecules/Media";

const MediaCard = ({item, profile, onClickHandler, handlePurchase, purchased}) => {

    const handlePaidContent = () => {
      return (
          <div className="feed-card-body">
              <p className="post-text">{item.name}</p>
                  <div className="post-content post-locked" onClick={() => handlePurchase(item)}>
                      <span className="post-overlay">
                          <div className="post-purchase-wrapper">
                              <div className="post-purchase-block">
                                <button className="post-purchase-button">Buy for {item.coins} coins</button>
                              </div>
                          </div>
                      </span>
                  </div>
          </div>
      )
    }

    return (
        <>
            <div className="feed-container">
                <div className="feed-card">
                    <MediaHeader created={item?.human_readable_created_date} profile={profile} />
                    {item?.type === 'photo' ? (item?.commercial_type === 'free' ? <MediaPhoto onClickHandler={onClickHandler} item={item} purchased={undefined} /> : (purchased !== undefined ? <MediaPhoto onClickHandler={onClickHandler} item={item} purchased={purchased} /> : handlePaidContent())) :  (item?.commercial_type === 'free' ? <MediaVideo caption={item.name} video={item.video} /> : handlePaidContent()) }
                    <MediaFooter stats={item?.stats} />
                </div>
            </div>
        </>
    );
}
export default MediaCard;
