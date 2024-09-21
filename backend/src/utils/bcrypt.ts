import bcrypt from 'bcrypt';

export const hashValue = async (
  value: string,
  saltRounds = 10
): Promise<string> => {
  return bcrypt.hash(value, saltRounds);
};

export const compareValues = async (
  value: string,
  hashedValue: string
): Promise<boolean> => {
  bcrypt.compare(value, hashedValue).catch((error) => {
    console.error('Error comparing values: ', error);
    return false;
  });

  return true;
};
