import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import SubTitle from "@/components/atoms/SubTitle/SubTitle"

 export const CardBottom = ({item}) => {
    return (
        <>
         <SubTitle>{item?.name}</SubTitle>
        <div className="ps-price">
           <Icon source={Icons.token} width="27" /> {item?.coins}
        </div>
        </>
    );
}

