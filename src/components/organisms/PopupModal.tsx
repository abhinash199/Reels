import React from "react";
import ReactModal from "react-modal";
import Icon from "../../../components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import Routes from "../../constants/Routes";
import { useRouter } from "next/router";
import { useArtist, useWallet } from "@/context/index";
import styles from "./PopupModal.module.css";

export const PopupModal = ({ closeModal, isOpen }) => {
  const { id, profile, theme } = useArtist();
  const router = useRouter();

  const modalStyles = {
    content: {
      top: "auto",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "90%",
      padding: "0",
      border: "none",
      transform: "translate(-50%, 0%)",
    },
  };

  return (
    <ReactModal isOpen={isOpen} style={modalStyles} ariaHideApp={true}>
      <div className={`${styles["popup-modal"]} ${isOpen ? "open" : ""}`}>
        <div className={styles["popup-content"]}>
          <div className={styles["close-button"]} onClick={closeModal}>
            X
          </div>
          <h1>One to one video call</h1>
          <text>Create Video-Call Room for Artist to Join on spot.</text>
          <h1>Duration of call</h1>
          <h3 style={{ color: "red" }}>Don't have enough coins?</h3>
          <button className={styles["pay-button"]}>
            Pay
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
