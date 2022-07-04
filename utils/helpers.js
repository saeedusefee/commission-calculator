import moment from "moment";

export const sorteByDate = (data) => {
  return data.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};

export const commissionFee = (amount, percent) => {
  return (amount * (percent / 100)).toFixed(2);
};

export const getWeekNumber = (date) => {
  const weekNumber = moment(date, "YYYYMMDD").isoWeek();
  console.log(weekNumber, date);
  return weekNumber;
};
