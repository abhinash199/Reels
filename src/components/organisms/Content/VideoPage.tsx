import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {VideoCard} from "@/components/organisms/Content";
import { creatorVideosActions } from "@/containers/videos/actions";
import {useArtist, useAuth, useWallet} from "@/context/index";
import { ApplicationState } from "../../../store/reducers";
import { MainLayout} from "@/components/organisms/Layouts";
import {doPurchase} from "@/containers/transactions/actions/purchase";
import {useModal} from "react-modal-hook";
import ReactModal from "react-modal";
import {getTransactions} from "@/containers/transactions/actions/show";
import Loader  from "@/components/atoms/Loader";
import Icon from "@/components/atoms/Icon/Icon";
import {Icons} from "@/constants/Icons";
import VideoJS from "@/components/organisms/VideoJS";
import Routes from "@/constants/Routes";
import {saveLike} from "@/containers/likes/actions";

export const VideoPage = ({router}) => {
    let username = router.query.creator;
    let content =  router?.query?.content;

    const [element, setElement] = React.useState(null);

    const { id, profile, theme } = useArtist();
    const { loggedIn } = useAuth();
    const { coins } = useWallet();

    const creatorVideos = useSelector(
        (state: ApplicationState) => state.creatorVideos
    );
    const [record, setRecord] = useState([]);
    const [orders, setOrders] = useState(null);
    const [likes, setLikes] = useState([]);

    const customStyles = {
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

    const customStylesBuy = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "100%",
            padding: "0",
            border: "none"
        },
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (router.asPath !== router.route) {
            const currentElement = element;
            const currentObserver = new IntersectionObserver(
                (entries) => {
                    const first = entries[0];
                    if (first.isIntersecting) {
                        if(id) {
                            dispatch(creatorVideosActions.fetchCreatorVideos(username, id, content));
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
                        setLikes(response?.data?.like_content_ids);
                    }
                }
            ).catch(err => '');
        }
    }, [id]);

    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStylesBuy} ariaHideApp={false}>
            <div className="modal">
                <div className="unlockPopup">
                    <div className="popup">
                        <div className="close" onClick={(e) => {closeModal()}}>X</div>
                        <h3>Unlock this video with {record?.coins} coins</h3>
                        <strong>Wallet Balance: <Icon source={Icons.bronze} title="bronze" /> {coins}</strong>
                        <button className="unlockBtn"  onClick={() => { loggedIn ? handlePurchase(record) : router.push(Routes.loginWithDestination(profile?.slug, 'videos'))}} style={{background: theme?.secondary_color}}>Pay</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), [record]);

    const [openPlayerModal, closePlayerModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
          <div className="modal">
            <div className="close-white" onClick={closePlayerModal}>
              X
            </div>
            <div className="modal-content">
              <div className="modal-body">
                <VideoJS
                  options={{
                    autoplay: true,
                    controls: true,
                    sources: [{ src: record?.video?.url }],
                  }}
                />
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </ReactModal>
      ), [record]);
      

    const onClickHandler = (item) => {
        setRecord(item);
        openPlayerModal();
    }

    const handlePurchaseModal = (item) => {
        setRecord(item);
        openModal();
    }

    const handlePurchase = (item) => {
        if(coins >= item?.coins) {
            let payload = {
                content_id: item?._id,
                coins: item?.coins,
                v: '1.0'
            };
            if (id) {
                doPurchase(id, payload).then(res => {
                    let order = {
                        "_id": item?._id,
                        "type": "video",
                        "photo": res?.data?.content?.photo,
                        "photo_portrait": res?.data?.content?.photo_portrait,
                    }
                    setOrders([...orders, order]);
                    closeModal();
                }).catch(err => {
                    console.log(err)
                })
            }
        } else  {
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

    const getVideos = () => {

        if(loggedIn) {
            if (orders) {
                return creatorVideos[username as string]?.videos.map(item => {
                    let purchased = orders.find((x) => {
                        if (x?._id === item?._id) {
                            return {'photo_portrait': x.photo_portrait};
                        }
                    });
                    return <VideoCard item={item} profile={profile} onClickHandler={onClickHandler}
                                      handlePurchase={handlePurchaseModal} key={item?._id} purchased={purchased} theme={theme} loggedIn={loggedIn} storeLike={storeLike} likes={likes} />
                });
            }
        } else {
            let purchased = [];
            return creatorVideos[username as string]?.videos.map(item => {
                return <VideoCard item={item} profile={profile} onClickHandler={onClickHandler}
                                  handlePurchase={handlePurchaseModal} key={item?._id} purchased={purchased} theme={theme} loggedIn={loggedIn} storeLike={storeLike} likes={likes} />
            });
        }
    }

    return (
        <MainLayout title={'Videos'} activeCode={'videos'}>
            {creatorVideos.loading ? <Loader /> : getVideos() }
            <span ref={setElement}><Loader /></span>
        </MainLayout>
    );
}
