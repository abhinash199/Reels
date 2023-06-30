import React, {useEffect, useState} from "react";
import Icon from "@/components/atoms/Icon/Icon"
import Button from "@/components/atoms/Button/Button";
import SubTitle from "@/components/atoms/SubTitle/SubTitle";
import { Icons } from "@/constants/Icons";
import useAgora from "@/hooks/useAgora";
import { ApplicationState } from "../../../store/reducers";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useInterval } from "@/hooks/useInterval";
import { AiFillEye } from "react-icons/ai";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { VscUnmute } from "react-icons/vsc";
import { usePubNub } from 'pubnub-react';
import { giftAction } from "@/containers/live/actions/gift";
import Routes from "@/constants/Routes";
import { purchaseLiveGift } from "@/containers/transactions/actions/gift";
import Swiper from "react-id-swiper";
import Toast from "@/components/atoms/Toast";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

export const LivePage = ({rtmClient, client, channel, channelName, giftChannel, chatChannel, customerUsername, creatorId, profile, token, customerUUId, customerId, customerAvatar, theme, isSuperSendActive, superSendCoins, coins}) => {

     const {
         join,
         userVideoPlay,
         localAudioTrack,
         localVideoTrack,
         leave,
         joinState,
         userAudioPlay,
         remoteUsers
     } = useAgora(client);

    const dispatch = useDispatch();
     let router = useRouter();
     const [membersCount, setMembersCount] = useState(0);
     const [giftCount, setGiftCount] = useState(1);
     const [messagesNumber, setMessageNumber] = useState(0);
     const [unMuted, setUnMuted] = useState(false);
     const [isChatVisible, setIsChatVisible] = useState(true);
     const [giftState, setGiftState] = useState(false);
     const [superSendState, setSuperSendState] = useState(false);
     const [loggedIn, setLoggedIn] = useState(false);
    const [toast, setToast] = useState({show: false, title: '', message: ''});
     const [callRequest, setCallRequest] = useState(false);
     const [selectedGift, setSelectedGift] = useState(false);
     const [giftList, setGiftList] = useState(false);
     const [superSendList, setSuperSendList] = useState(false);
     const [enableComments, setEnableComments] = useState(true);
     const [enableSuperSend, setEnableSuperSend] = useState(isSuperSendActive);
    const [messageCount, setMessageCount] = useState(0);
    const [currentMessage, setCurrentMessage] =  useState('');
    const [currentMessageError, setCurrentMessageError] =  useState({errorMessage: 'Please enter a message greater then 6 characters.', error: false});

    const pubnub = usePubNub();
    const [channels] = useState([chatChannel, giftChannel]);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
    const [liveSessionEnded, setLiveSessionEnded] = useState(false);

    const gift = useSelector((state: ApplicationState) => state.gift);

    const handleMessage = event => {
        const message = event.message;
       // if (typeof message === 'string' || message.hasOwnProperty('text')) {
          //  const text = message.text || message;
            addMessage(messages => [...messages, message]);
       // }
    };

    // const memoizedRemoteUsers = useMemo(() => remoteUsers, [remoteUsers]);
    // useEffect(() =>{
    //     runCountRef.current++;
    //     // console.log("useEffect run count:", runCountRef.current);
    //     if( runCountRef.current > 4 && remoteUsers.length === 0 ){
    //         setLiveSessionEnded(true)}
    //     }
    // ,[remoteUsers]);

    useEffect(()=>{
        const handleUserLeft = () => setLiveSessionEnded(true);
        client.on("user-left", handleUserLeft);
        return () => {
            client.off("user-left", handleUserLeft);
        }
    },[client])
    
    useEffect(() => {
        if (liveSessionEnded) {
         
          setToast({show: true, title: 'Live Session Ended', message: ''});  // Show live session ended message
         
          const timeout = setTimeout(() => {
            setToast({show: false, title: '', message: ''});
            router.push(Routes.home(profile?.slug));
          }, 3000);                                                         // Redirect after 3 seconds
      
          return () => clearTimeout(timeout);                               // Clean up the timeout on component unmount or if the user navigates away
        }
      }, [liveSessionEnded, router]);

    useEffect(() => {
        const listenerParams = { message: handleMessage }
        pubnub.addListener(listenerParams);
        pubnub.subscribe({ channels });
        pubnub.hereNow(
            {
                channels: channels,
                includeState: true
            },
            function (status, response) {
                setMembersCount(response?.totalOccupancy)
            }
        );
        return () => {
            pubnub.unsubscribe({ channels })
            pubnub.removeListener(listenerParams)
        }
    }, [pubnub, channels]);

    useEffect(() => {
        setGiftList(false);
        messages.map((message, index) => {
            if(message?.giftUrl) {
                let time = message?.userTimeStamp + 5000;
                let currentTime = Date.now();
                if(time >= currentTime) {
                    setGiftList(message);
                }
            } else if(message?.SUPER_SEND) {
                let time = message?.userTimeStamp + 5000;
                let currentTime = Date.now();
                if(time >= currentTime) {
                    setSuperSendList(message);
                }
            } else {}
            if(message?.COMMENT_BOX_VISIBLE) {
                setEnableComments(true);
            } else if (message?.COMMENT_BOX_VISIBLE !== undefined) {
                setEnableComments(false);
            }

            if(message?.IS_SUPER_COMMENT_ON) {
                setEnableSuperSend(true);
            } else {
                setEnableSuperSend(false);
            }
        });

    }, [messages]);

    useEffect(() => {
        setTimeout(() => {setGiftList(false)}, 5000);
    }, [selectedGift]);

    useEffect(() => {
        setTimeout(() => {setSuperSendList(false)}, 5000);
    }, [superSendList]);

    const sendMessage = message => {
        if (message) {

            let payload = {
                userName : customerUsername,
                user_id : customerId,
                userComment: message,
                userProfilePic : customerAvatar,
                userUid : customerUUId,
                userTimeStamp : Date.now(),
            }

            pubnub
                .publish({ channel: channels[0], message : payload })
                .then(() => setMessage('')).catch(error => {
                    console.log(error);
                });
        }
    };

    const unmute = () => {
        if (userAudioPlay) {
            if (userAudioPlay.isPlaying) {
                userAudioPlay.stop();
            } else {
                userAudioPlay.play();
            }
            setUnMuted(userAudioPlay.isPlaying);
        }
    };

    function getSpeakerState() {
        return (
                <div className="ss-reprt-btn">
                    { unMuted ? <VscUnmute fontSize={25} /> : <IoVolumeMuteSharp fontSize={25} /> }
                </div>
        );
    }

    const sendGift = () => {

        let cost = selectedGift?.coins * giftCount ;

        if(parseInt(coins) <= parseInt(cost)) {
            setToast({show: true, title: 'Error', message: 'Please recharge your wallet.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        } else {
            let payload = {
                gift_id : selectedGift?._id,
                total_quantity : giftCount,
                v: '1.0'
            }
            purchaseLiveGift(creatorId, payload).then(res => {

                let payload = {
                    userName : customerUsername,
                    user_id : customerId,
                    userProfilePic : customerAvatar,
                    giftComboCount: giftCount,
                    giftComboName: selectedGift?.name,
                    giftCost: cost,
                    giftUrl: selectedGift?.photo?.xsmall,
                    userUid : customerUUId,
                    userTimeStamp : Date.now(),
                }

                pubnub
                    .publish({ channel: channels[1], message : payload })
                    .then(() =>
                    {setMessage(''), setSelectedGift(false)}).catch(error => {
                    console.log(error);
                });

            }).catch(error => '');
        }
    };

    useEffect(() => {
        start();
        dispatch(giftAction.gift(creatorId));
    }, []);

    function start() {
        join(process.env.NEXT_PUBLIC_AGORA_APP_ID, channelName, token, customerId, true).then(() => {
            init();
            joinChannel();
        });
    }

    function init() {
        rtmClient
            .login({ token: token, uid: customerId })
            .then(() => {
                setLoggedIn(true);
                channel
                    .join()
                    .then(() => {
                        //sendUserCount();
                       // UserJoinedMessage();
                        /* Your code for handling the event of a join-channel success. */
                    })
                    .catch((error) => {
                        //console.log("channel", error);
                        /* Your code for handling the event of a join-channel failure. */
                    });
            })
            .catch((err) => {
                console.log("AgoraRTM client login failure", err);
            });
    }

    function joinChannel() {
        rtmClient
            .getChannelMemberCount([channelName])
            .then((res) => {
               // setMembersCount(res[channelName] - 1);
            })
            .catch((error) => error);
    }

    useEffect(() => {
        if (userVideoPlay) {
            userVideoPlay?.play("live_video");
        } else {
            document.getElementById("live_video").innerHTML = `<div></div>`;
        }
    }, [userVideoPlay]);

    useInterval(() => {
            rtmClient
                .getChannelMemberCount([channelName])
                .then((res) => {
                    let count = res[channelName];
                    setMembersCount(count);
                })
                .catch((error) => error);
    }, 10000);

    /**
     *
     */
    async function leaveChannel() {
        await client?.leave().then(() => {
            let container = document.getElementById("live_video");
            container.textContent = "";
        });
    }

    function toggleGiftsList() {
        !giftState ? setGiftState(true) : setGiftState(false);
    }

    function toggleSuperSend() {
        !superSendState ? setSuperSendState(true) : setSuperSendState(false);
    }

    let config = {
        containerClass:'swiper-container swiper banner-slider',
        freeMode: false,
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

    const handleCallRequest = () => {
        !callRequest ? setCallRequest(true) : setCallRequest(false);
    }

    const handleGiftDisplay = () => {
        if(giftList) {
            return (
                <div className="fl-gift">
                    <div className="vam-live">
                        <div  className="vam-live">
                            <span className="avatar">
                            <Icon source={giftList?.userProfilePic} alt={giftList?.userName} title={giftList?.userName} />
                            </span>
                            <span className="username">{giftList?.userName}</span>
                        </div>
                        <div className="sent">sent</div>
                    </div>
                    <div className="gift-count"><span className="sub">X</span><span>{giftList?.giftComboCount}</span></div>
                    <div className="sticker"><div className="sticker-inner"><Icon source={giftList?.giftUrl} alt={giftList?.userName} title={giftList?.userName} /></div></div>
                </div>
            );
        }
    }

    const handleSuperSendDisplay = () => {
        if(superSendList) {
            return (
                <div className="ss-superfan-msg fl-gift">
                    <div className="sf-msg-img">
                        <div className="sf-img">
                            <Icon source={superSendList?.superSendUserProfilePic} width="40" alt="Superfan_USERNAME" title="Superfan_USERNAME"/> 12
                        </div>
                        <Icon source={Icons.superfan} className="superfan-mark"/>
                    </div>
                    <div className="sf-right-side">
                        <SubTitle className="sf-name">{superSendList?.superSendUserName}</SubTitle>
                        <p className="sf-text">{superSendList?.superSendUserComment}</p>
                    </div>
                </div>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentMessage.trim() === ''){
            setCurrentMessageError({errorMessage: 'Please enter a message.', error: true});
            setTimeout(setCurrentMessageError, 4000, {errorMessage: '', error: false});
        } else if(parseInt(coins) <= parseInt(superSendCoins)) {
            setToast({show: true, title: 'Error', message: 'Please recharge your wallet.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        } else {
            let payload = {
                SUPER_SEND : 'SUPER_SEND',
                superSendUserName: customerUsername,
                superSendUserComment: currentMessage,
                superSendUserProfilePic : customerAvatar,
                userUid : customerUUId,
                userTimeStamp : Date.now(),
            }
            toggleSuperSend();
            pubnub
                .publish({ channel: channels[1], message : payload })
                .then(() =>
                {setMessage(''), setCurrentMessage('')}).catch(error => {
                console.log(error);
            });
        }
    }

       return (
           <>
            <div className="ss-container">
                <div className="live_video video-stream" id="live_video"/>
                    <div className="ss-header">

                    <div className="top-row">
                    <div className="ss-staus">
                        <Icon source={profile?.photo?.thumb} /> Live
                    </div>
                    {/*<div className="ss-time">*/}
                    {/*    0:16*/}
                    {/*</div>*/}
                    <div className="ss-close" onClick={e => router.push('/' + profile?.slug)}>
                        X
                    </div>
                </div>

                    <div className="ss-viewers">
                    <AiFillEye fontSize={15} /> {' ' + membersCount}
                </div>
                </div>
                <div>
                </div>
                    <div className="ss-content">
                        {handleGiftDisplay()}
                        <div className="ss-call" onClick={e => handleCallRequest()}>
                    {/*<Icon source={Icons.call} width="40"/> 12*/}
                    {/*<span>VIDEO CALL</span>*/}
                </div>
                        <div className="ss-msg-area">
                            {handleSuperSendDisplay()}

                    {messages.map((message, index) => {
                        if(message?.userComment) {
                        return (
                                <div key={`message-${index}`} className="ss-msg">
                                    <div className="ssm-img">
                                        <Icon source={message?.userProfilePic} alt={message?.userName} title={message?.userName} />

                                    </div>
                                    <div className="ssm-right-side">
                                        <SubTitle className="ssm-name"> {message?.userName} </SubTitle>
                                        <p className="sf-text"> {message?.userComment}</p>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                        <div className="ss-chat-area">
                    <div className="ss-gift" onClick={() => toggleGiftsList()}>
                        <Icon source={Icons.gift}  />
                    </div>
                    <div className="ss-cmnt-box">
                        <textarea placeholder={ enableComments ? "Enter Comment" : "Comments Disabled" } value={message} onKeyPress={e => {
                            if (e.key !== 'Enter') return;
                            sendMessage(message);
                        }}
                                  onChange={e => setMessage(e.target.value)} disabled={!enableComments} />
                        <Button className="ss-post" onClick={e => {
                            e.preventDefault();
                            sendMessage(message);
                        }}>Post</Button>
                    </div>
                            <div className="ss-report" onClick={(e) => {
                                e.preventDefault();
                                unmute();
                            }}>
                                {getSpeakerState()}
                            </div>

                    {/*<div className="ss-like">*/}
                    {/*    <AiFillHeart fontSize={30} color={'#D71919FF'} />*/}
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
                                    <span className="close"  onClick={(e) => {
                                        e.preventDefault();
                                        toggleGiftsList();
                                    }}>X</span>
                                    <div>
                                        <span className="icon-bronze"><Icon source={Icons.bronze} title="bronze" /></span>
                                        <span>{selectedGift ? selectedGift?.coins * giftCount : 0}</span>
                                    </div>
                                    <span className="buy-coins" onClick={() => { router.push(Routes.recharge(profile?.slug));  leaveChannel()}}>Buy Coins</span>
                                    <span className="send-btn" onClick={() => sendGift()}>Send</span>
                                    <span>
                                        <select onChange={(e) => setGiftCount(e.target.value)} name="gift_count" value={giftCount}>
                                            <option value={1}>x1</option>
                                            <option value={2}>x2</option>
                                            <option value={3}>x3</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="ss-report">
                    {/*<div className="ss-reprt-btn">*/}
                    {/*    <span>i</span>*/}
                    {/*    Report*/}
                    {/*</div>*/}
                </div>
                    </div>
                { enableSuperSend ? (
                <span className="super-send-btn" onClick={() => toggleSuperSend()}>
                    <Icon source={Icons.superSend}  />
                </span>
                    ) : <></> }
                <div className="ss-overlap" style={{display: "none"}}>
                <h4>Introducing</h4>
                 <h3>
                    <img src="img/super-send.png" alt="" title="" />
                    Super Send
                </h3>

                <SubTitle>
                    <Icon source={Icons.superSend} alt="" title=""  />
                    Super Send</SubTitle>
                <ul>
                    <li>Now send Paid Comments and get noticed.</li>
                    <li>Get 100% acknowlegment from the artist.</li>
                    <li>Select the duration of the comment.</li>
                    <li>Skip the general comments queue.</li>
                </ul>
            </div>
                <div className="sfm-container" style={ superSendState  ? {display: "block", backgroundColor: theme?.secondary_color} : {backgroundColor: theme?.secondary_color, display: "none"}}>
                <div className="ss-superfan-msg">
                    <div className="sf-left-side">
                        <div className="sf-msg-img">
                            <div className="sf-img">
                                <Icon source={customerAvatar}  alt="Superfan_USERNAME" title="Superfan_USERNAME"  />
                            </div>
                            <Icon source={Icons.superfan} className="superfan-mark" />
                        </div>
                        <div className="fan-coin">{superSendCoins} <Icon source={Icons.token} width="30"/></div>
                    </div>

                    <div className="sf-right-side">
                        <span className="close"  onClick={(e) => {
                            e.preventDefault();
                            toggleSuperSend();
                        }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L11 11M1 11L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                        <SubTitle className="sf-name">{customerUsername}</SubTitle>
                        <textarea placeholder="Type your Super send comment here" className="sf-cmt-input" style={{backgroundColor: theme?.text_color}} maxLength={30} value={currentMessage} onChange={(e) => { setMessageCount(e.target.value.length), setCurrentMessage(e.target.value)}} />
                        {currentMessageError.error ? <span style={{color: theme?.text_color}}>{currentMessageError.errorMessage}</span>: <></>}
                    </div>
                </div>

                <div className="cmt-time-letter">
                    <div>
                        {/*<span className="icon-pin"></span> 20*/}
                    </div>
                    <div>
                        {messageCount}/30
                    </div>
                </div>

                {/*<div className="smf-progress-bar">
                    <div className="spb-passed"></div>
                    <div className="spb-passed"></div>
                    <div className="spb-passed"></div>
                    <div className="spb-current"></div>
                </div>*/}
                <Button className="btn btn-white" onClick={(e) => handleSubmit(e)}>
                    Send Message
                </Button>
            </div>
            </div>
            <div className={callRequest ? "deduct-panel open" : "deduct-panel"} id="deduct-panel">
            <figure className="live-celeb">
                <Icon source="/images/img4x4.jpg" alt="" title=""/>
            </figure>
                <h5>Request to be in Priya’s Live Broadcasting<br></br>
                    {/* <img src="img/fanory-token.png" width="17"/> 499 will be deducted from your account balance only if request is accepted</h5> */}
                    <Icon source={Icons.token} width="17"/> 499 will be deducted from your account balance only if request is accepted</h5>
                <p>Anyone can watch it, whoever is connected during Live.<br></br>
                    This will be 300 seconds video call, can be disconnected if misbehavior found during the call </p>

                <Button className="btn btn-primary wd-100 d-block">SEND REQUEST</Button>
                <Button className="btn btn-white wd-100 d-block" onClick={e => handleCallRequest()}>CANCEL</Button>

                <h6>By clicking send button you agree to <a href="#">Terms & Conditions</a> and <a href="#">Privacy policies</a>.</h6>
            </div>
               {toast?.show ? (
                   <Toast
                       icon={faCheckCircle}
                       position="bottom-right"
                       title={toast?.title}
                       description={toast?.message}
                   />
               ) : (
                   ""
               )}
           </>
   );
}
