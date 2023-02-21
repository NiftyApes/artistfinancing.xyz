import axios from 'axios';

import { getBaseApiUrl } from './getApiUrl';

const instance = axios.create({ 
  baseURL: getBaseApiUrl(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)), 
});

export default instance;
