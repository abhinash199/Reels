import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store/reducers";
import { homeActions } from "@/containers/home/actions";
import {useArtist, useAuth, useWallet} from "@/context/index";
import { MainLayout} from "@/components/organisms/Layouts";
import  {Slideshow, Content}  from "@/components/organisms/Sorters";
import Loader  from "@/components/atoms/Loader";
import {useModal} from "react-modal-hook";
import Icon from "../../components/atoms/Icon/Icon";
import {Icons} from "@/constants/Icons";
import ReactModal from "react-modal";
import {doPurchase} from "@/containers/transactions/actions/purchase";
import { fetchAlbum } from "@/containers/albums/actions/show";
import { LightBox } from '@/components/organisms/LightBox';
import {getTransactions} from "@/containers/transactions/actions/show";
import VideoJS from "../../components/organisms/VideoJS";
import Routes from "../../constants/Routes";
import {useRouter} from "next/router";
import {LiveFloatIcon} from "@/components/organisms/Live/LiveFloatIcon";

const Home = () => {

    const home = useSelector((state: ApplicationState) => state.home);
    // const orders = useSelector(
    //     (state: ApplicationState) => state.orders
    // );
    const [orders, setOrders] = useState(null);
    const dispatch = useDispatch();
    let router = useRouter();

    const { id, profile, theme } = useArtist();
    const { coins } = useWallet();
    const { loggedIn } = useAuth();

    const [record, setRecord] = useState([]);
    const [openLightbox, setOpenLightbox] = React.useState(false);
    const [sIndex, setSIndex] =  React.useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        if(id) {
            dispatch(homeActions.fetchHomePage(id));
        }
    }, [id]);

    useEffect(() => {
        if (id && loggedIn) {
            getTransactions(id).then(response => {
                    if(response) {
                        setOrders(response?.data?.purchase_content_data);
                    }
                }
            ).catch(err => '');
        }
    }, [id]);

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

    const customStylesVideo = {
        content: {
            top: "0",
            left: "0",
            right: "auto",
            bottom: "auto",
            width: "100%",
            height: '100vh',
            padding: "0",
        },
    };

    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
            <div className="modal">
                <div className="unlockPopup">
                    <div className="popup">
                        <div className="close" onClick={(e) => {closeModal()}}>X</div>
                        <h3>Unlock this content with {record?.coins} coins</h3>
                        <strong>Wallet Balance: <Icon source={Icons.bronze} title="bronze" />  {coins}</strong>
                        <button className="unlockBtn"  onClick={() => {handlePurchase(record);}} style={{background: theme?.secondary_color}}>Pay</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), [record]);

    const handlePurchase = (item) => {
        if(coins >= item?.coins) {
            let payload = {
                content_id: item?._id,
                coins: item?.coins,
                v: '1.0'
            };
            if (id) {
                let type = '';
                if(item?.type === 'photo') {type = 'photo'} else {type = 'video'}
                doPurchase(id, payload).then(res => {
                    let order = {
                        "_id": item?._id,
                        "type": type,
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

    const handlePurchaseModal = (item) => {
        setRecord(item);
        openModal();
    }

    const onClickHandler = (item, purchased = {}) => {

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
                fetchAlbum(id, item?.content_id).then(res => {
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

    const [openPlayerModal, closePlayerModal] = useModal(() => (
        <ReactModal isOpen style={customStylesVideo} ariaHideApp={false}>
            <div className="modal">
                <div
                    className="close-white"
                    onClick={(e) => {
                        closePlayerModal()
                    }}
                >
                    X
                </div>
                <div className="modal-content">
                    <div className="modal-body">
                        <VideoJS options={{
                            autoplay: true,
                            controls: true,
                            sources: [{
                                src: record?.video?.url,
                            }]
                        }}  />
                    </div>
                    <div className="modal-footer">

                    </div>
                </div>
            </div>
        </ReactModal>
    ), [record]);

    const onClickHandlerVideo = (item) => {
        setRecord(item);
        openPlayerModal();
    }


   const getSorters = () => {
        return home?.sorters?.list?.map((sorter: any) => {
            switch (sorter?.type) {
                case 'banner':
                    return <Slideshow sorter={sorter} config={home?.config_banners} key={sorter?._id} profile={profile} theme={theme}/>;
                case 'content':
                    return <Content sorter={sorter} config={home?.config_photos} slug={profile.slug} handlePurchase={handlePurchaseModal} theme={theme} onClickHandler={onClickHandler} orders={orders} onClickHandlerVideo={onClickHandlerVideo} loggedIn={loggedIn} />;
                default:
                    return <> </>;
            }
        });
    }

    const handleLight = () => {
        setOpenLightbox(!openLightbox);
    }

    return (
        <MainLayout title={'Home'} activeCode={'home'}>
            <LightBox
                state={openLightbox}
                event={handleLight}
                data={slides}
                imageWidth="100%"
                imageHeight="100%"
                setImageIndex={setSIndex}
                imageIndex={sIndex}
            />
            {home.loading ? <Loader /> : getSorters() }

             <LiveFloatIcon id={id} profile={profile} />
        </MainLayout>
    );
}


export default Home;
