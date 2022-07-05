import axios, { AxiosResponse, CancelTokenSource, CancelTokenStatic } from 'axios';

const CancelToken: CancelTokenStatic = axios.CancelToken;
const source: CancelTokenSource = CancelToken.source();

export interface IParams {
  url: string;
  options?: any;
  config?: any;
}

const get = async (params: IParams): Promise<any> => {
  const endPoint: string = params.url;
  let config = params.options ? params.options : {};
  config = { ...config, cancelToken: source.token };
  const response: AxiosResponse = await axios.get(endPoint, config);
  return response.data;
};

const httpRequest = {
  get,
};

export default httpRequest;
