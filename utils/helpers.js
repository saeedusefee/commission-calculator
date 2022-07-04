import moment from "moment";

export const sortByDate = (data) => {
  return data.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};

export const commissionFee = (amount, percent) => {
  return Math.ceil(amount * percent) / 100;
};

export const getWeekNumber = (date) => {
  return moment(date, "YYYYMMDD").isoWeek();
};
