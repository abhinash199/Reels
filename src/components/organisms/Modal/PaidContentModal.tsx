import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import {useModal} from "react-modal-hook";
import Icon from "../../atoms/Icon/Icon";
import {Icons} from "../../../constants/Icons";

export const  PaidContentModal = ({open, close, record}) => {

    const [isOpen, setIsOpen] = useState(open);

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

    useEffect(() => {
        if(isOpen) {
            openModal();
        }

    }, [isOpen])

    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
            <div className="modal">
                <div className="unlockPopup">
                    <div className="popup">
                        <div className="close" onClick={(e) => {closeModal()}}>X</div>
                        <h3>Unlock this image with xxx coins</h3>
                        <strong>Wallet Balance: <Icon source={Icons.bronze} title="bronze" /> 9999 coins</strong>
                        <button className="unlockBtn">Unlock</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), [record]);

    return (
        <></>
    )

}
