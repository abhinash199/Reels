import React from "react";
import {ProductSlider, ProductDetail, DeliveryForm, DeliveryStatus,  Faqs} from "@/components/molecules/Product"

export const ProductDetailPage = ({item, theme, id, profile}) => {
    return (
        <>
        <div className="container header-footer-enabel">
        <div className="product-detail">
            <ProductSlider item={item} />
            <ProductDetail item={item} />
            <DeliveryForm item={item} theme={theme} id={id} profile={profile} />
            <DeliveryStatus/>
            <Faqs/>
        </div>
        </div>
        </>
    );

}



