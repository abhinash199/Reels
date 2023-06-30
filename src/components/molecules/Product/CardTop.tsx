import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";

 export const CardTop = ({item}) => {
    return (
        <figure>
        {/* <img src="img/img4x4.jpg" alt="" title="" /> */}
        <Icon source={item?.media[0]?.url} width={"200px"} height={"150px"}/>
        {/*<span className="ps-trnd">Trending</span>*/}
        <span className="ps-fav">
            {/* <img src="img/fav.svg" /> */}
            <Icon source={Icons.fav}/>
             </span>
    </figure>
    );
}

