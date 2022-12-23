export const joinCn = (...classNames: (string | boolean)[]): string => {
  return classNames.filter(Boolean).join(" ");
};
