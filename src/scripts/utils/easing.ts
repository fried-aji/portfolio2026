// https://easings.net/ja
type EasingType = (x: number) => number;

export const linear: EasingType = (x) => {
  return x;
};

export const easeInSine: EasingType = (x) => {
  return 1 - Math.cos((x * Math.PI) / 2);
};

export const easeOutSine: EasingType = (x) => {
  return Math.sin((x * Math.PI) / 2);
};

export const easeInOutSine: EasingType = (x) => {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

export const easeInQuad: EasingType = (x) => {
  return x * x;
};

export const easeOutQuad: EasingType = (x) => {
  return 1 - (1 - x) * (1 - x);
};

export const easeInOutQuad: EasingType = (x) => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export const easeInCubic: EasingType = (x) => {
  return x * x * x;
};

export const easeOutCubic: EasingType = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

export const easeInOutCubic: EasingType = (x) => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const easeInQuart: EasingType = (x) => {
  return x * x * x * x;
};

export const easeOutQuart: EasingType = (x) => {
  return 1 - Math.pow(1 - x, 4);
};

export const easeInOutQuart: EasingType = (x) => {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

export const easeInQuint: EasingType = (x) => {
  return x * x * x * x * x;
};

export const easeOutQuint: EasingType = (x) => {
  return 1 - Math.pow(1 - x, 5);
};

export const easeInOutQuint: EasingType = (x) => {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};

export const easeInExpo: EasingType = (x) => {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};

export const easeOutExpo: EasingType = (x) => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export const easeInOutExpo: EasingType = (x) => {
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  if (x < 0.5) {
    return Math.pow(2, 20 * x - 10) / 2;
  }
  return (2 - Math.pow(2, -20 * x + 10)) / 2;
};

export const easeInCirc: EasingType = (x) => {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
};

export const easeOutCirc: EasingType = (x) => {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
};

export const easeInOutCirc: EasingType = (x) => {
  return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};

export const easeInBack: EasingType = (x) => {
  const c1 = 1.701_58;
  const c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
};

export const easeOutBack: EasingType = (x) => {
  const c1 = 1.701_58;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

export const easeInOutBack: EasingType = (x) => {
  const c1 = 1.701_58;
  const c2 = c1 * 1.525;
  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};

export const easeInElastic: EasingType = (x) => {
  const c4 = (2 * Math.PI) / 3;
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};

export const easeOutElastic: EasingType = (x) => {
  const c4 = (2 * Math.PI) / 3;
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

export const easeInOutElastic: EasingType = (x) => {
  const c5 = (2 * Math.PI) / 4.5;
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  if (x < 0.5) {
    return (-Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2;
  }
  return (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};

export const easeInBounce: EasingType = (x) => {
  return 1 - easeOutBounce(1 - x);
};

export const easeOutBounce: EasingType = (x) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984_375;
  }
};

export const easeInOutBounce: EasingType = (x) => {
  return x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2;
};
