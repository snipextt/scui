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
import { useToggleAudio, useToggleCamera, useToggleScreenshare } from './hooks';
// import { useLocation } from 'react-router';

const rootStyles: Partial<IStackItemStyles> = {
  root: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
};

const meetingControlsContainerStyles: Partial<IStackItemStyles> = {
  root: {
    position: 'absolute',
    bottom: '8%',
    justifyContent: 'center',
    width: '100%',
    zIndex: 10,
  },
};

const meetingControlsStyles: Partial<IStackItemStyles> = {
  root: {
    width: '25%',
    background: '#fff',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-around',
  },
};

const iconClass = mergeStyles({
  fontSize: 20,
  height: 20,
  width: 20,
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

const VirtualClassroom: React.FC = () => {
  // const classId = new URLSearchParams(useLocation().search).get('id');
  const leaveClassTTID = useId('tt');
  const DefenClassTTID = useId('tt');
  const MuteClassTTID = useId('tt');
  const ScreenShareTTID = useId('tt');
  const CameraShareTTID = useId('tt');

  const videoRef = useRef<HTMLVideoElement>();
  const [screenShareStreamId, setScreenShareStreamId] = useState('');
  const [audioShareStreamId, setAudioShareStreamId] = useState('');
  const [cameraShareStreamId, setCameraShareStreamId] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [userMediaStream] = useState<MediaStream>(new MediaStream());

  const toggleShareScreen = useToggleScreenshare(
    userMediaStream,
    screenShareStreamId,
    setScreenShareStreamId
  );
  const toggleAudio = useToggleAudio(
    userMediaStream,
    audioShareStreamId,
    setAudioShareStreamId
  );
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
    videoRef.current!.srcObject = userMediaStream;
  }, [userMediaStream]);

  return (
    <>
      <Stack styles={rootStyles}>
        <Stack styles={meetingControlsContainerStyles} horizontal>
          <Stack styles={meetingControlsStyles} horizontal>
            <TooltipHost
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
            </TooltipHost>

            <TooltipHost
              content="Toggle Microphone"
              id={MuteClassTTID}
              calloutProps={calloutProps}
              styles={hostStyles}
            >
              <Stack
                horizontal
                style={{
                  backgroundColor: audioShareStreamId ? 'red' : '',
                }}
                styles={controlButtonStyles}
                onClick={() => toggleAudio()}
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
                  backgroundColor: screenShareStreamId ? 'red' : '',
                }}
                onClick={() => toggleShareScreen()}
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
        </Stack>
      </Stack>
    </>
  );
};

export default VirtualClassroom;
