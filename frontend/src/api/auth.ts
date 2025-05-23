import { $axios } from '@/plugins/axios';

interface UserDto {
  username: string;
  password: string;
  nickname: string;
}

const auth = {
  register: (form: UserDto) => {
    return $axios.post('/auth/register', form);
  },

  login: (form: Partial<UserDto>) => {
    return $axios.post('/auth/login', form);
  },

  refresh: () => {
    return $axios.post('/auth/refresh');
  },
};

export { auth };
