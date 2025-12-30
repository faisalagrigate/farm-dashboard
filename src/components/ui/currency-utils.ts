/**
 * Currency utilities for Bangladeshi Taka (BDT) formatting
 */

export const formatCurrency = (amount: number): string => {
  return `৳${amount.toLocaleString('en-BD')}`;
};

export const formatCurrencyCompact = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore
    return `৳${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `৳${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 thousand
    return `৳${(amount / 1000).toFixed(1)}K`;
  } else {
    return `৳${amount.toLocaleString('en-BD')}`;
  }
};

export const parseCurrency = (currencyString: string): number => {
  return parseFloat(currencyString.replace(/৳|,/g, '')) || 0;
};

// Convert USD amounts to approximate BDT (using 1 USD = 110 BDT as base rate)
export const convertToBDT = (usdAmount: number, exchangeRate: number = 110): number => {
  return Math.round(usdAmount * exchangeRate);
};