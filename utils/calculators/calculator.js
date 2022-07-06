import getCommissionConfiguration from '../../services/api';
import {
  CASH_IN, CASH_IN_TYPE, CASH_OUT_NATURAL, LEGAL_PERSONS_CASH_OUT, NATURAL,
} from '../constants';
import { currencyValidation, sortByDate } from '../helpers';
import setCashInCommission from './cashIn';
import { setLegalPersonCashOut, setNaturalCashOut } from './cashOut';

const getTransactionStrategy = (transactionReq, configMap) => {
  if (transactionReq.type === CASH_IN_TYPE) {
    return setCashInCommission(transactionReq, configMap[CASH_IN]);
  }
  if (transactionReq.user_type === NATURAL) {
    return setNaturalCashOut(transactionReq, configMap[CASH_OUT_NATURAL]);
  }
  return setLegalPersonCashOut(transactionReq, configMap[LEGAL_PERSONS_CASH_OUT]);
};

const commissionCalculator = async (inputData) => {
  const sortedTransactions = sortByDate(inputData);
  const setupConfig = await getCommissionConfiguration();
  const finalResult = sortedTransactions.map((transactionReq) => {
    if (currencyValidation(transactionReq.operation.currency)) {
      return getTransactionStrategy(transactionReq, setupConfig);
    }
    console.error('Unexpected currency');
    return 0;
  });

  // console.log(finalResult);
  finalResult.forEach((commission) => console.log(commission.toFixed(2)));
};

export default commissionCalculator;
