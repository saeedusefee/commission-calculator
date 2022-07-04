import { getCommissionConfiguration } from '../../services/api';
import { CASH_IN, CASH_OUT, LEGAL_PERSONS_CASH_OUT } from '../constants';
import { sorteByDate } from '../helpers';
import { setCashInCommission } from './cashIn';
import { setLegalPersonCashOut, setNaturalCashOut } from './cashOut';

const configMap = {
  cash_in: CASH_IN,
  natural: CASH_OUT,
  juridical: LEGAL_PERSONS_CASH_OUT,
};

export const commissionCalculator = (inputData) => {
  const sortedTransactions = sorteByDate(inputData);

  sortedTransactions.forEach((transactionReq) => {
    const transactionType = configMap[transactionReq.type === 'cash_in' ? transactionReq.type : transactionReq.user_type];
    getCommissionConfiguration(transactionType).then((setupConfig) => {
      switch (transactionType) {
        case CASH_IN: {
          return setCashInCommission(transactionReq.operation, setupConfig);
        }

        case CASH_OUT: {
          return setNaturalCashOut(transactionReq, setupConfig);
        }

        case LEGAL_PERSONS_CASH_OUT: {
          return setLegalPersonCashOut(transactionReq.operation, setupConfig);
        }
      }
    });
  });

  // const commissions = await Promise.all(promises);
  // console.log(commissions);
  // commissions.forEach((commission) => console.log(commission));
};
