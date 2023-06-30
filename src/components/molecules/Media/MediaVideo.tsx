import React from "react";
import Icon from "../../atoms/Icon/Icon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Helper } from "@/partials/Helper";

export const MediaVideo = ({onClickHandler, item, icon, theme}) => {
    const duration = Helper.formatDuration(item?.duration);
    return (
        <div className="feed-card-body" onClick={() => onClickHandler(item)}>
            <p className="post-text" style={{color: theme?.text_color}}>{item.name}</p>
            <figure className="post-img">
                <Icon source={item?.video?.cover ? item?.video?.cover : item?.photo_portrait?.cover} alt="" title=""/>
                <span className="icon-play">
                     <FontAwesomeIcon className="sidebar-close" icon={icon}  size="2xl" style={{color: "#ED2562FF"}} />
                </span>
                <span className="view-icon" style={{ color: theme?.text_color, right: duration ? '70px' : '10px' }}>
                    <FontAwesomeIcon icon={faEye} /> {item?.stats?.views}
                </span>
                <span className="view-icon" style={{ color: theme?.text_color }}>
                    {item?.duration &&<FontAwesomeIcon icon={faPlay} />} {duration}
                </span>
            </figure>
        </div>
    );
}
