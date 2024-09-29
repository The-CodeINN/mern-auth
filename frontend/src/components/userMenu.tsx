import React from 'react';
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { IoChevronUpCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { logout, User } from '../lib/service';
import { queryClient } from '../lib/QueryProvider';

const getInitials = (email: string) => {
  return email
    .split('@')[0]
    .split('.')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const navigate = useNavigate();
  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const avatarBgColor = useColorModeValue('blue.500', 'blue.200');
  const avatarColor = useColorModeValue('white', 'gray.800');

  const initials = getInitials(user.email);

  return (
    <Menu placement='top-start'>
      <MenuButton
        as={Button}
        position='absolute'
        left='1.5rem'
        bottom='1.5rem'
        rightIcon={<IoChevronUpCircleOutline />}
        bg={bgColor}
        _hover={{ bg: hoverBgColor }}
        borderWidth='1px'
        borderColor={borderColor}
        borderRadius='full'
        px={2}
        py={1}
      >
        <Avatar
          size='sm'
          name={initials}
          bg={avatarBgColor}
          color={avatarColor}
        />
      </MenuButton>
      <MenuList borderColor={borderColor} boxShadow='md' borderRadius='md'>
        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
        <MenuItem onClick={() => signOut()} color='red.500'>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
