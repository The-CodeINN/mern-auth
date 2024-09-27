import React, { useEffect, useState } from 'react';
import {
  Flex,
  Container,
  Link as ChakraLink,
  VStack,
  Alert,
  AlertIcon,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { Link, useSearchParams } from 'react-router-dom';
import { ResetPasswordForm } from '../components/resetPasswordForm';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isValidLink, setIsValidLink] = useState<boolean | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const expiration = searchParams.get('exp');

    if (code && expiration) {
      const expirationTime = parseInt(expiration, 10);
      const now = Date.now();
      setIsValidLink(expirationTime > now);
    } else {
      setIsValidLink(false);
    }
  }, [searchParams]);

  if (isValidLink === null) {
    return (
      <Flex minH='100vh' align='center' justify='center'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container maxW='md'>
        {isValidLink ? (
          <ResetPasswordForm code={searchParams.get('code')!} />
        ) : (
          <VStack spacing={6} align='stretch'>
            <Alert status='error'>
              <AlertIcon />
              This password reset link is invalid or expired.
            </Alert>
            <Text color='gray.400' textAlign='center'>
              The link you used is either invalid or has expired.
            </Text>
            <ChakraLink
              as={Link}
              to='/password/forgot'
              color='blue.400'
              textAlign='center'
            >
              Request a new password reset link
            </ChakraLink>
          </VStack>
        )}
      </Container>
    </Flex>
  );
};

export default ResetPassword;
