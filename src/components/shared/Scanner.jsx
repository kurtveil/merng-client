import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const Scanner = ({onScan}) => {
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    const videoElement = videoRef.current;
    codeReader.current.decodeFromVideoDevice(null, videoElement, (result, err) => {
      if (result) {
        onScan(result.text);
      // Stop all video tracks
      const stream = videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }

      videoElement.srcObject = null
      }
      if (err && !(err.name === 'NotFoundException')) {
        console.error(err);
      }
    });

    return () => {
      const stream = videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  }, []);


  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
    </div>
  );
};

export default Scanner;
