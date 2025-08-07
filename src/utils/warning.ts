/**
 * Warning utility for development mode
 */
let warned = new Set<string>();

export function resetWarned() {
  warned = new Set();
}

export function warning(valid: boolean, message: string): void {
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
    if (!warned.has(message)) {
      warned.add(message);
      console.error(`Warning: ${message}`);
    }
  }
}

export default warning;
