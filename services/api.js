import client from './http';

const getConfig = async (configName) => {
  try {
    const result = await client.get(configName);
    return { [configName]: result.data };
  } catch (error) {
    console.log('somthing went wrong: ', error);
    return process.exit(1);
  }
};

const getCommissionConfiguration = async () => {
  const configs = await Promise.all([
    getConfig('cash-in'),
    getConfig('cash-out-natural'),
    getConfig('cash-out-juridical'),
  ]);

  return Object.assign(...configs);
};

export default getCommissionConfiguration;
