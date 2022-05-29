export const truncate = (str: string) => {
  return str.length > 16 ? str.substring(0, 14) + "..." : str;
};
