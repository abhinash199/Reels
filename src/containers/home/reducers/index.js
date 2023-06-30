import { homeConstants } from '../constants';

const initialState = {
        loading : true,
        error: false,
        sorters: [],
        config_banners: {
            containerClass:'swiper-container swiper banner-slider home-swiper',
            freeMode: true,
            slidesPerView: 1,
            spaceBetween: 10,
        },
        config_photos: {
            containerClass:'swiper-container gal-listing',
            freeMode: true,
            slidesPerView: 1.5,
            spaceBetween: 10,
            navigation: {
                nextEl: '.sw_photos_arrows .swiper-button-next',
                prevEl: '.sw_photos_arrows .swiper-button-prev',
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                }
            }
        },
        config_videos: {
            containerClass:'swiper-container sw_videos_slider',
            freeMode: true,
            slidesPerView: 1.5,
            spaceBetween: 10,
            navigation: {
                nextEl: '.sw_videos_arrows .swiper-button-next',
                prevEl: '.sw_videos_arrows .swiper-button-prev',
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                }
            }
        },
    },

    HomeReducer = (state = initialState, action) => {
        switch (action.type){
            case homeConstants.REQUEST_HOME_PAGE:
                return {
                    ...state,
                    loading: true
                };
            case homeConstants.RECEIVE_HOME_PAGE:
                return Object.assign({}, state, {
                    loading: false,
                    sorters: action.sorters.data
                });

            case homeConstants.ERROR_HOME_PAGE:
                return {
                    ...state,
                    loading: false,
                    error: true
                };
            default:
                return state;
        }
    };

export default HomeReducer;
