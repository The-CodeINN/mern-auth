/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaLock, FaReact, FaDatabase, FaServer } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface FeatureProps {
  title: string;
  text: string;
  icon: IconType;
}

const Feature: React.FC<FeatureProps> = ({ title, text, icon }) => {
  return (
    <Box
      as={motion.div}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 } as any}
    >
      <VStack
        align={'center'}
        p={6}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'xl'}
        borderRadius={'xl'}
        spacing={4}
      >
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('blue.500', 'blue.300')}
          mb={1}
        >
          <Icon as={icon} w={10} h={10} />
        </Flex>
        <Text fontWeight={600} fontSize={'lg'}>
          {title}
        </Text>
        <Text
          color={useColorModeValue('gray.600', 'gray.400')}
          align={'center'}
        >
          {text}
        </Text>
      </VStack>
    </Box>
  );
};

const LandingPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  const buttonAnimation = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <Box bg={bgColor} minH='100vh'>
      {/* Hero Section */}
      <Container maxW={'5xl'} pt={20} pb={16}>
        <Flex
          as={motion.div}
          direction={'column'}
          align={'center'}
          textAlign={'center'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 } as any}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            mb={4}
            color={headingColor}
          >
            MERN Authentication Template{' '}
            <Text as={'span'} color={'blue.400'}>
              with JWT
            </Text>
          </Heading>
          <Text color={textColor} maxW={'3xl'} mb={8} fontSize={'xl'}>
            A comprehensive starter template for building secure MERN stack
            applications using JSON Web Tokens (JWT). Featuring TypeScript,
            Express, MongoDB, and React with Chakra UI and React Query.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Link to='/register'>
              <Button
                as={motion.button}
                {...buttonAnimation}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'blue'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
              >
                Get Started
              </Button>
            </Link>
            <Link to='https://github.com/The-CodeINN/mern-auth'>
              <Button
                as={motion.button}
                {...buttonAnimation}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
              >
                Learn More
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Container>

      {/* Features Section */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={20}>
        <Container maxW={'5xl'}>
          <VStack spacing={8}>
            <Heading fontSize={'3xl'} color={headingColor} textAlign={'center'}>
              Key Features
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                icon={FaLock}
                title={'Secure Authentication'}
                text={
                  'JWT-based authentication with secure, HTTP-only cookies for both access and refresh tokens.'
                }
              />
              <Feature
                icon={IoMdMail}
                title={'Email Integration'}
                text={
                  'Built-in email functionality for account verification and password reset using Resend.'
                }
              />
              <Feature
                icon={FaReact}
                title={'React Frontend'}
                text={
                  'Pre-built React components with Chakra UI for login, registration, and other auth-related forms.'
                }
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Architecture Section */}
      <Box py={20}>
        <Container maxW={'5xl'}>
          <VStack spacing={8}>
            <Heading fontSize={'3xl'} color={headingColor} textAlign={'center'}>
              API Architecture
            </Heading>
            <Text color={textColor} textAlign={'center'}>
              Our API follows a layered architecture for better organization and
              separation of concerns:
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Feature
                icon={FaServer}
                title={'Routes & Controllers'}
                text={
                  'Handle incoming requests, validate them, and forward to appropriate services.'
                }
              />
              <Feature
                icon={FaDatabase}
                title={'Services & Models'}
                text={
                  'Manage business logic, interact with the database, and define data schemas.'
                }
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg={useColorModeValue('blue.50', 'blue.900')} py={16}>
        <Container maxW={'3xl'}>
          <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
              color={headingColor}
            >
              Ready to build your <br />
              <Text as={'span'} color={'blue.400'}>
                secure MERN app?
              </Text>
            </Heading>
            <Text color={textColor} fontSize={'xl'}>
              Get started with our MERN Authentication Template and focus on
              building your app's unique features, knowing that your
              authentication is rock-solid.
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}
            >
              <Link to='https://github.com/The-CodeINN/mern-auth'>
                <Button
                  as={motion.button}
                  {...buttonAnimation}
                  colorScheme={'blue'}
                  bg={'blue.400'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  size={'lg'}
                >
                  Download Template
                </Button>
              </Link>
              <Link to='https://github.com/The-CodeINN/mern-auth'>
                <Button
                  as={motion.button}
                  {...buttonAnimation}
                  variant={'link'}
                  colorScheme={'blue'}
                  size={'lg'}
                >
                  View Documentation
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
