import React from 'react';
import { useDeleteSession } from '../hooks/useDeleteSession';
import {
  Box,
  Text,
  Button,
  useColorModeValue,
  Badge,
  Stack,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { Session } from '../lib/service';
import { formatDate } from '../lib/utils';

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const { deleteSession, isPending } = useDeleteSession(session._id);

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius='md'
      borderColor={borderColor}
      bg={bgColor}
    >
      <Stack spacing={3}>
        <Text fontWeight='bold' isTruncated>
          {session.userAgent}
        </Text>
        <Text fontSize='sm'>Last Active: {formatDate(session.createdAt)}</Text>
        <Badge
          alignSelf='flex-start'
          colorScheme={session.isCurrent ? 'green' : 'gray'}
        >
          {session.isCurrent ? 'Current' : 'Active'}
        </Badge>
        <Button
          leftIcon={<FaTrash />}
          colorScheme='red'
          size='sm'
          onClick={() => deleteSession()}
          isLoading={isPending}
          isDisabled={session.isCurrent || isPending}
        >
          {session.isCurrent ? 'Current Session' : 'Delete'}
        </Button>
      </Stack>
    </Box>
  );
};

export default SessionCard;
