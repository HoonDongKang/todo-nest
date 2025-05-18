import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const $bcrypt = {
  hash: async (plainText: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    return await bcrypt.hash(plainText, salt);
  },

  compare: async (plainText: string, hashedText: string): Promise<boolean> => {
    return await bcrypt.compare(plainText, hashedText);
  },
};
