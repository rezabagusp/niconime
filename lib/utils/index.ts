export const getYearList = (startYear?: number, gap = 20) => {
  const currentYear = new Date().getFullYear() + gap;
  const years = [];
  startYear = startYear || 1980;

  while (startYear <= currentYear) {
      years.unshift(startYear++);
  }
  return years;
};
