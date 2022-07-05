export const randomNumber = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPercent = (part: number, full: number): number => {
  if (full === 0) return 0;
  const percent = (100 - (part / full) * 100).toFixed(0);
  return parseInt(percent);
};
