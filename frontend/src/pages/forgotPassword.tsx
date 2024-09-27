import React from 'react';
import {
  Flex,
  Container,
  Heading,
  Box,
  Text,
  Link as ChakraLink,
  Alert,
  AlertIcon,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ReusableForm, { FieldProps } from '../components/form';
import { useMutation } from '@tanstack/react-query';
import { sendPasswordResetEmail } from '../lib/service';

interface ForgotPasswordFormData {
  email: string;
}

const fields: FieldProps[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
];

const ForgotPassword: React.FC = () => {
  const {
    mutate: sendPasswordResetEmailMutation,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation<unknown, Error, ForgotPasswordFormData>({
    mutationFn: ({ email }) => sendPasswordResetEmail(email),
  });

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container maxW='md' mx='auto' px={8}>
        <VStack spacing={8} align='stretch'>
          <Heading fontSize='4xl' textAlign='center'>
            Reset your password
          </Heading>
          <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
            <VStack spacing={6} align='stretch'>
              <Text color='text.muted'>
                Enter your email address and we'll send you a password reset
                link.
              </Text>

              {isError && (
                <Alert status='error' borderRadius={12}>
                  <AlertIcon />
                  {error.message || 'An error occurred'}
                </Alert>
              )}

              {isSuccess ? (
                <Alert status='success' borderRadius={12}>
                  <AlertIcon />
                  Check your email for reset instructions.
                </Alert>
              ) : (
                <ReusableForm<ForgotPasswordFormData>
                  fields={fields}
                  isLoading={isPending}
                  onSubmit={sendPasswordResetEmailMutation}
                  submitButtonText='Reset password'
                />
              )}

              <Text fontSize='sm' color='text.muted' textAlign='center'>
                Go back to{' '}
                <ChakraLink as={Link} to='/login' replace>
                  Sign in
                </ChakraLink>
                {' or '}
                <ChakraLink as={Link} to='/register' replace>
                  Sign up
                </ChakraLink>
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};

export default ForgotPassword;
