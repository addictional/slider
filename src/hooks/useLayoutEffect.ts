import { useLayoutEffect as useReactLayoutEffect } from 'react';

/**
 * A safe version of useLayoutEffect that falls back to useEffect on server side
 */
const useLayoutEffect =
  typeof window !== 'undefined' && window.document && window.document.createElement
    ? useReactLayoutEffect
    : useReactLayoutEffect; // Keep same behavior for consistency

export default useLayoutEffect;
