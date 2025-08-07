import { useCallback, useRef, useState } from 'react';

export interface MergedStateConfig<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, prevValue: T) => void;
}

/**
 * A hook that merges controlled and uncontrolled state
 */
function useMergedState<T, R = T>(
  defaultStateValue: T | (() => T),
  option?: MergedStateConfig<T>,
): [R, (value: R, ignoreDestroy?: boolean) => void] {
  const { defaultValue, value, onChange } = option || {};
  const firstRenderRef = useRef(true);

  const [innerValue, setInnerValue] = useState<T | R>(() => {
    if (value !== undefined) {
      return value as T | R;
    }
    if (defaultValue !== undefined) {
      return defaultValue as T | R;
    }
    return typeof defaultStateValue === 'function'
      ? (defaultStateValue as () => T)()
      : defaultStateValue;
  });

  let mergedValue: T | R = value !== undefined ? value : innerValue;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const triggerChange = useCallback(
    (newValue: R, ignoreDestroy?: boolean) => {
      const prevValue = mergedValue;

      if (!ignoreDestroy) {
        setInnerValue(newValue);
      }

      if (newValue !== prevValue && onChangeRef.current) {
        onChangeRef.current(newValue as unknown as T, prevValue as unknown as T);
      }
    },
    [mergedValue],
  );

  // If controlled, always sync state
  if (firstRenderRef.current) {
    firstRenderRef.current = false;
  } else if (value !== undefined && value !== mergedValue) {
    setInnerValue(value);
    mergedValue = value;
  }

  return [mergedValue as R, triggerChange];
}

export default useMergedState;
