// evan-naderi/app/sections/Experience.tsx
'use client';

import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import colors from '../../theme/theme';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const Experience = () => {
  const experiences = [
      {
        title: 'AI Engineer Intern',
        place: 'Universal Destinations and Experiences - Universal Creative, Orlando, FL - Sept 2024 – Present',
        details: [
        ],
      },
      {
        title: 'Software Engineer',
        place: 'UCF Center for Distributed Learning, Orlando, FL - May 2024 – Present',
        details: [
          'Replaced an outdated accessibility tool with an optimized solution using AWS Lambda and Chromium, reducing production costs and improving scalability.',
          'Implemented API endpoints with Node.js and Express, improving internal systems and data flow efficiency.',
          'Collaborated on backend services and database management using MongoDB, Mongoose, and RESTful APIs.',
        ],
      },
      {
        title: 'Machine Learning Researcher',
        place: 'S.M.A.R.T. Lab, UCF - May 2023 – Present',
        details: [
          'Utilized Angular, Nest.js, and D3.js to develop MetaDash, an intuitive multimodal data visualization app.',
          'Independently developed a proof-of-concept prototype dashboard for MetaDash using Dash, Plotly, and Flask.',
          'Automated data processing by creating Python scripts with Pandas, conserving ~15 hours of hands-on work.',
          'Conducted an Honors Thesis on the application and optimization of machine learning algorithms for data modeling of students within
  ];

  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger the animation once when the experience entries come into view
    threshold: 0.5, // Trigger when 10% of the experience section is in view
  });

  const trail = useTrail(experiences.length, {
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
    },
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { mass: 10, tension: 2000, friction: 200 },
  });

  return (
    <Box
      id="experience"
      height="95vh"
      bg={colors.cream}
      color={colors.liver} // Adjusted to `colors.liver` for text color consistency
      scrollMarginTop="10vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.md" textAlign={'center'}>
        <Heading as="h2" size="xl" mb={6} color={colors.liver}>
          Experience
        </Heading>
        <VStack spacing={4} align="stretch" ref={ref}>
          {trail.map((props, index) => (
            <animated.div key={experiences[index].title} style={props}>
              <Box p={5} boxShadow="md" bg={colors.cream} color={colors.liver}>
                <Heading as="h3" size="md">{experiences[index].title}</Heading>
                <Text fontSize="sm" mb={2}>{experiences[index].place}</Text>
                {experiences[index].details.map((detail, detailIndex) => (
                  <Text key={detailIndex} fontSize="md">
                    {detail}
                  </Text>
                ))}
              </Box>
            </animated.div>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Experience;
