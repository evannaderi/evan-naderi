// evan-naderi/app/sections/Projects.tsx
'use client';

import React from 'react';
import { Box, Container, Heading, SimpleGrid, Text, useMediaQuery, Button, Badge, Spacer } from '@chakra-ui/react';
import colors from '../../theme/theme';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import SentimentAnalysisInput from '../components/SentimentAnalysisInput';

const Projects = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger the animation once when the projects come into view
    threshold: 0.25, // Trigger when 10% of the projects section is in view
  });

  const projects = [
    {
      title: 'LinguaFluent AI',
      description: 'An advanced language learning chatbot utilizing OpenAI and GCP for multilingual role-plays. Implements a spaced repetition algorithm to reinforce words in coversational contexts. Includes word definitions, explanations, saved words, and review word functionalities. Choose from any role-play scenario, and learn up to 6 different languages.',
      link: 'https://linguafluent.vercel.app',
      github: 'https://github.com/evannaderi/chinese-companion',
      skills: ['Next.js', 'React', 'Vercel', 'OpenAI', 'GCP', 'Node.js', 'MaterialUI'], 
      bg: colors.liver,
      hoverBg: colors.burntSienna,
    },
    {
      title: 'Metadash',
      description: 'A full-stack teacher dashboard for processing and analyzing students\' multimodal data. Based on self-regulated learning theories, delivers intuitive and aesthetic data visualizations of students cognitive processes to teachers in real-time.',
      link: '', // No link provided for this project,
      github: '', // No link provided for this project
      skills: ['Angular', 'Nest.js', 'D3.js', 'MySQL'], 
      bg: colors.liver,
      hoverBg: colors.sunset,
    },
    {
      title: 'Sched - Employee Scheduling',
      description: 'A comprehensive employee scheduling web and mobile application enabling dynamic shift scheduling and real-time updates.',
      link: '',
      github: 'https://github.com/evannaderi/Sched',
      skills: ['MongoDB', 'React', 'Node.js', 'Flutter', 'Mongoose', 'MaterialUI'], 
      bg: colors.liver,
      hoverBg: colors.sunset,
    },
    {
      title: 'LegAI Virtual Legal Assistant',
      description: 'An AI-powered legal assistant that extracts and summarizes case-relevant information.',
      link: '',
      github: 'https://github.com/evannaderi/Epic-Law',
      skills: ['LangChain', 'Python', 'PostgreSQL', 'OpenAI', 'GCP'], 
      bg: colors.liver,
      hoverBg: colors.sunset,
    },
    {
      title: 'Sentiment Analysis Classifier',
      description: 'Fine-tuned DistilBERT, BERT, and RoBERTa for sentiment analysis, achieving significant performance improvements with a 93% accuracy rate on the Hugging Face "emotion" dataset.',
      link: '', // No link provided for this project,
      github: '', // No link provided for this project
      skills: ['Pytorch', 'Sklearn', 'Flask', 'Heroku', 'Hugging Face'], 
      bg: colors.liver,
      hoverBg: colors.sunset,
      component: SentimentAnalysisInput,
    },
    {
      title: 'Metadash Prototype',
      description: 'A prototype teacher dashboard for analyzing students\' multimodal data.',
      link: '',
      github: 'https://github.com/evannaderi/metadash', // No link provided for this project
      skills: ['Dash', 'Plotly', 'Python', 'Flask'], 
      bg: colors.liver,
      hoverBg: colors.sunset,
    },
    {
      title: 'Personal Portfolio With Chatbot',
      description: 'An aesthetic and dynamic personal portfolio that utilizes react-spring for animations. Inclused a personalized chatbot assistant that allows user to chat with resume through vectorized embeddings.',
      link: '',
      github: 'https://github.com/evannaderi/evan-naderi', // No link provided for this project
      skills: ['Langchain', 'Next.js', 'react-spring', 'Chakra UI'], 
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

  const renderSkills = (skills: string[]) => {
    return (
      <Box flexWrap="wrap" gap="10px">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            px="3"
            py="1"
            borderRadius="lg"
            fontSize="0.8em" // Adjust the font size as needed
            fontWeight="bold" // Make text bold
            colorScheme="teal" // Use a color scheme or specify custom colors
            variant="solid"
            bgGradient="linear(to-r, #BC6C25, #BC6C25, #E1CE7A)" // Example of a gradient background
          >
            {skill}
          </Badge>
        ))}
      </Box>
    );
  };

  useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth < 768) { // For example, minimize if screen width is less than 768px
                setIsMinimized(true);
            } else {
                setIsMinimized(false);
            }
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

  return (
    <Box
      id="projects"
      height={isMinimized ? "380vh" : "324vh"}
      bg={colors.gradientExample}
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
        <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={10} ref={ref}>
          {trail.map((animation, index) => (
            <animated.div key={projects[index].title} style={animation}>
              <Box boxShadow="md" p="6" rounded="md" bg={colors.cream}>
                <Heading as="h3" size="md" mb={4}>{projects[index].title}</Heading>
                <Text fontSize="md" mb={4}>
                  {projects[index].description}
                </Text> 
                {renderSkills(projects[index].skills)}
                <Spacer />
                {
                  projects[index].component
                    ? React.createElement(projects[index].component as React.ElementType)
                    : null
                }

                {projects[index].link && (
                    <Button
                      mt={4}
                      mr={2} // Add margin-right of 2 units
                      bg={projects[index].bg}
                      color="white"
                      _hover={{ bg: projects[index].hoverBg }}
                      as="a"
                      href={projects[index].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try it <ExternalLinkIcon mx='2px' />
                    </Button>
                  )}
                  {projects[index].github && (
                    <Button
                      mt={4}
                      bg={projects[index].bg}
                      color="white"
                      _hover={{ bg: projects[index].hoverBg }}
                      as="a"
                      href={projects[index].github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github <ExternalLinkIcon mx='2px' />
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
