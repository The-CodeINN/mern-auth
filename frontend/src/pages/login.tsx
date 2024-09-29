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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../lib/service';
import ReusableForm, { FieldProps } from '../components/form';

interface LoginFormData {
  email: string;
  password: string;
}

const loginFields: FieldProps[] = [
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
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl = location.state?.redirectUrl || '/dashboard';

  const {
    mutate: loginMutation,
    error,
    isPending,
    isError,
  } = useMutation<unknown, Error, LoginFormData>({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, { replace: true });
    },
  });

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container maxW='md' mx='auto' px={8}>
        <VStack spacing={8} align='stretch'>
          <Heading fontSize='4xl' textAlign='center'>
            Sign in to your account
          </Heading>
          <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
            {isError && (
              <Text color='red.400' mb={3}>
                {error.message}
              </Text>
            )}
            <ReusableForm<LoginFormData>
              fields={loginFields}
              onSubmit={loginMutation}
              submitButtonText='Sign in'
              isLoading={isPending}
            />
            <VStack mt={4} spacing={2} align='stretch'>
              <ChakraLink as={Link} to='/password/forgot' fontSize='sm'>
                Forgot password?
              </ChakraLink>
              <Text fontSize='sm' color='text.muted'>
                Don't have an account?{' '}
                <ChakraLink as={Link} to='/register'>
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

export default Login;
