import {
  IStackItemStyles,
  DefaultPalette,
  Stack,
  FontIcon,
  mergeStyles,
  IStackStyles,
  ITooltipHostStyles,
  TooltipHost,
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useToggleCamera } from './hooks';
import { Client, LocalStream, RemoteStream } from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import ParticipantAudio from './ParticipantAudio';
import { useLocation } from 'react-router';
import { io } from 'socket.io-client';

const rootStyles: Partial<IStackItemStyles> = {
  root: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    position: 'relative',
    minHeight: '100vh',
  },
};

const meetingControlsContainerStyles: Partial<IStackItemStyles> = {
  root: {
    position: 'absolute',
    bottom: '6%',
    justifyContent: 'center',
    width: '100%',
    zIndex: 10,
  },
};

const _meetingControlsStyles: Partial<IStackItemStyles> = {
  root: {
    width: '13%',
    background: '#fff',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'space-around',
    boxShadow:
      'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  },
};

const meetingControlsStyles = mergeStyles(_meetingControlsStyles.root, {
  '@media(max-width: 1400px)': {
    width: '22%',
  },
  '@media(max-width: 890px)': {
    width: '32%',
  },
  '@media(max-width: 650px)': {
    width: '40%',
  },
});

const iconClass = mergeStyles({
  fontSize: 15,
  height: 15,
  width: 15,
  color: 'white',
});

const controlButtonStyles: Partial<IStackStyles> = {
  root: {
    width: 50,
    height: 50,
    background: DefaultPalette.themePrimary,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};

const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};

let remoteStreams: any = {};

const VirtualClassroom: React.FC = () => {
  const location = useLocation();
  const leaveClassTTID = useId('tt');
  const DefenClassTTID = useId('tt');
  const MuteClassTTID = useId('tt');
  const ScreenShareTTID = useId('tt');
  const CameraShareTTID = useId('tt');

  const videoRef = useRef<HTMLVideoElement>();
  const [screenStream, setScreenStream] = useState<null | LocalStream>(null);
  const [screenAudio, setAudioStream] = useState<null | LocalStream>(null);
  const [cameraShareStreamId, setCameraShareStreamId] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [userMediaStream] = useState<MediaStream>(new MediaStream());
  const [, setSignal] = useState<IonSFUJSONRPCSignal | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [remoteAudioStreams, setRemoteAudioStreams] = useState<
    Array<RemoteStream>
  >([]);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const ToggleCamera = useToggleCamera(
    userMediaStream,
    cameraShareStreamId,
    setCameraShareStreamId
  );

  const toggleDefen = (toggle: boolean) => {
    videoRef.current!.muted = toggle;
    setIsMuted(toggle);
  };

  useEffect(() => {
    const state: any = location.state;
    console.log(state);
    if (!state || !state.subject || !state.subjectData) {
      // redirect back
    }
    const socket = io('/classroom', {
      auth: {
        token: sessionStorage.getItem('authToken'),
      },
    });
    socket.on('connect_error', (err) => {
      console.log(err.message); // prints the message associated with the error
    });
    socket.on('error', console.log);
    socket.emit('join', state.subjectData.code);
    socket.on('message', console.log);
    socket.on('joined', (sessionID: any) => {
      socket.send('hello');
      let signal = new IonSFUJSONRPCSignal('wss://treaclecake.ninja/ws');
      signal.onerror = console.error;
      let client = new Client(signal);
      setSignal(signal);
      setClient(client);
      signal.onopen = () => {
        client.join('classroom', sessionID).then(() => {
          console.log('Joined room');
        });
      };
      client.ontrack = (track: MediaStreamTrack, stream: RemoteStream) => {
        remoteStreams[stream.id] = stream;
        if (track.kind === 'video') {
          stream.preferLayer('high');
          setIsVideoActive(true);
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
          (stream as any).oninactive = () => {
            videoRef.current!.srcObject = null;
            setIsVideoActive(false);
          };
        } else {
          (stream as any).oninactive = () => {
            // to implment
          };
          setRemoteAudioStreams((r) => [...r, stream]);
        }
      };
      signal.onerror = alert;
    });
    // document
    //   .querySelector('#root > div')!
    //   .requestFullscreen()
    //   .catch(console.error);
  }, [userMediaStream, location.state]);

  return (
    <>
      <Stack styles={rootStyles}>
        <Stack styles={meetingControlsContainerStyles} horizontal>
          <Stack className={meetingControlsStyles} horizontal>
            {/* <TooltipHost
              content="Leave Classroom"
              id={leaveClassTTID}
              calloutProps={calloutProps}
              styles={hostStyles}
            >
              <Stack horizontal styles={controlButtonStyles}>
                <FontIcon
                  aria-label="Leave Class"
                  iconName="CircleStop"
                  className={iconClass}
                />
              </Stack>
            </TooltipHost>

            <TooltipHost
              content="Toggle Defen"
              id={DefenClassTTID}
              calloutProps={calloutProps}
              styles={hostStyles}
            >
              <Stack
                horizontal
                styles={controlButtonStyles}
                style={{
                  backgroundColor: isMuted ? 'red' : '',
                }}
                onClick={() => toggleDefen(!isMuted)}
              >
                <FontIcon
                  aria-label="Defen"
                  iconName="Volume3"
                  className={iconClass}
                />
              </Stack>
            </TooltipHost> */}

            <TooltipHost
              content="Toggle Microphone"
              id={MuteClassTTID}
              calloutProps={calloutProps}
              styles={hostStyles}
            >
              <Stack
                horizontal
                style={{
                  backgroundColor: screenAudio ? 'red' : '',
                }}
                styles={controlButtonStyles}
                onClick={() => {
                  if (!screenAudio)
                    LocalStream.getUserMedia({
                      video: false,
                      audio: true,
                      codec: 'vp8',
                      resolution: 'hd',
                    }).then((local) => {
                      client!.publish(local);
                      (local as any).oninactive = () => {
                        local.getTracks().forEach((track) => track.stop());
                        local.unpublish();
                        setAudioStream(null);
                      };
                      setAudioStream(local);
                    });
                  else {
                    screenAudio!.getTracks().forEach((t) => t.stop());
                    screenAudio!.unpublish();
                    setAudioStream(null);
                  }
                }}
              >
                <FontIcon
                  aria-label="Microphone"
                  iconName="Microphone"
                  className={iconClass}
                />
              </Stack>
            </TooltipHost>

            <TooltipHost
              content="Toggle Screenshare"
              id={ScreenShareTTID}
              calloutProps={calloutProps}
              styles={hostStyles}
            >
              <Stack
                horizontal
                styles={controlButtonStyles}
                style={{
                  backgroundColor: screenStream ? 'red' : '',
                }}
                onClick={() => {
                  if (isVideoActive) return;
                  if (!screenStream)
                    LocalStream.getDisplayMedia({
                      audio: true,
                      video: true,
                      codec: 'vp8',
                      resolution: 'fhd',
                    }).then((local) => {
                      client!.publish(local);
                      (local as any).oninactive = () => {
                        local.getTracks().forEach((track) => track.stop());
                        local.unpublish();
                        setIsVideoActive(false);
                      };
                      setScreenStream(local);
                    });
                  else {
                    screenStream.getTracks().forEach((track) => track.stop());
                    screenStream.unpublish();
                    setScreenStream(null);
                  }
                }}
              >
                <FontIcon
                  aria-label="Screen Share"
                  iconName="ScreenCast"
                  className={iconClass}
                />
              </Stack>
            </TooltipHost>

            <TooltipHost
              content="Toggle Camera"
              id={CameraShareTTID}
              calloutProps={calloutProps}
              styles={hostStyles}
            >
              <Stack
                horizontal
                styles={controlButtonStyles}
                style={{
                  backgroundColor: cameraShareStreamId ? 'red' : '',
                }}
                onClick={() => ToggleCamera()}
              >
                <FontIcon
                  aria-label="Screen Camera"
                  iconName="Camera"
                  className={iconClass}
                />
              </Stack>
            </TooltipHost>
          </Stack>
        </Stack>
        <Stack
          styles={{
            root: {
              width: '100%',
              height: '100%',
            },
          }}
        >
          <video
            style={{
              maxHeight: '100vh',
            }}
            autoPlay
            ref={videoRef as any}
          ></video>
          {remoteAudioStreams?.map((stream) => (
            <ParticipantAudio stream={stream} key={stream.id} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default VirtualClassroom;
