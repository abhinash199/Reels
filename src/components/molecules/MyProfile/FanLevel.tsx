import React from "react";
import Icon from "@/components/atoms/Icon/Icon";

export const FanLevel = ({user, theme}) => {

    let {badges} = user?.customer;

    const handleLevel = () => {
        return badges.map(item => {
            return (
                <div className={item.status ? 'level selected' : 'level'} key={item.name}>
                    <Icon source={item.icon} alt="" title="" width={30} />
                    <span style={{color: theme?.text_color}}>{item.name}</span>
                </div>
            )
        })
    }

    return (
        <div className="fan-level">
            <h3 style={{color: theme?.text_color}}>Fan Level</h3>
            {handleLevel()}
        </div>
    );
}





