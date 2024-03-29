// evan-naderi/app/sections/Intro.tsx
'use client';

import React from 'react';
import { Box, Container, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import colors from '../../theme/theme';
import { useSpring, animated, useTrail } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  // Animation for the Heading
  const headingAnimation = useSpring({
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1)' : 'scale(0.9)',
    },
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    delay: 100,
  });

  // Trail animation for each line of Text
  const textLines = [
    "Hey! I'm Evan, and I'm passionate about utilizing AI and technology to help improve people's lives.",
    "I'm currently a third year Computer Science student at UCF,",
    "and I am part of a research lab at the Institute of Modelling and Simulation.",
    "Scroll to see some of my projects!",
  ];

  const textAnimation = useTrail(textLines.length, {
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0px)' : 'translateX(-20px)',
    },
    from: {
      opacity: 0,
      transform: 'translateX(-20px)',
    },
    delay: 200,
    config: { mass: 5, tension: 2000, friction: 200 },
  });

  return (
    <Box
      id="about"
      height="90vh"
      scrollMarginTop="10vh"
      bg={colors.cream}
      color={colors.liver}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.md" textAlign={{ base: 'center', md: 'left' }}>
      </Container>
    </Box>
  );
};

export default About;
