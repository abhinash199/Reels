import React from "react";

export const OrderCard = ({item, theme}) => {

    return (
        <div className="ordersWrap" style={{color: theme?.text_color}}>
            <div className="orderItem">
                <div className="video">
                    <img src={item?.product?.media[0].url} />
                </div>
                <div className="orderDetails">
                    <div className="oid">{item?.product?.name}</div>
                    <div className="oid">ORDER ID - {item?._id}</div>
                    <div className="timestamp">ORDER Date -{item?.created_at}</div>
                    <div className="timestamp">Coins :  {item?.coins}</div>
                    <div className="status pending">{item?.delivery_info?.delivery_status}</div>

                </div>
            </div>
        </div>
    );
}
