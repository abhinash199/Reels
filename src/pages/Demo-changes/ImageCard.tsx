import React, { useRef, useState, useEffect } from "react";
import ImageFooter from "./ImageFooter";
import { debounce } from "lodash";
import styles from "../[creator]/Demo/demo.module.css";
function ImageCard({ url, IsOpen, setIsOpen }) {
 

  return (
    <>
    <div className={styles["videoCard"]}>
      <img
        className={styles["videoCard__player"]}
        src={url}
        style={{ opacity: IsOpen ? "0.2" : "1" }}
      /> 
    </div>
     <ImageFooter IsOpen={IsOpen} setIsOpen={setIsOpen} />
     </>
  );
}

export default ImageCard;
