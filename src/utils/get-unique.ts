export const getUniqueStrings = (array: string[]): string[] => {
  return array.reduce((acc: string[], str) => {
    if (!acc.includes(str)) {
      acc.push(str);
    }
    return acc;
  }, []);
};
