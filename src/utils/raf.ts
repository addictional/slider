/**
 * Request Animation Frame utility
 */
let rafId = 0;
const callbackMap = new Map<number, FrameRequestCallback>();

function rafPolyfill(callback: FrameRequestCallback): number {
  const id = rafId++;
  callbackMap.set(id, callback);

  setTimeout(() => {
    const cb = callbackMap.get(id);
    if (cb) {
      callbackMap.delete(id);
      cb(Date.now());
    }
  }, 16); // ~60fps

  return id;
}

function cancelRafPolyfill(id: number): void {
  callbackMap.delete(id);
}

const requestAnimationFrame =
  (typeof window !== 'undefined' && window.requestAnimationFrame) || rafPolyfill;

const cancelAnimationFrame =
  (typeof window !== 'undefined' && window.cancelAnimationFrame) || cancelRafPolyfill;

function raf(callback: FrameRequestCallback): number {
  return requestAnimationFrame(callback);
}

raf.cancel = function cancel(id: number): void {
  return cancelAnimationFrame(id);
};

export default raf;
