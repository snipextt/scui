const useToggleScreenshare = (
  userMedia: MediaStream,
  screenShareStreamId: string,
  setScreenShareStreamId: React.Dispatch<React.SetStateAction<string>>
) => {
  return async () => {
    if (!screenShareStreamId) {
      // @ts-ignore
      const media: MediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      userMedia.addTrack(media.getTracks()[0]);
      setScreenShareStreamId(media.getTracks()[0].id);
    } else {
      userMedia.getTrackById(screenShareStreamId)!.stop();
      setScreenShareStreamId('');
      userMedia.removeTrack(userMedia.getTrackById(screenShareStreamId)!);
    }
  };
};

const useToggleCamera = (
  userMedia: MediaStream,
  cameraStreamId: string,
  setCameraStreamId: React.Dispatch<React.SetStateAction<string>>
) => {
  return async () => {
    if (!cameraStreamId) {
      const media: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      userMedia.addTrack(media.getTracks()[0]);
      setCameraStreamId(media.getTracks()[0].id);
    } else {
      userMedia.getTrackById(cameraStreamId)!.stop();
      setCameraStreamId('');
      userMedia.removeTrack(userMedia.getTrackById(cameraStreamId)!);
    }
  };
};

const useToggleAudio = (
  userMedia: MediaStream,
  audioStreamId: string,
  setAudioStreamId: React.Dispatch<React.SetStateAction<string>>
) => {
  return async () => {
    if (!audioStreamId) {
      const media: MediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      userMedia.addTrack(media.getTracks()[0]);
      setAudioStreamId(media.getTracks()[0].id);
    } else {
      userMedia.getTrackById(audioStreamId)!.stop();
      setAudioStreamId('');
      userMedia.removeTrack(userMedia.getTrackById(audioStreamId)!);
    }
  };
};

export { useToggleScreenshare, useToggleCamera, useToggleAudio };
