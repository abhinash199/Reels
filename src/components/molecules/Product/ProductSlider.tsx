import React from "react";
import Swiper from "react-id-swiper";

export const ProductSlider = ({item}) => {

    let config = {
        containerClass:'swiper-container swiper banner-slider',
        freeMode: true,
        slidesPerView: 1,
        spaceBetween: 10,
    }

    const handleItems = () => {
        return item?.media?.map((media) => {
            return (
                <div className="swiper-slide">
                    <div className="pd-banner-slide">
                        <img src={media?.url} className="pd-video-stream" />
                    </div>
                </div>
            )
        });
    }

    return (
      <>
          <Swiper {...config}>
              {handleItems()}
          </Swiper>
      </>
    );
}





