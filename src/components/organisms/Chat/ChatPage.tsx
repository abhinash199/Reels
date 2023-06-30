import React, {useEffect, useRef, useState} from "react";
import {Chat} from '@/components/molecules/DirectLine'
import {createRoom, sendMessage, chatActions} from "@/containers/directline/actions/room";
import {useArtist, useAuth, useWallet} from "@/context/index";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import Toast from "@/components/atoms/Toast";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

export const DirectLinePage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    let username =  router?.query?.creator;
    const [currentMessage, setCurrentMessage] =  React.useState('');
    const [messageCount, setMessageCount] = useState(0);
    const [roomID, setRoomID] = useState('');
    const [toast, setToast] = useState({show: false, title: '', message: ''});

    const chats = useSelector(
        (state: ApplicationState) => state.messages
    );

    const [element, setElement] = React.useState(null);

    const { id, profile, theme, directLinePrice } = useArtist();
    const { loggedIn } = useAuth();
    const { coins } = useWallet();

    const messageEl  = useRef(null);

    useEffect(() => {
        if (id && loggedIn) {
            createRoom(id).then(response => {
                if(response?.directline_room_id) {
                    setRoomID(response?.directline_room_id);
                }
            }
            ).catch(err => '');
        }
    }, [id]);

    useEffect(() => {
            const currentElement = element;
            const currentObserver = new IntersectionObserver(
                (entries) => {
                    const first = entries[0];
                    if (first.isIntersecting) {
                        if(roomID) {
                            dispatch(chatActions.fetchMessages(username, roomID));
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
    }, [roomID, element]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentMessage.trim() === '') {
            setToast({show: true, title: 'Error', message: 'Please enter a message.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        } else if(parseInt(coins) <= parseInt(directLinePrice)) {
            setToast({show: true, title: 'Error', message: 'Please recharge you wallet.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        } else {
            if(roomID && currentMessage) {
                let payload = {
                    message : currentMessage,
                    type : 'text',
                    directline_room_id: roomID,
                    message_by: 'customer',
                    artist_id: id
                };

                dispatch(sendMessage(username, id, payload));
                setCurrentMessage('');
            }
            setTimeout(() => messageEl.current.scrollIntoView({ inline: 'center', behavior: 'smooth' }), 777);
        }
    }

    return (
        <>
            <Chat messageEl={messageEl} setElement={setElement} messageCount={messageCount} setMessageCount={setMessageCount} theme={theme} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} handleSubmit={handleSubmit} messages={chats} username={username} profile={profile} id={id} roomID={roomID} directLinePrice={directLinePrice} setToast={setToast} coins={coins} />
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



