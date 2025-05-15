import { $axios } from '@/plugins/axios';

const auth = {
  register: (form: {
    username: string;
    password: string;
    nickname: string;
  }) => {
    return $axios.post('/auth/register', form);
  },
};

export { auth };
