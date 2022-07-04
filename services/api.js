import { CASH_IN, CASH_OUT, LEGAL_PERSONS_CASH_OUT } from '../utils/constants';
import { client } from './http';

export const getCommissionConfiguration = async (type) => {
  switch (type) {
    case CASH_IN: {
      try {
        const response = await client.get('cash-in');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    case CASH_OUT: {
      try {
        const response = await client.get('cash-out-natural');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    case LEGAL_PERSONS_CASH_OUT: {
      try {
        const response = await client.get('cash-out-juridical');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    default:
      return {};
  }
};
