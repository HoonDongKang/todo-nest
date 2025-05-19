import { $axios } from '@/plugins/axios';

const me = {
  get: () => {
    return $axios.get('/me');
  },
};

export { me };
