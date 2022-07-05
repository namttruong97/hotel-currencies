import { currencyAtom } from 'store/currencyAtom';

import { useAtom } from 'jotai';

const roundingCurrency = (value: number, currency: string): string => {
  const zeroFixedCurrency = ['USD', 'SGD'];
  const nf = new Intl.NumberFormat('en-US');

  if (zeroFixedCurrency.includes(currency)) {
    return `${currency} ${nf.format(Math.round(value))}`;
  }
  return `${currency} ${nf.format(Math.round(value / 100) * 100)}`;
};

const roundingNumberCurrency = (value: number, currency: string): string => {
  const zeroFixedCurrency = ['USD', 'SGD'];
  const nf = new Intl.NumberFormat('en-US');

  if (zeroFixedCurrency.includes(currency)) {
    return nf.format(Math.round(value));
  }
  return nf.format(Math.round(value / 100) * 100);
};

export function useCurrency() {
  const [currency] = useAtom(currencyAtom);

  return {
    getRounding: (value: number) => roundingCurrency(value, currency),
    getRoundingNumber: (value: number) => roundingNumberCurrency(value, currency),
  };
}

export default useCurrency;
