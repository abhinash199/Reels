import React, {useEffect, useRef, useState} from "react";
import {CommentCard} from '@/components/organisms/Comment/CommentCard'
import {commentActions, replyOnComment, saveComment} from "@/containers/comments/actions";
import {useArtist, useAuth, useWallet} from "@/context/index";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import {Helper} from "@/partials/Helper";
import Toast from "@/components/atoms/Toast";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

interface CommentPageProps {
    reply: boolean;
  }

export const CommentPage: React.FC<CommentPageProps> = ({reply}) => {

    const dispatch = useDispatch();
    const router = useRouter();
    let username =  router?.query?.creator;
    let contentId =  router?.query?.id;
    const [currentMessage, setCurrentMessage] =  React.useState('');
    const [messageCount, setMessageCount] = useState(0);

    const [user, setUser] = useState({});
    const [toast, setToast] = useState({show: false, title: '', message: ''});

    const comments = useSelector(
        (state: ApplicationState) => state.comments
    );

    const [element, setElement] = React.useState(null);

    const { id, profile, theme } = useArtist();
    const { loggedIn } = useAuth();
    const { coins } =  useWallet();
    const messageEl  = useRef(null);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    if(contentId && id) {
                        dispatch(commentActions.fetchComments(username, contentId, id));
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
    }, [contentId, id, element]);

    const fetchUser = async () => {
        return await Helper.decode(Helper.userToken());
    }

    useEffect(() => {
        fetchUser().then(res => {
            setUser({avatar : res?.avatar})
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentMessage.trim() === ''){
            setToast({show: true, title: 'Error', message: 'Please enter a message.'});
            setTimeout(setToast, 2000, {show: false, title: '', message: ''});
        } else {
            if(contentId && currentMessage) {
                let payload = {
                    comment : currentMessage,
                    content_id : contentId,
                    type: 'text',
                };
                let replyPayload ={
                    comment : currentMessage,
                    content_id : contentId,
                    parent_id:'83984390092w',
                    type: 'text',
                }
                {reply? dispatch(replyOnComment(username, id, replyPayload, user)) :dispatch(saveComment(username, id, payload, user))}
                setCurrentMessage('');
            }
            setTimeout(() => messageEl.current.scrollIntoView({ inline: 'center', behavior: 'smooth' }), 777);
        }
    }

    return (
        <>
            <CommentCard messageEl={messageEl} setElement={setElement} messageCount={messageCount} setMessageCount={setMessageCount} theme={theme} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} handleSubmit={handleSubmit} comments={comments} username={username} profile={profile} id={id} contentId={contentId} user={user} coins={coins} setToast={setToast} reply={reply} />
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





