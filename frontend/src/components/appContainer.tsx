import React from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UserMenu from './userMenu';

const AppContainer: React.FC = () => {
  const { user, isLoading, isError } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Center w='100vw' h='90vh'>
        <Spinner size='xl' />
      </Center>
    );
  }

  if (isError || !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return (
    <Box p={4} minH='100vh'>
      <UserMenu user={user} />
      <Outlet />
    </Box>
  );
};

export default AppContainer;
