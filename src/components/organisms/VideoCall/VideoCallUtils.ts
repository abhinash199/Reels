import AgoraRTC from "agora-rtc-sdk-ng";
interface AgoraOptions {
  appId: string;
  channel: string;
  token: string;
  uid: string;
}
const StartVideoCall = (options: AgoraOptions, channelParameters, agoraEngine) => {

  // if()
  // Create an instance of the Agora Engine
 // const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const remotePlayerContainer = document.getElementById(
    "remote-video-stream"
  );

  const localPlayerContainer = document.getElementById(
    "local-video-stream"
  );

  const JoinVideoCallLocalUser = async () => {
    await agoraEngine.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    // Create a local audio track from the audio sampled by a microphone.
    channelParameters.localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks in the channel.
    await agoraEngine.publish([
      channelParameters?.localAudioTrack,
      channelParameters?.localVideoTrack,
    ]);
    // Play the local video track.
    channelParameters?.localVideoTrack?.play(localPlayerContainer);
  };

  const joinRemoteUSer = async () => {
    agoraEngine.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      // Subscribe and play the remote video in the container If the remote user publishes a video track.
      if (mediaType == "video") {
        // Retrieve the remote video track.
        channelParameters.remoteVideoTrack = user.videoTrack;
        // Retrieve the remote audio track.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Save the remote user id for reuse.
        channelParameters.remoteUid = user.uid.toString();
        // Specify the ID of the DIV container. You can use the uid of the remote user.
        channelParameters.remoteUid = user.uid.toString();
        channelParameters.remoteVideoTrack.play(remotePlayerContainer);
      }
      // Subscribe and play the remote audio track If the remote user publishes the audio track only.
      if (mediaType == "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        channelParameters.remoteAudioTrack.play();
      }
      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
      });
    });
  };

  if (localPlayerContainer) {
    console.log("localPlayerContainer", localPlayerContainer);
    JoinVideoCallLocalUser();
  }
  if (remotePlayerContainer) {
    console.log("remotePlayerContainer", remotePlayerContainer);
    joinRemoteUSer();
  }
};

export default StartVideoCall;
