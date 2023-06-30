import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { ReportHideMedia } from "./ReportHideMedia";

export const MediaHeader = ({created, profile, theme, item}) => {   
    return (
        <div className="feed-header">
        <figure className="user-pic">
            <Icon source={profile?.photo?.thumb} alt="user name" title="user name" />
        </figure>
        <div className="user-name">
            <div style={{color: theme?.text_color}}>{profile?.first_name +' '+ profile?.last_name}</div>
            <span className="post-time" style={{color: theme?.text_color}}>{created}</span>
        </div>
        {item?.commercial_type === 'free' && <ReportHideMedia theme={theme} item={item} />}
    </div>
    );
}

