// evan-naderi/app/sections/Projects.tsx
'use client';

import React from 'react';
import { Box, Container, Heading, SimpleGrid, Text, useMediaQuery, Button } from '@chakra-ui/react';
import colors from '../../theme/theme';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger the animation once when the projects come into view
    threshold: 0.5, // Trigger when 10% of the projects section is in view
  });

  const projects = [
    {
      title: 'LinguaFluent AI',
      description: 'An advanced language learning chatbot utilizing OpenAI and GCP for multilingual role-plays.',
      link: 'https://linguafluent.vercel.app',
      bg: colors.liver,
      hoverBg: colors.burntSienna,
    },
    {
      title: 'Employee Scheduling App',
      description: 'A comprehensive employee scheduling web and mobile application enabling dynamic shift scheduling and real-time updates.',
      link: 'https://large.poosd-project.com',
      bg: colors.liver,
      hoverBg: colors.sunset,
    },
    {
      title: 'LegAI Virtual Legal Assistant',
      description: 'An AI-powered legal assistant that extracts and summarizes case-relevant information.',
      link: 'https://github.com/evannaderi/Epic-Law',
      bg: colors.liver,
      hoverBg: colors.sunset,
    },
    {
      title: 'Sentiment Analysis Classifier',
      description: 'A DistilBERT-based NLP classifier for sentiment analysis, achieving significant performance improvements with a 63% accuracy rate on the Hugging Face "emotion" dataset.',
      link: '', // No link provided for this project
      bg: colors.liver,
      hoverBg: colors.sunset,
    },
  ];

  const trail = useTrail(projects.length, {
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
    },
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { mass: 5, tension: 2000, friction: 200 },
  });

  return (
    <Box
      id="projects"
      height="90vh"
      bg={colors.cream}
      color={colors.liver}
      scrollMarginTop="10vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.md" textAlign={'left'}>
        <Heading as="h2" size="xl" mb={6}>
          Projects
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} ref={ref}>
          {trail.map((animation, index) => (
            <animated.div key={projects[index].title} style={animation}>
              <Box boxShadow="md" p="6" rounded="md" bg="white">
                <Heading as="h3" size="md" mb={4}>{projects[index].title}</Heading>
                <Text fontSize="md" mb={4}>
                  {projects[index].description}
                </Text>
                {projects[index].link && (
                  <Button
                    mt={4}
                    bg={projects[index].bg}
                    color="white"
                    _hover={{ bg: projects[index].hoverBg }}
                    as="a"
                    href={projects[index].link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Website
                  </Button>
                )}
              </Box>
            </animated.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Projects;
