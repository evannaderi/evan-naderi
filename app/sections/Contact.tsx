// evan-naderi/app/sections/Contact.tsx
import React from 'react';
import { Box, Container, Heading, Stack, FormControl, FormLabel, Input, Textarea, Button, useMediaQuery } from '@chakra-ui/react';
import colors from '../../theme/theme';

const Contact = () => {

  return (
    <Box
      id="contact"
      height="90vh"
      bg={colors.gradientExample} // Using theme color
      color={colors.liver} // Using theme color for text
      scrollMarginTop="10vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.md" textAlign={'center'}>
        <Heading as="h2" size="xl" mb={6}>
          Contact Me
        </Heading>
        <form>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Your name" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Your email address" />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Your message" />
            </FormControl>
            <Button
              type="submit"
              bg={colors.burntSienna} // Using theme color
              color="white"
              _hover={{ bg: colors.sunset }} // Optional: change color on hover (using theme color)
            >
              Send Message
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Contact;
