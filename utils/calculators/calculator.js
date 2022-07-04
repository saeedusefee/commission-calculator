import { getCommissionConfiguration } from '../../services/api';
import { CASH_IN, CASH_IN_TYPE, CASH_OUT_NATURAL, LEGAL_PERSONS_CASH_OUT, NATURAL } from '../constants';
import { sortByDate } from '../helpers';
import { setCashInCommission } from './cashIn';
import { setLegalPersonCashOut, setNaturalCashOut } from './cashOut';

const getTransactionStrategy = (transactionReq, configMap) => {
  if (transactionReq.type === CASH_IN_TYPE) {
    return setCashInCommission(transactionReq, configMap[CASH_IN]);
  } else {
    if (transactionReq.user_type === NATURAL) {
      return setNaturalCashOut(transactionReq, configMap[CASH_OUT_NATURAL]);
    }
    return setLegalPersonCashOut(transactionReq, configMap[LEGAL_PERSONS_CASH_OUT]);
  }
};

export const commissionCalculator = async (inputData) => {
  const sortedTransactions = sortByDate(inputData);
  const setupConfig = await getCommissionConfiguration();
  const finalResult = sortedTransactions.map((transactionReq) => {
    return getTransactionStrategy(transactionReq, setupConfig);
  });

  // console.log(finalResult);
  finalResult.forEach((commission) => console.log(commission.toFixed(2)));
};
