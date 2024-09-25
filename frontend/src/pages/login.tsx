import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../lib/service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    error,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container maxW='md' mx='auto' px={8} textAlign='center'>
        <Heading mb={8} fontSize='4xl'>
          Sign in to your account
        </Heading>
        <Box rounded={'lg'} bg='gray.700' boxShadow='lg' p={8}>
          {isError && (
            <Box color='red.400' mb={3}>
              {error.message}
            </Box>
          )}
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                type='email'
                placeholder='Email address'
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
                onKeyDown={(e) =>
                  e.key === 'Enter' && loginMutation({ email, password })
                }
              />
            </FormControl>
            <ChakraLink
              as={Link}
              to='/forgot-password'
              fontSize='sm'
              textAlign={{ base: 'center', sm: 'right' }}
            >
              Forgot password?
            </ChakraLink>
            <Button
              my={2}
              isDisabled={!email || password.length < 6}
              isLoading={isPending}
              width='full'
              onClick={() => loginMutation({ email, password })}
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
            <Text fontSize='sm' color='text.muted' align='center'>
              Don&apos;t have an account?{' '}
              <ChakraLink as={Link} to='/signup'>
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
