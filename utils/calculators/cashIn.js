import { commissionFee } from "../helpers";

export const setCashInCommission = (operation, config) => {
    const commission = commissionFee(operation.amount, config.percents) // Calculate commisson in percent
    const finalCommissoin = Math.min(commission, config.max.amount).toFixed(2); // Set limitation of Maximum commision

    return finalCommissoin
}