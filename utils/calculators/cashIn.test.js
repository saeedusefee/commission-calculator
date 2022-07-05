import { setCashInCommission } from './cashIn';

const mockInput = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: {
      amount: 200.0,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-10',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_in',
    operation: {
      amount: 1000000.0,
      currency: 'EUR',
    },
  },
];

const mockConfig = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR',
  },
};

describe('CASH IN calculation test', () => {
  test('cash in test', () => {
    const cashInLessThanMaxConfig = setCashInCommission(mockInput[0], mockConfig);
    expect(cashInLessThanMaxConfig).toBe(0.06);

    const cashInGreaterThanMaxconfig = setCashInCommission(mockInput[1], mockConfig);
    expect(cashInGreaterThanMaxconfig).toBe(5);
  });
});
