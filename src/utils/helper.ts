import lodash from 'lodash';

import { PriceDataType } from 'model/price.model';

export const getPercent = (part = 0, fullPart = 0): number => {
  if (fullPart === 0 || part === 0) return 0;
  const percent = (100 - (part / fullPart) * 100).toFixed(0);
  return parseInt(percent);
};

export const getMostExpensivePrice = (priceInfo: PriceDataType): number => {
  const dataCompetitors = lodash.get(priceInfo, 'competitors', 0);
  if (typeof dataCompetitors === 'number') {
    return 0;
  }

  const result = lodash.max(Object.values(dataCompetitors));
  return result || 0;
};
