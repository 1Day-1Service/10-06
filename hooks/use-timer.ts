import { useState, useEffect, useCallback, useRef } from 'react';

export function useTimer(initialTime: number, isActive: boolean, onComplete?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return { timeLeft, reset };
}

