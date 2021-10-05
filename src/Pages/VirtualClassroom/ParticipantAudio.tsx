import React, { useEffect, useRef } from 'react';
import { RemoteStream } from 'ion-sdk-js';

function ParticipantAudio({ stream }: { stream: RemoteStream }) {
  const ref = useRef<HTMLAudioElement>();
  useEffect(() => {
    ref.current!.srcObject = stream;
  }, [stream]);
  return (
    <div>
      <audio ref={ref as any} autoPlay></audio>
    </div>
  );
}

export default ParticipantAudio;
