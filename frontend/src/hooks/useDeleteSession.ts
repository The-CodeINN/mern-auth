import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SESSIONS } from './useSession';
import { ApiError, ApiResponse, deleteSession, Session } from '../lib/service';
import { useToast } from '@chakra-ui/react';

const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, ...rest } = useMutation<ApiResponse, ApiError, void>({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: (data) => {
      queryClient.setQueryData<Session[]>([SESSIONS], (cache) =>
        cache ? cache.filter((session) => session._id !== sessionId) : []
      );
      toast({
        title: 'Session deleted',
        description: data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return { deleteSession: mutate, ...rest };
};

export { useDeleteSession };
