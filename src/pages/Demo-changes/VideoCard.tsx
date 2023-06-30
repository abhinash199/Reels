import React, { useRef, useState, useEffect } from "react";
import ImageFooter from "./ImageFooter";
import { debounce } from "lodash";
import styles from "../[creator]/Demo/demo.module.css";
function VideoCard({ url, IsOpen, setIsOpen }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (isVideoPlaying) {
      //stop
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      //play
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };


  
  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };

    let handlePlay = (entries, observer) => {
     
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log( videoRef.current,"if");
          videoRef.current.muted = false;
          videoRef.current.play();
         
        } else {
          console.log("else");
          
          videoRef.current.pause();
        }
      });
    };

    let observer = new IntersectionObserver(handlePlay, options);

    observer.observe(videoRef.current);
  });

  return (
    <>
    <div className={styles["videoCard"]}>
      <video
        ref={videoRef}
        onClick={onVideoPress}
        className={styles["videoCard__player"]}
        src={url}
        autoPlay={true}
            loop
        muted ={false}
        style={{ opacity: IsOpen ? "0.2" : "1" }}
      /> 
    </div>
     <ImageFooter IsOpen={IsOpen} setIsOpen={setIsOpen} />
     </>
  );
}

export default VideoCard;
