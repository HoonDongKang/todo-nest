import { $axios } from '@/plugins/axios';

const todo = {
  get: (id: string) => {
    return $axios.get(`/todo/${id}`);
  },
};

export { todo };
