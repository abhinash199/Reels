import React from "react";
import SubTitle from "@/components/atoms/SubTitle/SubTitle"

export const DeliveryStatus = () => {
    return (
      <>
            <SubTitle> Delivery Note:
            <span>How to get the product delivered:</span>
            </SubTitle>
            <div className="pd-ship-states">
                <div className="icon-cart"></div>
                <div className="icon-user-lines"></div>
                <div className="icon-note-check"></div>
                <div className="icon-send-gift"></div>
            </div>
      </>
    );
}





