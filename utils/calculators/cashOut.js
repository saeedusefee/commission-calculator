import { commissionFee, getWeekNumber } from '../helpers';

const cashOutHistory = []; // fake-db for just cash history of transactions

export const setNaturalCashOut = (transactionInfo, config) => {
  const filterUserHistory = cashOutHistory.filter((item) => item.userID === transactionInfo.user_id);

  // If user history exist we need update information
  if (filterUserHistory.length > 0) {
    const userHistory = filterUserHistory[0];
    if (userHistory.weekTransaction.weekNumber === getWeekNumber(transactionInfo.date)) {
      // Update total cash out amount per week
      userHistory.weekTransaction.amount += transactionInfo.operation.amount;
      // Check limitation of total cash out amount at current week
      if (userHistory.weekTransaction.amount > config.week_limit.amount) {
        return commissionFee(transactionInfo.operation.amount, config.percents);
      }
    } else {
      // Replace new week and new total transaction per week (We don't need to the past after a week)
      userHistory.weekTransaction.weekNumber = getWeekNumber(transactionInfo.date);
      userHistory.weekTransaction.amount = transactionInfo.operation.amount;
      return 0;
    }
  }

  // If user history dosen't exist
  // Add or create new transation to the history (fake-db)
  const newCashOutHistory = {
    userID: transactionInfo.user_id,
    weekTransaction: {
      weekNumber: getWeekNumber(transactionInfo.date),
      amount: transactionInfo.operation.amount,
    },
  };

  cashOutHistory.push(newCashOutHistory);

  if (transactionInfo.operation.amount > config.week_limit.amount) {
    return commissionFee(transactionInfo.operation.amount, config.percents);
  } else {
    return 0;
  }
};

export const setLegalPersonCashOut = (operation, config) => {
  const commission = commissionFee(operation.amount, config.percents) // Calculate commisson in percent
  const finalCommissoin = Math.max(commission, config.min.amount).toFixed(2); // Set limitation of Minimum commision

  return finalCommissoin
};
