import React from 'react';
import {
  Heading,
  Box,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  VStack,
} from '@chakra-ui/react';
import Form, { FieldProps } from './form';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../lib/service';
import { Link } from 'react-router-dom';

interface ResetPasswordFormProps {
  code: string;
}

interface ResetPasswordData {
  password: string;
}

const formFields: FieldProps[] = [
  {
    name: 'password',
    label: 'New password',
    type: 'password',
    placeholder: 'Enter your new password',
    required: true,
  },
];

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  code,
}) => {
  const {
    mutate: resetPasswordMutation,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation<unknown, Error, ResetPasswordData>({
    mutationFn: ({ password }) =>
      resetPassword({ verificationCode: code, password }),
  });

  return (
    <VStack spacing={8} align='stretch'>
      <Heading fontSize='4xl' textAlign='center'>
        Change your password
      </Heading>
      <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
        {isError && (
          <Alert status='error' mb={3}>
            <AlertIcon />
            {error.message || 'An error occurred'}
          </Alert>
        )}
        {isSuccess ? (
          <VStack spacing={3} align='center'>
            <Alert rounded={'lg'} status='success'>
              <AlertIcon />
              Password updated successfully!
            </Alert>
            <ChakraLink color='blue.400' as={Link} to='/login' replace>
              Sign in
            </ChakraLink>
          </VStack>
        ) : (
          <Form<ResetPasswordData>
            fields={formFields}
            onSubmit={resetPasswordMutation}
            submitButtonText='Change password'
            isLoading={isPending}
          />
        )}
      </Box>
    </VStack>
  );
};
