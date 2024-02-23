import React from 'react';
import { ChakraProvider, Box, ColorModeScript } from '@chakra-ui/react';
import { theme } from "@chakra-ui/theme";
import Navbar from './components/Navbar';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Resume from './sections/Resume';
import colors from '../theme/theme';

export default function Home() {
  
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Navbar />
      <Box pt="5rem">
        <About />
        <Projects />
        <Contact />
      </Box>
    </ChakraProvider>
  );
}

// Theme colors:
// Liver: 754F44
// Burnt sienna: EC7357
// Sunset: FDD692
// Cream: FBFFB9
// Citron: E1CE7A