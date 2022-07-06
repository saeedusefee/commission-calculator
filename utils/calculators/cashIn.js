import { commissionFee } from '../helpers';

const setCashInCommission = (transactionInfo, config) => {
  const amout = transactionInfo.operation.amount;
  const commission = commissionFee(amout, config.percents); // Calculate commisson in percent
  const finalCommissoin = Math.min(commission, config.max.amount); // Set limitation of Maximum commision
  return finalCommissoin;
};

export default setCashInCommission;
