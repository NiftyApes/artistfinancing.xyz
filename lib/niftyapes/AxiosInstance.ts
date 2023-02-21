import axios from 'axios';

import { getBaseApiUrl } from './getApiUrl';

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

const instance = axios.create({ 
  baseURL: getBaseApiUrl(CHAIN_ID ? +CHAIN_ID : 1), 
});

export default instance;
