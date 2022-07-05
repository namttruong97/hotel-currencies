export type PriceDataType = {
  id: number;
  price: number;
  competitors?: {
    [key: string]: number;
  };
  taxes_and_fees?: {
    hotel_fees: number;
    tax: number;
  };
};
