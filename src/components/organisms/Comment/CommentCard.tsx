import React, {useEffect, useState} from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiChat } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import Routes from "@/constants/Routes";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import {purchaseLiveGift} from "@/containers/transactions/actions/gift";
import {giftAction} from "@/containers/live/actions/gift";
import {saveComment} from "@/containers/comments/actions";
import Swiper from "react-id-swiper";
import {useRouter} from "next/router";

export const CommentCard = ({messageEl, setElement, messageCount, setMessageCount, theme, currentMessage, setCurrentMessage, handleSubmit, comments, username, profile, id, contentId, user, setToast, coins, reply}) => {
    const [giftState, setGiftState] = useState(false);
    const [selectedGift, setSelectedGift] = useState(false);
    const [isFirstComment, setIsFirstComment] = useState(true);

    const gift = useSelector((state: ApplicationState) => state.gift);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleReplyClick = () => {
        setIsFirstComment(false);
        router.push(Routes.reply(profile?.slug,contentId,id))
      };

    const showCustomerMessage = (comment, index) => {
        if(comment?.type === 'text') {
            return (
                <>
                <div className="dl-massage sent" style={{ backgroundColor: theme?.secondary_color, borderColor: theme?.secondary_color, ...(index !== 0 && reply && { marginLeft: '50px', marginTop:'20px' }), marginBottom: '2px'}}>
                    <div className="dl-user-img">
                        <img src={comment?.user?.picture} alt="" title="" />
                    </div>
                    <div className="dl-msg">
                        <p>{comment?.user?.first_name}</p>
                        <p style={{ color: theme?.text_color,overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word' }}>{comment?.comment}</p>
                        <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{comment?.date_diff_for_human}
                    </span>
                    </div>
                </div>
                {!reply && <div style={{color: theme?.text_color, marginBottom:'20px'}} onClick={handleReplyClick}>Reply</div>}
                </>
            );
        } else {
            return (
                <div className="dl-massage sent" style={{ backgroundColor: theme?.secondary_color, borderColor: theme?.secondary_color}}>
                    <div className="dl-user-img">
                        <img src={comment?.user?.picture} alt="" title="" />
                    </div>
                    <div className="dl-msg">
                        <p>{comment?.user?.first_name}</p>
                        <img src={comment?.comment} width={'60px'} height={'60px'} />
                        <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{comment?.date_diff_for_human}
                    </span>
                    </div>
                </div>
            );
        }
    }

    const showProducerMessage = (comment, index) => {
        // return (
        //     <div className="dl-massage" style={{ borderColor: theme?.secondary_color }}>
        //         <div className="dl-user-img">
        //             <Icon source={message?.picture} />
        //         </div>
        //         <div className="dl-msg">
        //             <div className="dl-user-name" style={{ color: theme?.secondary_color }}>
        //                 {message?.name}
        //             </div>
        //             <p style={{ color: theme?.text_color }}>{message?.message}</p>
        //             <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{message?.date}</span>
        //         </div>
        //     </div>
        // );
        if(comment?.type === 'text') {
            return (
                <>
                <div className="dl-massage sent" style={{ backgroundColor: theme?.secondary_color, borderColor: theme?.secondary_color, ...(index !== 0 && reply && { marginLeft: '50px', marginTop:'20px' }), marginBottom: '2px'}}>
                    <div className="dl-user-img">
                        <img src={comment?.user?.picture} alt="" title="" />
                    </div>
                    <div className="dl-msg">
                        <p>{comment?.user?.first_name}</p>
                        <p style={{ color: theme?.text_color,overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word' }}>{comment?.comment}</p>
                        <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{comment?.date_diff_for_human}
                    </span>
                    </div>
                </div>
                {!reply && <div style={{color: theme?.text_color, marginBottom:'20px'}} onClick={handleReplyClick}>Reply</div>}
                </>
            );
        } else {
            return (
                <div className="dl-massage sent" style={{ backgroundColor: theme?.secondary_color, borderColor: theme?.secondary_color}}>
                    <div className="dl-user-img">
                        <img src={comment?.user?.picture} alt="" title="" />
                    </div>
                    <div className="dl-msg">
                        <p>{comment?.user?.first_name}</p>
                        <img src={comment?.comment} width={'60px'} height={'60px'} />
                        <span className="dl-lmsg-time" style={{ color: theme?.text_color }}>{comment?.date_diff_for_human}
                    </span>
                    </div>
                </div>
            );
        }
    }

    const showMessages = () => {
        return comments[username as string]?.comments?.map((comment, index) => {
            if(comment?.commented_by === 'customer') {
                return showCustomerMessage(comment, index);
            } else {
                return showProducerMessage(comment);
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
        if(contentId) {
            let payload = {
                gift_id: gift?._id,
                comment : gift?.photo?.thumb,
                type : 'stickers',
                content_id: contentId,
                artist_id: id
            };
            dispatch(saveComment(username, id, payload, user));
            toggleGiftsList();
            setSelectedGift(false);
        }
        setTimeout(() => messageEl.current.scrollIntoView({ inline: 'center', behavior: 'smooth' }), 777);
    }

    const sendGift = () => {
        if(parseInt(coins) <= parseInt(selectedGift?.coins)) {
            setToast({show: true, title: 'Error', message: 'Please recharge you wallet.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        } else {
            let payload = {
                gift_id : selectedGift?._id,
                total_quantity : 1,
                v: '1.0'
            }

            purchaseLiveGift(id, payload).then(res => {
                handleGiftMessage(selectedGift);
            });
        }

    };

    return (
        <>
            <div className="dl-container" >
                {!comments[username as string]?.end ? <span ref={setElement} /> : ''}
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
                <textarea placeholder={`Send ${reply ? 'reply' : 'comment'}`} maxLength={350} value={currentMessage} onChange={(e) => { setMessageCount(e.target.value.length), setCurrentMessage(e.target.value)}} style={{color: theme?.text_color}} />
                <label className="dl-attachment-btn" onClick={() => toggleGiftsList()}>
                    <AiOutlineGift fontSize={25} color={theme?.text_color} />
                </label>
                <button className="dl-msg-button" onClick={(e) => handleSubmit(e)} style={{ backgroundColor: theme?.secondary_color, color: theme?.primary_color }}>
                    <IoPaperPlaneOutline fontSize={20} color={theme?.primary_color} />
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





