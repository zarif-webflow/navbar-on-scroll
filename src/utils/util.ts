type NonUndefined<T> = T extends undefined ? never : T;

export const fallback = <T>(
  value: T,
  replacementValue: NonUndefined<T>,
  condition?: (value: T) => boolean
) => {
  if (value !== undefined && condition && !condition(value)) return replacementValue;
  if (value === undefined || Number.isNaN(value)) return replacementValue;
  if (value === 0) return value;

  return value;
};

export const parseFloatFallback = (inputStr: string | undefined, fallbackValue: number) => {
  if (inputStr === undefined) return fallbackValue;

  const parsedValue = Number.parseFloat(inputStr);

  return Number.isNaN(parsedValue) ? fallbackValue : parsedValue;
};
