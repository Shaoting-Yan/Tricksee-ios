import React, {useCallback, useMemo, useEffect, useState, useRef} from "react";
export const useDeviceOrientation = () => {
    const [error, setError] = useState(null);
    const [orientation, setOrientation] = useState(null);
    const [motion, setMotion] = useState(null);
  
    const onDeviceOrientation = (event) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };
    const onDeviceMotion = (event) => {
      setMotion(event.acceleration);
    };
  
    const revokeAccessAsync = async () => {
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      setOrientation(null);
    };
  
    const requestAccessAsync = async () => {
      if (!DeviceOrientationEvent) {
        setError(new Error('Device orientation event is not supported by your browser'));
        return false;
      }
  
      if (
        DeviceOrientationEvent.requestPermission
        && typeof DeviceMotionEvent.requestPermission === 'function'
      ) {
        let permission;
        try {
          permission = await DeviceOrientationEvent.requestPermission();
        } catch (err) {
          setError(err);
          return false;
        }
        if (permission !== 'granted') {
          setError(new Error('Request to access the device orientation was rejected'));
          return false;
        }
      }
      window.addEventListener('deviceorientation', onDeviceOrientation);
      window.addEventListener('devicemotion', onDeviceMotion);
  
      return true;
    };
  
    const requestAccess = useCallback(requestAccessAsync, []);
    const revokeAccess = useCallback(revokeAccessAsync, []);
  
    useEffect(() => {
      return () => {
        revokeAccess();
      };
    }, [revokeAccess]);
  
    return {
      orientation,
      motion,
      error,
      requestAccess,
      revokeAccess,
    };
  };