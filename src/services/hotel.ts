import httpRequest, { IParams } from './httpRequest';

const API_ENDPOINT = 'https://interview-api.vercel.app/api/hotels/tokyo';

export const getListInfoHotel = () => {
  const obj: IParams = {
    url: API_ENDPOINT,
  };

  return httpRequest.get(obj);
};

export const getListPriceHotel = (currency: string) => {
  const obj: IParams = {
    url: `${API_ENDPOINT}/1/${currency}`,
  };

  return httpRequest.get(obj);
};
