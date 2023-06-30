import { liveConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        sorters: [],
        // config_banners: {
        //     containerClass:'swiper-container swiper banner-slider',
        //     freeMode: true,
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        // },
        // config_photos: {
        //     containerClass:'swiper-container gal-listing',
        //     freeMode: true,
        //     slidesPerView: 1.5,
        //     spaceBetween: 10,
        //     navigation: {
        //         nextEl: '.sw_photos_arrows .swiper-button-next',
        //         prevEl: '.sw_photos_arrows .swiper-button-prev',
        //     },
        //     breakpoints: {
        //         767: {
        //             slidesPerView: 3,
        //             spaceBetween: 10,
        //         },
        //         991: {
        //             slidesPerView: 4,
        //             spaceBetween: 10,
        //         }
        //     }
        // },
        // config_videos: {
        //     containerClass:'swiper-container sw_videos_slider',
        //     freeMode: true,
        //     slidesPerView: 1.5,
        //     spaceBetween: 10,
        //     navigation: {
        //         nextEl: '.sw_videos_arrows .swiper-button-next',
        //         prevEl: '.sw_videos_arrows .swiper-button-prev',
        //     },
        //     breakpoints: {
        //         767: {
        //             slidesPerView: 3,
        //             spaceBetween: 10,
        //         },
        //         991: {
        //             slidesPerView: 4,
        //             spaceBetween: 10,
        //         }
        //     }
        // },
    },

    JoinLiveReducer = (state = initialState, action) => {
        switch (action.type){
            case liveConstants.REQUEST_JOIN_LIVE:
                return {
                    ...state,
                    loading: true
                };
            case liveConstants.RECEIVE_JOIN_LIVE:
                return Object.assign({}, state, {
                    loading: false,
                    sorters: action.sorters.data
                });

            case liveConstants.ERROR_JOIN_LIVE:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default JoinLiveReducer;
