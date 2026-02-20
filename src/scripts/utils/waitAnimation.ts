export const waitAnimation = async (element: Element): Promise<PromiseSettledResult<Animation>[]> => {
  const animations = element.getAnimations();
  return animations.length === 0
    ? Promise.resolve([])
    : await Promise.allSettled(animations.map((animation) => animation.finished));
};

export default waitAnimation;
