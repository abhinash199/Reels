import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Toast.module.css';

function Toast({ icon, title, description, position }) {
    return (
      <div className={`${styles.notificationContainer} ${styles.bottomRight}`}>
        <div
          className={`${styles.notification} ${styles.toast} ${
            title === "Error" ? styles.danger : styles.success
          }`}
        >
          <button>X</button>
          <div className={styles.notificationImage}>
            <FontAwesomeIcon icon={icon} />
          </div>
          <div>
            <p className={styles.notificationTitle}>{title}</p>
            <p className={styles.notificationMessage}>{description}</p>
          </div>
        </div>
      </div>
    );
}

export default Toast;
