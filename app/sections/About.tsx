// evan-naderi/app/sections/About.tsx
'use client';

import React, { useEffect } from 'react'; 
import { Box, Container, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import colors from '../../theme/theme';
import { useSpring, animated, useTrail } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import Chatbot from './Chatbot';
import axios from 'axios';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
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
    "and I work at the S.M.A.R.T. lab at the Institute of Modelling and Simulation where I do Software Development/AI work.",
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

  useEffect(() => {
    // Replace 'your-endpoint-url' with the actual URL of the endpoint you want to call
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/sentiment', { input: "this is a test", model: "bert"});
        const response2 = await axios.post('/api/sentiment', { input: "this is a test", model: "distilbert"});
        const response3 = await axios.post('/api/sentiment', { input: "this is a test", model: "roberta"});
        console.log(response.data);
        // Handle the data from the response here
        console.log("models loading");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
        <animated.div style={headingAnimation} ref={ref}>
          <Heading as="h2" size="xl" mb={6}>
            About Me
          </Heading>
        </animated.div>
        {textAnimation.map((props, index) => (
          <animated.div key={index} style={props}>
            <Text fontSize={["l", "xl"]} lineHeight="tall">
              {textLines[index]}
            </Text>
          </animated.div>
        ))}
      </Container>
      <Chatbot />
    </Box>
  );
};

export default About;
