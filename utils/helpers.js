import moment from 'moment';
import { whiteListCurrencies } from './config';

export const sortByDate = (data) => data.sort((a, b) => new Date(a.date) - new Date(b.date));

export const commissionFee = (amount, percent) => Math.ceil(amount * percent) / 100;

export const getWeekNumber = (date) => moment(date, 'YYYYMMDD').isoWeek();

export const currencyValidation = (currencyType) => whiteListCurrencies.includes(currencyType);
