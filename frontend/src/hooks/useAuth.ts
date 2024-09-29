import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUser, User } from '../lib/service';

export const AUTH = 'auth';

const useAuth = (options?: UseQueryOptions<User>) => {
  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity, //
    ...options,
  });

  return { user, ...rest };
};

export { useAuth };
