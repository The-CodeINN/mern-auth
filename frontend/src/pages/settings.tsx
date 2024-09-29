import React from 'react';
import { useSessions } from '../hooks/useSession';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';
import SessionCard from '../components/sessionCard';
import { formatDate } from '../lib/utils';

const Settings: React.FC = () => {
  const { sessions, isError, isSuccess } = useSessions();
  const { user } = useAuth();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (isError) {
    return (
      <Alert status='error'>
        <AlertIcon />
        An error occurred while fetching your sessions. Please try again later.
      </Alert>
    );
  }

  return (
    <Box maxWidth='container.xl' margin='auto' p={5}>
      <VStack spacing={8} align='stretch'>
        <Heading as='h1' size='xl'>
          Account Settings
        </Heading>

        <Box
          bg={bgColor}
          p={6}
          borderRadius='md'
          borderWidth={1}
          borderColor={borderColor}
        >
          <Heading as='h2' size='lg' mb={4}>
            Active Sessions
          </Heading>
          {isSuccess && sessions.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {sessions.map((session) => (
                <SessionCard key={session._id} session={session} />
              ))}
            </SimpleGrid>
          ) : (
            <Text>No active sessions found.</Text>
          )}
        </Box>

        <Box
          bg={bgColor}
          p={6}
          borderRadius='md'
          borderWidth={1}
          borderColor={borderColor}
        >
          <Heading as='h2' size='lg' mb={4}>
            Account Information
          </Heading>
          <VStack align='start' spacing={3}>
            <Text>
              <strong>Email:</strong> {user?.email}
            </Text>
            <Text>
              <strong>Account Created:</strong>{' '}
              {user ? formatDate(user.createdAt) : 'N/A'}
            </Text>
            <Text>
              <strong>Last Updated:</strong>{' '}
              {user ? formatDate(user.updatedAt) : 'N/A'}
            </Text>
            <Text>
              <strong>Email Verification:</strong>{' '}
              <Badge colorScheme={user?.verified ? 'green' : 'red'}>
                {user?.verified ? 'Verified' : 'Not Verified'}
              </Badge>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Settings;
