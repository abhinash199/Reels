import React from "react";
import Icon from "@/components/atoms/Icon/Icon";

export const MediaPhoto = ({onClickHandler, item, purchased, theme}) => {

    return (
        <div className="feed-card-body" onClick={() => onClickHandler(item, purchased)}>
            <p className="post-text" style={{color: theme?.text_color}}>{item?.name}</p>
            <figure className="post-img">
                {purchased !== undefined ? <Icon source={purchased?.photo?.cover} alt="" title=""/> : <Icon source={item?.photo?.cover} alt="" title=""/>}
            </figure>
        </div>
    );
}

