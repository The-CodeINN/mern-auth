import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSessions, Session } from '../lib/service';

export const SESSIONS = 'sessions';

const useSessions = (options?: UseQueryOptions<Session[]>) => {
  const { data: sessions = [], ...rest } = useQuery({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...options,
  });

  return { sessions, ...rest };
};

export { useSessions };
