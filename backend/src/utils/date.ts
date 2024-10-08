export const oneYearFromNow = () => {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};

export const oneDayFromNow = () => {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
};

export const sevenDaysFromNow = () => {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
};

export const fifteenMinutesFromNow = () => {
  return new Date(Date.now() + 15 * 60 * 1000);
};

export const fiveMinutesAgo = (): Date => {
  return new Date(Date.now() - 5 * 60 * 1000);
};

export const oneHourFromNow = () => {
  return new Date(Date.now() + 60 * 60 * 1000);
};

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
