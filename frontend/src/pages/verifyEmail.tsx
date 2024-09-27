import React from 'react';
import {
  Alert,
  AlertIcon,
  Container,
  Flex,
  Spinner,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { verifyEmail } from '../lib/service';

const VerifyEmail: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code ?? ''),
    enabled: Boolean(code),
  });

  if (isPending) {
    return (
      <Flex minH='100vh' justify='center' align='center'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Flex minH='100vh' justify='center' align='center'>
      <Container maxW='md' py={12}>
        <VStack spacing={6} align='stretch'>
          <Alert status={isSuccess ? 'success' : 'error'} borderRadius='md'>
            <AlertIcon />
            {isSuccess
              ? 'Email verified successfully!'
              : 'Invalid or expired verification link.'}
          </Alert>
          {isError && (
            <Text color='gray.400'>
              The link you clicked is invalid or expired.{' '}
              <ChakraLink
                color='blue.400'
                as={RouterLink}
                to='/password/reset'
                replace
              >
                Get a new verification link
              </ChakraLink>
            </Text>
          )}
          <ChakraLink color='blue.400' as={RouterLink} to='/dashboard' replace>
            Back to dashboard
          </ChakraLink>
        </VStack>
      </Container>
    </Flex>
  );
};

export default VerifyEmail;
