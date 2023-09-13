import React from 'react';
import PixelFlexBox from '../pixel-flex-box/pixel-flex-box';

export interface PixelAudioPlayerProps {
  audioSrc: string;
}

const PixelAudioPlayer: React.FC<PixelAudioPlayerProps> = ({
  audioSrc = '',
  ...rest
}) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  return (
    <PixelFlexBox
      width='100%'
      justifyContent='flex-start'
      alignContent='center'
      alignItems='center'
      gap='10px'
      style={{
        borderRadius: '30px'
      }}
      {...rest}
    >
      <audio ref={audioRef} src={audioSrc || ''} controls>
        Your browser does not support the audio element.
      </audio>
    </PixelFlexBox>
  );
};

export default PixelAudioPlayer;
