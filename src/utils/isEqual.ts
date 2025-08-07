/**
 * Deep comparison utility for arrays and objects
 */
export default function isEqual<T>(a: T, b: T, strict?: boolean): boolean {
  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i += 1) {
      if (!isEqual(a[i], b[i], strict)) {
        return false;
      }
    }

    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let i = 0; i < keysA.length; i += 1) {
      const key = keysA[i];
      if (!isEqual((a as any)[key], (b as any)[key], strict)) {
        return false;
      }
    }

    return true;
  }

  return false;
}
