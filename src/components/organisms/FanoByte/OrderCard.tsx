import React from "react";
import {useModal} from "react-modal-hook";
import Button from "@/components/atoms/Button/Button";
import ReactModal from "react-modal";
import VideoJS from "@/components/organisms/VideoJS";

export const OrderCard = ({greeting, theme}) => {

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "100%",
            padding: "0",
            height: "100%",
        },
    };

    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
            <div className="modal customModal" style={{backgroundColor: theme?.primary_color}}>
                <div>
                    <div className="modal-content">
                        <header style={{background: theme?.secondary_color}}>
                            <Button className="side-menu-btn" onClick={() => closeModal()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                                </svg>
                            </Button>
                            <h3 style={{color: theme?.primary_color}}>Order Details</h3>
                            <div className="user-btn"></div>
                        </header>

                        <div className="modalContent">
                            <div className="reqMsg" style={{color: theme?.text_color}}>Your request will be submitted in 7-8 days. You can check your booking under FanoByte section on the site.</div>
                            <div className="oid" style={{color: theme?.text_color}}>ORDER ID - {greeting?._id}</div>
                            <div className="timestamp">Date : {greeting?.schedule_at}</div>
                            <div className="message" style={{color: theme?.text_color}}>Message: {greeting?.message}</div>

                            <div className="statusBox success">
                                <div className="icon">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.6 11.8L6.45 9.65C6.26667 9.46667 6.03333 9.375 5.75 9.375C5.46667 9.375 5.23333 9.46667 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.1 14.1 8.33333 14.2 8.6 14.2C8.86667 14.2 9.1 14.1 9.3 13.9L14.95 8.25C15.1333 8.06667 15.225 7.83333 15.225 7.55C15.225 7.26667 15.1333 7.03333 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#00880E"/>
                                    </svg>

                                </div>
                                <div className="message">Payment successful!</div>
                                <div className="timestamp">{greeting?.created_at}</div>
                            </div>

                            {greeting?.status === 'pending' ? (

                            <div className="statusBox pending">
                                <div className="icon">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#FF9901" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11 5V11L7 13" stroke="#FF9901" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className="message">Greeting is pending!</div>
                                <p className="messageLong">Your request has been submitted and sent for moderation. You will receive the confirmation of your video on the registered email in the next 7-8 working days. Please stay tuned!</p>
                                <div className="timestamp">{greeting?.created_at}</div>
                            </div>
                                ) : <></> }


                            {greeting?.status === 'declined' ? (
                            <div className="statusBox declined">
                                <div className="icon">
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.4554 0.331665C17.6483 0.331665 22.6683 5.35167 22.6683 11.5445C22.6683 17.7374 17.6483 22.7574 11.4554 22.7574C5.26256 22.7574 0.242554 17.7374 0.242554 11.5445C0.242554 5.35167 5.26256 0.331665 11.4554 0.331665ZM11.4554 2.57424C9.07635 2.57424 6.79472 3.51932 5.11247 5.20158C3.43021 6.88384 2.48513 9.16547 2.48513 11.5445C2.48513 13.9236 3.43021 16.2052 5.11247 17.8875C6.79472 19.5698 9.07635 20.5148 11.4554 20.5148C13.8345 20.5148 16.1161 19.5698 17.7984 17.8875C19.4806 16.2052 20.4257 13.9236 20.4257 11.5445C20.4257 9.16547 19.4806 6.88384 17.7984 5.20158C16.1161 3.51932 13.8345 2.57424 11.4554 2.57424ZM9.07717 7.57966L11.4554 9.95904L13.8337 7.57966C13.9379 7.47549 14.0615 7.39285 14.1976 7.33647C14.3338 7.28008 14.4797 7.25107 14.627 7.25107C14.7743 7.25107 14.9202 7.28008 15.0563 7.33647C15.1924 7.39285 15.3161 7.47549 15.4203 7.57966C15.5245 7.68384 15.6071 7.80752 15.6635 7.94364C15.7199 8.07976 15.7489 8.22564 15.7489 8.37298C15.7489 8.52031 15.7199 8.6662 15.6635 8.80231C15.6071 8.93843 15.5245 9.06211 15.4203 9.16629L13.0409 11.5434L15.4203 13.9228C15.6307 14.1332 15.7489 14.4185 15.7489 14.7161C15.7489 15.0136 15.6307 15.299 15.4203 15.5094C15.2099 15.7198 14.9245 15.838 14.627 15.838C14.3294 15.838 14.0441 15.7198 13.8337 15.5094L11.4554 13.13L9.07717 15.5094C8.86678 15.7198 8.58141 15.838 8.28386 15.838C7.98632 15.838 7.70095 15.7198 7.49055 15.5094C7.28015 15.299 7.16195 15.0136 7.16195 14.7161C7.16195 14.4185 7.28015 14.1332 7.49055 13.9228L9.86993 11.5445L7.49168 9.16629C7.28128 8.95604 7.16302 8.67082 7.16291 8.37337C7.16281 8.07593 7.28086 7.79063 7.49111 7.58023C7.70137 7.36983 7.98658 7.25157 8.28403 7.25146C8.58147 7.25136 8.86678 7.36941 9.07717 7.57966Z" fill="#FF0000"/>
                                    </svg>
                                </div>
                                <div className="message">Greeting is declined!</div>
                                <p className="messageLong">Your request has been declined. You'll receive refund in next 7-8 working days. Please stay tuned!</p>
                                <div className="timestamp">{greeting?.created_at}</div>
                            </div>
                            ) : <></> }
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), []);

    const [openPlayerModal, closePlayerModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
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
                                src: greeting?.media?.url,
                            }]
                        }}  />
                    </div>
                    <div className="modal-footer">

                    </div>
                </div>
            </div>
        </ReactModal>
    ), []);

    const handleClick = () => {
        if(greeting?.status !== 'completed') {
            openModal();
        } else {
            openPlayerModal()
        }
    }

    const handleImage = () => {
        if(greeting?.status !== 'completed') {
            return (
                <img src="//placehold.it/250x250?text=" />
            )
        } else {
            return (
                <img src={greeting?.media?.thumb} />
            )
        }
    }

    return (
        <div className="ordersWrap" style={{color: theme?.text_color}} onClick={() => handleClick()}>
            <div className="orderItem">
                <div className="video">
                    <div className="icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.65 13.75L13.525 10.625C13.7583 10.475 13.875 10.2667 13.875 10C13.875 9.73333 13.7583 9.525 13.525 9.375L8.65 6.25C8.4 6.08333 8.14567 6.07067 7.887 6.212C7.62833 6.35333 7.49933 6.57433 7.5 6.875V13.125C7.5 13.425 7.62933 13.646 7.888 13.788C8.14667 13.93 8.40067 13.9173 8.65 13.75ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20Z" fill="white"/>
                        </svg>
                    </div>
                    {handleImage()}
                </div>
                <div className="orderDetails">
                    <div className="oid">ORDER ID - {greeting?._id}</div>
                    <div className="message">{greeting?.message}</div>
                    {greeting?.status === 'pending' ? <div className="status pending">{greeting?.status}</div> : <></>}
                    {greeting?.status === 'declined' ? <div className="status failed">{greeting?.status}</div> : <></>}
                    {greeting?.status === 'completed' ? <div className="status success">{greeting?.status}</div> : <></>}
                    <div className="timestamp">{greeting?.created_at}</div>
                </div>
            </div>
        </div>
        // <h1 style={{color: theme?.primary_color}} onClick={(e) => openModal()}>Comment</h1>
    );
}
