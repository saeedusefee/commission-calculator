import { CASH_OUT_NATURAL, LEGAL_PERSONS_CASH_OUT } from '../constants';
import { setLegalPersonCashOut, setNaturalCashOut } from './cashOut';

const mockInput = [
  {
    date: '2016-01-01',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 800.0, currency: 'EUR' },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
];

const mockLegalPersonInput = [
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 50.0, currency: 'EUR' },
  },
];

const mockCofig = {
  'cash-out-natural': {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: 'EUR',
    },
  },
  'cash-out-juridical': {
    percents: 0.3,
    min: {
      amount: 0.5,
      currency: 'EUR',
    },
  },
};

describe('CASH OUT calculation test', () => {
  test('Natural Persons cash out test', () => {
    const firstMoreThanWeekLimit = setNaturalCashOut(mockInput[0], mockCofig[CASH_OUT_NATURAL]);
    expect(firstMoreThanWeekLimit).toBe(87);

    const equalWeekLimit = setNaturalCashOut(mockInput[1], mockCofig[CASH_OUT_NATURAL]);
    expect(equalWeekLimit).toBe(0);

    setNaturalCashOut(mockInput[2], mockCofig[CASH_OUT_NATURAL]);
    // when 800 + 300 = 1100 commision fee must calculate for just 100 (1000 free per week!)
    const afterUpdateExactTimeTransactionWeekLimit = setNaturalCashOut(mockInput[3], mockCofig[CASH_OUT_NATURAL]);
    expect(afterUpdateExactTimeTransactionWeekLimit).toBe(0.3);
  });

  test('Legal persons cash out test', () => {
    const moreThanMinLimit = setLegalPersonCashOut(mockLegalPersonInput[0], mockCofig[LEGAL_PERSONS_CASH_OUT]);
    expect(moreThanMinLimit).toBe(0.9);

    const lessThanMinLimit = setLegalPersonCashOut(mockLegalPersonInput[1], mockCofig[LEGAL_PERSONS_CASH_OUT]);
    expect(lessThanMinLimit).toBe(0.5);
  });
});
