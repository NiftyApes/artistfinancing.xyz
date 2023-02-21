import axios from 'axios';

import { getBaseApiUrl } from './getApiUrl';

const instance = axios.create({ 
  baseURL: getBaseApiUrl(process.env.NEXT_PUBLIC_CHAIN_ID), 
});

export default instance;
