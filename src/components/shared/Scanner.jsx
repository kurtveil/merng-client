import React, { useEffect, useCallback, useState } from 'react';
import Quagga from '@ericblade/quagga2';

// interface ScannerProps {
//   onDetected: (result: any) => void;
//   stopScanner: boolean;
//   closeModal: (result: any) => void;
// }

const Scanner = ({ onDetected, stopScanner, closeModal }) => {
  const [barcodeDetected, setBarcodeDetected] = useState('');
  const handleDetected = useCallback(
    (result) => {
      onDetected(result);
      setBarcodeDetected(result);
    },
    [onDetected]
  );
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['ean_reader'], // You can add more readers here
        },
        locate: true,
      }, function (err) {
        if (err) {
          console.error('Error initializing Quagga:', err);
          return;
        }
        Quagga.start();
      });
    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      // Quagga.offProcessed(handleDetected)
      Quagga.stop(); // Stop scanning when the component unmounts
    };
  }, [handleDetected, stopScanner]);

  useEffect(() => {
    if (barcodeDetected) {
      Quagga.stop(); // Detener la cámara después de la detección del código
    }
  }, [barcodeDetected]);

  const handleCancel = () => {
    Quagga.offDetected(handleDetected);
    // Quagga.stop(); 
    setTimeout(() => {
      closeModal(true);
    }, 1000)
  }
  return (
    <>
      <div
        id="interactive"
        className="viewport"
        style={{ width: 'auto', height: 'auto', margin: '0 auto' }}
      />

      <div className="sm:flex sm:flex-row-reverse ">
        <button className="inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
          type="button" onClick={handleCancel}>Cancelar</button>
      
      </div>
    </>



  );
};

export default Scanner;
