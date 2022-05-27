const getOrigin = (): any => {
  const origin = window.location.origin;
  if (origin.endsWith("/")) return origin.substring(0, origin.length - 1);
  return origin;
};

export const origin = getOrigin();
