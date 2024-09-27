import React from 'react';
import {
  Container,
  Flex,
  Heading,
  Box,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../lib/service';
import ReusableForm, { FieldProps } from '../components/form';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  message: string;
  errors?: Array<{ path: string; message: string }>;
}

const registerFields: FieldProps[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true,
  },
];

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    mutate: registerMutation,
    error,
    isPending,
    isError,
  } = useMutation<unknown, ErrorResponse, RegisterFormData>({
    mutationFn: register,
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  const handleSubmit = (data: RegisterFormData) => {
    registerMutation(data);
  };

  const formErrors =
    isError && error.errors
      ? error.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.path]: curr.message }),
          {}
        )
      : {};

  const generalError = isError && !error.errors ? error.message : null;

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container maxW='md' mx='auto' px={8}>
        <VStack spacing={8} align='stretch'>
          <Heading fontSize='4xl' textAlign='center'>
            Create an account
          </Heading>
          <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
            {generalError && (
              <Text color='red.400' mb={3}>
                {generalError}
              </Text>
            )}
            <ReusableForm<RegisterFormData>
              fields={registerFields}
              onSubmit={handleSubmit}
              submitButtonText='Create account'
              isLoading={isPending}
              errors={formErrors}
            />
            <Text mt={4} fontSize='sm'>
              By signing up, you agree to our{' '}
              <ChakraLink color='blue.400'>terms of service</ChakraLink> and{' '}
              <ChakraLink color='blue.400'>privacy policy</ChakraLink>
            </Text>
            <Text mt={4}>
              Already have an account?{' '}
              <ChakraLink as={Link} to='/login' color='blue.400'>
                Sign in
              </ChakraLink>
            </Text>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Register;
