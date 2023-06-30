import React, {useEffect, useState} from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiCheckDoubleFill } from "react-icons/ri";
import { BiChat } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import Routes from "@/constants/Routes";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import {purchaseLiveGift} from "@/containers/transactions/actions/gift";
import {giftAction} from "@/containers/live/actions/gift";
import {sendMessage} from "@/containers/directline/actions/room";
import Swiper from "react-id-swiper";
import { useRouter } from "next/router";

export const Chat = ({messageEl, setElement, messageCount, setMessageCount, theme, currentMessage, setCurrentMessage, handleSubmit, messages, username, profile, id, roomID, directLinePrice, setToast, coins}) => {

    const [giftState, setGiftState] = useState(false);
    const [selectedGift, setSelectedGift] = useState(false);

    const gift = useSelector((state: ApplicationState) => state.gift);

    const dispatch = useDispatch();
    let router = useRouter();

    const displayTime = (date) => {
        let time = date.split(' ');
        return time[1] +' '+ time[2]
    }

    const showCustomerMessage = (message) => {
        if(message?.type === 'text') {
            return (
                <div className="dl-massage sent" style={{ backgroundColor: theme?.secondary_color, borderColor: theme?.secondary_color}}>
                    <div className="dl-user-img">
                        <img src={message?.picture} alt="" title="" />
                    </div>
                    <div className="dl-msg">
                        <p style={{ color: theme?.text_color }}>{message?.message}</p>
                        <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{message?.date}{message?.read ? <RiCheckDoubleFill fontSize={22} color={theme?.text_color} /> : ''}
                    </span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="dl-massage sent" style={{ backgroundColor: theme?.secondary_color, borderColor: theme?.secondary_color}}>
                    <div className="dl-user-img">
                        <img src={message?.picture} alt="" title="" />
                    </div>
                    <div className="dl-msg">
                        <img src={message?.message} width={'60px'} height={'60px'} />
                        <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{message?.date}{message?.read ? <RiCheckDoubleFill fontSize={22} color={theme?.text_color} /> : ''}
                    </span>
                    </div>
                </div>
            );
        }

    }

    const showProducerMessage = (message) => {
        return (
            <div className="dl-massage" style={{ borderColor: theme?.secondary_color }}>
                <div className="dl-user-img">
                    <Icon source={message?.picture} />
                </div>
                <div className="dl-msg">
                    <div className="dl-user-name" style={{ color: theme?.secondary_color }}>
                        {message?.name}
                    </div>
                    <p style={{ color: theme?.text_color }}>{message?.message}</p>
                    <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{message?.date}</span>
                </div>
            </div>
        );
    }

    const showMessages = () => {
            return messages[username as string]?.messages.map(message => {
                if(message?.message_by === 'customer') {
                    return showCustomerMessage(message);
                } else {
                    return showProducerMessage(message);
                }
            });
    }

    useEffect(() => {
        if(id) {
            dispatch(giftAction.gift(id));
        }
    }, [id]);

    function toggleGiftsList() {
        !giftState ? setGiftState(true) : setGiftState(false);
    }

    let config = {
        containerClass:'swiper-container swiper banner-slider',
        freeMode: true,
        slidesPerView: 1,
        spaceBetween: 10,
    }

    const handleSlideGifts = (item) => {
        return (
            <div className="item" onClick={(e) => {
                e.preventDefault();
                setSelectedGift(item);
            }}>
                <div className={selectedGift?._id === item._id ? 'sticker active' : 'sticker'}>
                    <img
                        src={item?.photo?.xsmall}
                        alt={item.name}
                        width={"40px"}
                        height={"40px"}
                    />
                </div>
                <div className="cost">
                    <span className="icon"><Icon source={Icons.token} title="bronze" /></span>
                    <span className="text">{item.coins}</span>
                </div>
            </div>
        )
    }

    const handleGroupItems = (items) => {
        return items.map((item) => {
            return handleSlideGifts(item);

        });
    }

    const handleItems = (group) => {
        return group.map((items) => {
            return (
                <div className="swiper-slide gift-slider">
                    {handleGroupItems(items)}
                </div>
            )
        });
    }

    function getGifts() {

        let group = [];
        let n = 12;

        for (let i = 0, end =  gift?.gift?.list.length / n; i < end; ++i) {
            group.push(gift?.gift?.list.slice(i * n, (i + 1) * n));
        }
        return (
            <Swiper {...config}>
                {handleItems(group)}
            </Swiper>
        );
    }

    const handleGiftMessage = (gift) => {
        if(roomID) {
            let payload = {
                gift_id: gift?._id,
                type : 'gift',
                directline_room_id: roomID,
                message_by: 'customer',
                artist_id: id
            };

            dispatch(sendMessage(username, id, payload));
            toggleGiftsList();
            setSelectedGift(false);
        }
        setTimeout(() => messageEl.current.scrollIntoView({ inline: 'center', behavior: 'smooth' }), 777);
    }

    const sendGift = () => {       
        if(parseInt(coins) <= parseInt(selectedGift?.coins)) {
            setToast({show: true, title: 'Error', message: 'Please recharge you wallet.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        } else if(selectedGift !== false) {
            let payload = {
                gift_id : selectedGift?._id,
                total_quantity : 1,
                v: '1.0'
            }
            purchaseLiveGift(id, payload).then(res => {
               handleGiftMessage(selectedGift);
            });
        }else{
            setToast({show: true, title: 'Error', message: 'Please select any gift item.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        }
    };

    return (
        <>
            <div className="dl-container" >
                {!messages[username as string]?.end ? <span ref={setElement} /> : ''}
            {showMessages()}
                <div ref={messageEl} />
            {/*<div style={{textAlign: "center"}}>*/}
            {/*    <p className="dl-info-msg">max limit of 500 characters per message. Say whatever you want, just avoid bad words etc. since that message may be quarantined & coins won’t be refunded. Enjoy your Direct Line with her.</p>*/}
            {/*</div>*/}
        </div>

            <div className={giftState ? "vs-wrap vs-gift-display" : "vs-wrap"}>
                <div className="stickers-wrap">
                    <div className="stickers">
                        <div className="stickers-inner">
                            {gift.loading ? <div>Loading...</div> : getGifts()}
                        </div>
                    </div>
                    <div className="bar">
                                    <span  onClick={(e) => {
                                        e.preventDefault();
                                        toggleGiftsList();
                                    }}>X</span>
                        <div>
                            <span className="icon-bronze"><Icon source={Icons.bronze} title="bronze" /></span>
                            <span>{selectedGift ? selectedGift?.coins : 0}</span>
                        </div>
                        <span className="buy-coins" onClick={() => router.push(Routes.recharge(profile?.slug))}>Buy Coins</span>
                        <span className="send-btn" onClick={() => sendGift()}>Send</span>
                    </div>
                </div>
            </div>

        <div className="dl-msg-form" style={{ background: theme?.primary_color, border: '1px solid ' + theme?.secondary_color}}>
            <div className="msg-limit" style={{ color: theme?.text_color }}>
                <span className="icon-ico-chat"><BiChat fontSize={25} color={theme?.text_color} /></span>
                {messageCount}/350
            </div>
            <textarea 
                placeholder="Send message" 
                maxLength={350} 
                value={currentMessage} 
                onChange={(e) => { 
                                    const message = e.target.value;
                                    if (message.length <= 350) {
                                        setMessageCount(message.length);
                                        setCurrentMessage(message);
                                    }}
                        } 
                style={{color: theme?.text_color}}
            />
            <label className="dl-attachment-btn" onClick={() => toggleGiftsList()}>
                <AiOutlineGift fontSize={25} color={theme?.text_color} />
            </label>
            <button className="dl-msg-button" onClick={(e) => handleSubmit(e)} style={{ backgroundColor: theme?.secondary_color, color: theme?.primary_color }}>
                <IoPaperPlaneOutline fontSize={20} color={theme?.primary_color} /> {directLinePrice} <Icon source={Icons.token} width="20" />
            </button>
            <style jsx global>
                {`
                  ::placeholder {
                    color: ${theme?.text_color};
                    opacity: 1;
                    }
                
                    :-ms-input-placeholder {
                        color: ${theme?.text_color};
                    }
                    ::-ms-input-placeholder {
                        color: ${theme?.text_color};
                    }
                    .dl-msg-form {
                        position: fixed;
                        bottom: calc(60px + 10px);
                        left:10px;
                        right:10px;
                        width: calc(100-20px)%;
                        height: 55px;
                      }
                `}
            </style>
        </div>
    </>

    );
}





