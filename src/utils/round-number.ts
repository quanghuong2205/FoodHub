export const roundNumber = (num: number): number => {
  const remainder = num % 1;

  if (remainder === 0) return num;

  if (remainder <= 0.25) {
    return Math.floor(num);
  }

  if (remainder > 0.25 && remainder <= 0.75) {
    return Math.floor(num) + 0.5;
  }

  if (remainder > 0.75) {
    return Math.ceil(num);
  }

  return num;
};
