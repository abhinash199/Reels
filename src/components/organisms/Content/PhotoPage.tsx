import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout} from "@/components/organisms/Layouts";
import { PhotoCard }  from "@/components/organisms/Content";
import Loader  from "@/components/atoms/Loader";
import { creatorPhotosActions } from "@/containers/albums/actions";
import { fetchAlbum } from "@/containers/albums/actions/show";
import { saveLike } from "@/containers/likes/actions";
import { doPurchase } from "@/containers/transactions/actions/purchase";
import { ApplicationState } from "../../../store/reducers";
import {useArtist, useAuth, useWallet} from "@/context/index";
import { LightBox } from '@/components/organisms/LightBox';
import {useModal} from "react-modal-hook";
import ReactModal from "react-modal";
import { getTransactions } from "@/containers/transactions/actions/show";
import Icon from "@/components/atoms/Icon/Icon";
import {Icons} from "@/constants/Icons";
import Routes from "@/constants/Routes";

export const PhotoPage = ({router}) => {

    const dispatch = useDispatch();
    let username =  router?.query?.creator;
    let content =  router?.query?.content;

    const [element, setElement] = React.useState(null);

    const { id, profile, theme } = useArtist();
    const { loggedIn } = useAuth();
    const { coins } = useWallet();
    const [openLightbox, setOpenLightbox] = React.useState(false);
    const [sIndex, setSIndex] =  React.useState(0);
    const [slides, setSlides] = useState([]);
    const [record, setRecord] = useState([]);
    const [orders, setOrders] = useState(null);
    const [likes, setLikes] = useState([]);

    const creatorPhotos = useSelector(
        (state: ApplicationState) => state.creatorPhotos
    );

    useEffect(() => {
        if (router.asPath !== router.route) {
            const currentElement = element;
            const currentObserver = new IntersectionObserver(
                (entries) => {
                    const first = entries[0];
                    if (first.isIntersecting) {
                        if(id) {
                            // @ts-ignore
                            dispatch(creatorPhotosActions.fetchCreatorPhotos(username, id, content));
                        }
                    }
                },
                { threshold: 0.5 }
            );

            if (currentElement) {
                currentObserver.observe(currentElement);
            }

            return () => {
                if (currentElement) {
                    currentObserver.unobserve(currentElement);
                }
            };

        }
    }, [id, element]);

    useEffect(() => {
        if (id && loggedIn) {
            getTransactions(id).then(response => {
                if(response) {
                    setOrders(response?.data?.purchase_content_data);
                   // let data = JSON.stringify(response?.data?.like_content_ids);
                   // localStorage.setItem('likes', data);
                    setLikes(response?.data?.like_content_ids);
                }
            }
            ).catch(err => '');
        }
    }, [id]);

    const onClickHandler = (item, purchased = {
        photo: undefined
    }) => {

        if(item && parseInt(item?.stats?.childrens) <= 0) {
            if(item?.coins >= 1) {
                let photos = [];
                photos.push({
                    'key': 0,
                    'image': purchased?.photo?.medium
                });
                setSlides(photos);
                setOpenLightbox(!openLightbox);
            } else {
                let photos = [];
                photos.push({
                    'key': 0,
                    'image': item?.photo?.thumb
                });
                setSlides(photos);
                setOpenLightbox(!openLightbox);
            }

        } else {
            if(item)(
                fetchAlbum(id, item?._id).then(res => {
                    if(res?.list[0]) {
                        let photos = [];
                        res?.list.map((result, index) => {
                            photos.push({
                                'key': index,
                                'image': result?.photo?.thumb
                            });
                        });
                        setSlides(photos);
                        setOpenLightbox(!openLightbox);
                    } else {
                        if(item?.coins >= 1) {
                            let photos = [];
                            photos.push({
                                'key': 0,
                                'image': purchased?.photo?.medium
                            });
                            setSlides(photos);
                            setOpenLightbox(!openLightbox);
                        } else {
                            let photos = [];
                            photos.push({
                                'key': 0,
                                'image': item?.photo?.thumb
                            });
                            setSlides(photos);
                            setOpenLightbox(!openLightbox);
                        }
                    }

                })
            )
        }
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "90%",
            padding: "0",
            border: "none"
        },
    };

    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
            <div className="modal">
                <div className="unlockPopup">
                    <div className="popup">
                        <div className="close" onClick={(e) => {closeModal()}}>X</div>
                        <h3>Unlock this photo with {record?.coins} coins</h3>
                        <strong>Wallet Balance: <Icon source={Icons.bronze} title="bronze" /> {coins}</strong>
                        <button className="unlockBtn"  onClick={() => { loggedIn ? handlePurchase(record) : router.push(Routes.loginWithDestination(profile?.slug, 'photos'))}} style={{background: theme?.secondary_color}}>Pay</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), [record]);

    const handlePurchaseModal = (item) => {
        setRecord(item);
        openModal();
    }

    const handlePurchase = (item) => {

        if(coins >= item?.coins) {
            let payload = {
                content_id : item?._id,
                coins: item?.coins,
                v: '1.0'
            };
            if(id) {
                doPurchase(id, payload).then(res => {
                    let order = {
                        "_id": item?._id,
                        "type": "photo",
                        "photo": res?.data?.content?.photo,
                        "photo_portrait": res?.data?.content?.photo_portrait,
                    }
                    closeModal();
                    setOrders([...orders, order]);
                }).catch(err => '');
            }
        } else {
            router.push(Routes.recharge(profile?.slug));
        }
    }

    const storeLike = async (likeId: string) => {
        let payload = {
            type: 'offer',
            content_id: likeId,
            like:true,
        }
        saveLike(id, payload).then(res => {
            setLikes(likes);
            setLikes([...likes, likeId]);
        });
    };

    const getPhotos = () => {
        if(loggedIn) {
            if (orders) {
                return creatorPhotos[username as string]?.photos.map(item => {
                    let  purchased = orders.find((x) => {
                        if (x?._id === item?._id && x.type === 'photo') {
                            return {'photo': x.photo};
                        }
                    });
                    return <PhotoCard item={item} profile={profile} onClickHandler={onClickHandler} handlePurchase={handlePurchaseModal} key={item?._id} purchased={purchased} theme={theme} loggedIn={loggedIn} storeLike={storeLike} likes={likes} />
                });
            }
        } else {
            let purchased = [];
            return creatorPhotos[username as string]?.photos.map(item => {
                return <PhotoCard item={item} profile={profile} onClickHandler={onClickHandler} handlePurchase={handlePurchaseModal} key={item?._id} purchased={purchased} theme={theme} loggedIn={loggedIn} storeLike={storeLike} likes={likes} />
            });
        }
    }

    const handleLight = () => {
        setOpenLightbox(!openLightbox);
    }

    return (
        <MainLayout title={'Gallery'} activeCode={'photos'}>
            <LightBox
                state={openLightbox}
                event={handleLight}
                data={slides}
                imageWidth="100%"
                imageHeight="100%"
                setImageIndex={setSIndex}
                imageIndex={sIndex}
            />
            {creatorPhotos.loading ? <Loader /> : getPhotos() }
            <span ref={setElement}><Loader /></span>
        </MainLayout>
    );
}
