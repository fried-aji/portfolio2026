export const debounce = <T extends unknown[], R>(
  callback: (...args: T) => R,
  delay?: number,
): ((...args: T) => void) => {
  let timeout: number | undefined;
  if (delay === undefined) {
    return (...args: T): void => {
      if (timeout !== undefined) cancelAnimationFrame(timeout);
      timeout = requestAnimationFrame(() => callback(...args));
    };
  }
  return (...args: T): void => {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = window.setTimeout(() => callback(...args), delay);
  };
};

export default debounce;
