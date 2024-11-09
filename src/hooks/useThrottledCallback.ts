import { useCallback, useRef, useEffect } from 'react';

export function useThrottledCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall.current;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (timeSinceLastCall >= delay) {
      lastCall.current = now;
      callbackRef.current(...args);
    } else {
      timeoutRef.current = setTimeout(() => {
        lastCall.current = Date.now();
        callbackRef.current(...args);
      }, delay - timeSinceLastCall);
    }
  }, [delay]) as T;
}