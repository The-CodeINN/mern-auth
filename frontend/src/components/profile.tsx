import { useAuth } from '../hooks/useAuth';
import {
  Box,
  VStack,
  Heading,
  Text,
  Avatar,
  Divider,
  useColorModeValue,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Text fontSize='sm' fontWeight='bold' color='gray.500'>
      {label}
    </Text>
    <Text fontSize='md'>{value}</Text>
  </Box>
);

const getInitials = (email: string) => {
  return email
    .split('@')[0]
    .split('.')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const Profile = () => {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!user) {
    return (
      <Center h='100vh'>
        <Text>User not found. Please try again later.</Text>
      </Center>
    );
  }

  const initials = getInitials(user.email);

  return (
    <>
      <Center p={5}>
        <Box
          maxW='md'
          w='full'
          bg={bgColor}
          boxShadow='2xl'
          rounded='lg'
          overflow='hidden'
          borderWidth={1}
          borderColor={borderColor}
        >
          {!user.verified && (
            <Alert status='warning'>
              <AlertIcon />
              <AlertTitle mr={2}>Email not verified!</AlertTitle>
              <AlertDescription>
                Please verify your email to access all features.
              </AlertDescription>
            </Alert>
          )}

          <Box bg='blue.500' p={6}>
            <Center>
              <Avatar
                size='2xl'
                name={initials}
                bg='white'
                color='blue.500'
                fontWeight='bold'
                fontSize='3xl'
              />
            </Center>
          </Box>

          <VStack spacing={6} align='stretch' p={6}>
            <Heading as='h2' size='lg' textAlign='center'>
              {user.email}
            </Heading>

            <Divider />

            <ProfileItem label='User ID' value={user._id} />
            <ProfileItem
              label='Email Verification'
              value={user.verified ? 'Verified' : 'Not Verified'}
            />
            <ProfileItem
              label='Account Created'
              value={new Date(user.createdAt).toLocaleDateString()}
            />
            <ProfileItem
              label='Last Updated'
              value={new Date(user.updatedAt).toLocaleDateString()}
            />
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default Profile;
