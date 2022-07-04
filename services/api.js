import { client } from './http';

const getConfig = async (configName) => {
  const result = await client.get(configName);
  return { [configName]: result.data };
};

export const getCommissionConfiguration = async () => {
  const configs = await Promise.all([getConfig('cash-in'), getConfig('cash-out-natural'), getConfig('cash-out-juridical')]);
  
  return  Object.assign(...configs);
};
