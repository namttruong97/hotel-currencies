import { getMostExpensivePrice, getPercent } from 'utils/helper';

import { PriceDataType } from 'model/price.model';

describe('Testing getPercent discount', () => {
  it('should return 0 when fullPart is 0', () => {
    const result = getPercent(12, 0);
    expect(result).toEqual(0);
  });

  it('should return 0 when part is 0', () => {
    const result = getPercent(0, 56);
    expect(result).toEqual(0);
  });

  it('should return 0 when part or fullPart not provided', () => {
    const result = getPercent();
    expect(result).toEqual(0);
  });

  it('should return correct value ', () => {
    const result = getPercent(20, 100);
    expect(result).toEqual(80);
  });
});

describe('Testing getMostExpensivePrice discount', () => {
  const mockPriceInfo: PriceDataType = {
    id: 5,
    price: 150,
    competitors: {
      A: 200,
      B: 300,
    },
  };
  it('should return most expensive price when have competitors', () => {
    const result = getMostExpensivePrice(mockPriceInfo);
    expect(result).toEqual(300);
  });

  it('should return correct when competitors have only one', () => {
    const mockWrongCompetitors = {
      ...mockPriceInfo,
      competitors: {
        A: 100,
      },
    };

    const result = getMostExpensivePrice(mockWrongCompetitors);
    expect(result).toEqual(100);
  });

  it('should return 0 when have not competitors', () => {
    const mockHasNotCompetitors = { ...mockPriceInfo, competitors: {} };
    const result = getMostExpensivePrice(mockHasNotCompetitors);

    expect(result).toEqual(0);
  });
});
