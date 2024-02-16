import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import colors from '../../theme/theme';

const Navbar = () => {
  return (
    <Flex
      as="nav"
      bg={colors.liver}
      color="white"
      padding="1rem"
      justifyContent="space-between" // Adjusted for spacing
      alignItems="center"
      position="fixed"
      top="0"
      width="100%"
      zIndex="10"
      height="10vh"
    >
      {/* Name on the left with a cool font */}
      <Text fontSize="2xl" fontFamily="'Cool Font Name', sans-serif">
        Evan Naderi
      </Text>

      {/* Navigation items on the right */}
      <Flex>
        {['about', 'projects', 'experience', 'contact'].map((item, index) => (
          <Link key={item} href={`#${item}`} passHref>
            <Box as="a" cursor="pointer" ml={index === 0 ? 0 : 4}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Box>
          </Link>
        ))}
        {/* Directly link to the resume PDF for the 'resume' item */}
        <Box
          as="a"
          href="http://evannaderi.com/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          cursor="pointer"
          ml={4}
        >
          Resume
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
