/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import commissionCalculator from './utils/calculators/calculator';

function main() {
  // Read input file from CLI (0: node or command runner, 1: execution file 2: arguments)
  const fileAddress = process.argv[2];
  try {
    const inputData = require(`./${fileAddress}`);
    commissionCalculator(inputData);
  } catch {
    console.log('Please correctly import your requests file as a second argument in CLI!');
  }
}

main();
