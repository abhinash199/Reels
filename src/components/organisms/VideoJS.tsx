import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// export const VideoJS = (props) => {
//     const videoRef = React.useRef(null);
//     const playerRef = React.useRef(null);
//     const {options, onReady} = props;

//     React.useEffect(() => {

//         // Make sure Video.js player is only initialized once
//         if (!playerRef.current) {
//             // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
//             const videoElement = document.createElement("video-js");

//             videoElement.classList.add('vjs-big-play-centered');
//             videoRef.current.appendChild(videoElement);

//             const player = playerRef.current = videojs(videoElement, options, () => {
//                 videojs.log('player is ready');
//                 onReady && onReady(player);
//             });

//             // You could update an existing player in the `else` block here
//             // on prop change, for example:
//         } else {
//             const player = playerRef.current;

//             player.autoplay(options.autoplay);
//             player.src(options.sources);
//         }
//     }, [options, videoRef]);

//     // Dispose the Video.js player when the functional component unmounts
//     React.useEffect(() => {
//         const player = playerRef.current;

//         return () => {
//             if (player && !player.isDisposed()) {
//                 player.dispose();
//                 playerRef.current = null;
//             }
//         };
//     }, [playerRef]);

//     return (
//         <div data-vjs-player ref={videoRef}></div>
//     );
// }

// export default VideoJS;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

 export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;
  const [isPaused, setIsPaused] = React.useState(true);
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('video-js');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      player.on('play', () => {
        setIsPaused(false);
      });

      player.on('pause', () => {
        setIsPaused(true);
      });

      player.on('userinactive', () => {
        setShowButton(false);
      });

      player.on('useractive', () => {
        setShowButton(true);
      });

    //   player.on('tap', () => {
    //     if (isPaused) {
    //       player.play();
    //     } else {
    //       player.pause();
    //     }
    //   });
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const handleTogglePlayback = () => {
    const player = playerRef.current;

    if (player) {
      if (isPaused) {
        player.play();
      } else {
        player.pause();
      }
    }
  };


  return (
    <div style={{ position: 'relative' }}>
      <div data-vjs-player ref={videoRef}></div>
      {showButton && (
        <div className="play-pause-button">
          <button onClick={handleTogglePlayback}>
            {isPaused ? (
              <FontAwesomeIcon icon={faPlay} />
            ) : (
              <FontAwesomeIcon icon={faPause} />
            )}
          </button>
        </div>
      )}
      
      <style jsx>{`.play-pause-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
        }

        .play-pause-button button {
          border: none;
          background: none;
          font-size: 36px;
          color: #fff;
          cursor: pointer;
          outline: none;
          transition: opacity 0.3s;
        }
          
        .play-pause-button button:hover {
            opacity: 0.8;
          }
  
          .play-pause-button button:focus {
            outline: none;
          }
  
          .play-pause-button button svg {
            vertical-align: middle;
          }
  
          .play-pause-button button:not(:last-child) {
            margin-right: 10px;
          }
          .play-pause-button button.resume {
            font-size: 24px;
          }
  
          .play-pause-button button.resume::before {
            content: 'Resume';
            display: inline-block;
            margin-right: 5px;
          }
  
          .play-pause-button button.pause {
            font-size: 24px;
          }
          
          .play-pause-button button.pause::before {
            content: 'Pause';
            display: inline-block;
            margin-right: 5px;
          }
          
          .play-pause-button .button-text {
            display: inline-block;
            margin-right: 5px;
          }
      `}</style>
    </div>
  );
};

export default VideoJS;
