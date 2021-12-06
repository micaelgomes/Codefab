import React, { useState, useEffect, RefObject, useRef } from 'react';
import Draggable from 'react-draggable';
import { FiPause, FiPlay } from 'react-icons/fi';

import * as S from './styled';

type VideoProps = {
  id: number;
  height: number;
  videoSrc: string;
  width: number;
  x: number;
  y: number;
  draggable: boolean;
  renderRef: RefObject<HTMLDivElement>;
};

const VideoAgent: React.FC<VideoProps> = ({
  id,
  videoSrc,
  height,
  width,
  x,
  y,
  draggable,
  renderRef,
}) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoState] = useState({
    videoSrc,
    x,
    y,
    width,
    height,
  });

  const playVideo = () => {
    if (play) {
      videoRef.current?.pause();
      setPlay(false);
    } else {
      videoRef.current?.play();
      setPlay(true);
    }
  };

  useEffect(() => {
    try {
      if (width <= 0 || height <= 0) {
        throw new Error('Video require props (width, height)');
      }

      if (videoSrc.length <= 0) {
        throw new Error('Video require source path');
      }
    } catch (err) {
      console.log(err);
    }
  }, [height, renderRef, videoSrc.length, width, x, y]);

  return (
    <>
      {videoState && (
        <>
          {draggable ? (
            <Draggable allowAnyClick={true} disabled={false} bounds="parent">
              <S.VideoContainer
                height={videoState.height}
                width={videoState.width}
                x={videoState.x}
                y={videoState.y}
              >
                <S.Video ref={videoRef} src={videoState.videoSrc} loop={play} />
                <S.ButtonPlay onClick={playVideo}>
                  {!play ? <FiPlay size={20} /> : <FiPause size={20} />}
                </S.ButtonPlay>
              </S.VideoContainer>
            </Draggable>
          ) : (
            <S.VideoContainer
              height={videoState.height}
              width={videoState.width}
              x={videoState.x}
              y={videoState.y}
            >
              <S.Video ref={videoRef} src={videoState.videoSrc} loop={play} />
              <S.ButtonPlay onClick={playVideo}>
                {!play ? <FiPlay size={20} /> : <FiPause size={20} />}
              </S.ButtonPlay>
            </S.VideoContainer>
          )}
        </>
      )}
    </>
  );
};

export default VideoAgent;
