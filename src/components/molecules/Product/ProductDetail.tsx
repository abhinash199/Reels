import React from "react";
import Icon from "@/components/atoms/Icon/Icon"
import Title from "@/components/atoms/Title/Title"
import { Icons } from "@/constants/Icons";

export const ProductDetail = ({item}) => {
    return (
      <>
          {item?.outofstock === 'no' ? <></> : <span>Out of Stock</span>}
        <Title>{item?.name}</Title>
        <div className="pd-price-share">
            <div className="pd-price">

                <Icon source={Icons.token} width="40" /> {item?.coins}
                </div>
            {/*<div className="pd-share">*/}
            {/*    <a href="#">*/}

            {/*        <Icon source={Icons.share} width="20" />*/}
            {/*        </a>*/}
            {/*    <a href="#" className="icon-facebook"><span className="path1"></span><span className="path2"></span></a>*/}
            {/*    <a href="#" className="icon-whatsapp"><span className="path1"></span><span className="path2"></span></a>*/}
            {/*    <a href="#" className="icon-send2"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></a>*/}
            {/*</div>*/}
        </div>
        <p className="pd-detail-text">{item?.description}</p>
      </>
    );
}





