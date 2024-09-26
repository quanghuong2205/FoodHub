import { v4 } from 'uuid';

export const createRandomArray = (size: number): string[] => {
  if (!size) return [];

  const result = [];
  for (let i = 1; i <= size; i++) {
    result.push(v4());
  }

  return result;
};
