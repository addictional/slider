import { useCallback, useRef } from 'react';

/**
 * A hook that returns a memoized callback that won't change between renders.
 * This is useful for event handlers to prevent unnecessary re-renders.
 */
function useEvent<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback);
  callbackRef.current = callback;

  return useCallback((...args: Parameters<T>) => callbackRef.current(...args), []) as T;
}

export default useEvent;
