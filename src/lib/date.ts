export const has24HoursPassed = (lastDate: Date) => {
  const now = Date.now();
  const last = new Date(lastDate).getTime();

  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

  return now - last >= TWENTY_FOUR_HOURS;
};

export const hasFiveMinutesPassed = (lastDate: Date) => {
  const now = Date.now();
  const last = new Date(lastDate).getTime();

  const FIVE_MINUTES = 5 * 60 * 1000;

  return now - last >= FIVE_MINUTES;
};

export const hasTimePassed = (lastDate: Date, milliseconds: number) => {
  return Date.now() - new Date(lastDate).getTime() >= milliseconds;
};
