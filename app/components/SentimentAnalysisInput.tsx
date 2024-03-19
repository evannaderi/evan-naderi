// evan-naderi/app/components/SentimentAnalysisInput.tsx
import React, { useState, useMemo } from 'react';
import { Box, Textarea, Button, Text, VStack, Badge, useToast, Spinner, Center, HStack, SimpleGrid, Select } from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface AnalysisResult {
  label: string; // 'Joy', 'Anger', etc.
  score: number; // Confidence score
}

const SentimentAnalysisInput: React.FC = () => {
  const [text, setText] = useState('Feel free to try this sentiment analysis model with your own text!');
  const [results, setResults] = useState<AnalysisResult[][]>([]);
  const [loading, setLoading] = useState(false);
  const [sentenceLoading, setSentenceLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('bert');
  const toast = useToast();

  const analyzeText = async () => {
    if (!text.trim()) {
      toast({
        title: 'Empty input',
        description: "Please enter some text to analyze.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/sentiment', { input: text, model: selectedModel });
      setResults(response.data.result);
    } catch (error) {
      console.error('Error fetching analysis results:', error);
      toast({
        title: 'Error',
        description: "Please wait one moment while this model loads and try again.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearText = () => {
    setText('');
    setResults([]);
  };

  const MotionBox = motion(Box);

  const resultDisplay = useMemo(() => (
    <>
      {loading && (
        <Center>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"/>
        </Center>
      )}
      {results.length > 0 && (
        <SimpleGrid columns={2} spacing={4}>
          {results[0].slice(0, 6).map((result, index) => (
            <MotionBox
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Text fontWeight="bold">{result.label}:</Text>
              <Badge colorScheme={getBadgeColor(result.score)}>{result.score.toFixed(2)}</Badge>
            </MotionBox>
          ))}
        </SimpleGrid>
      )}
    </>
  ), [results, loading]);

  const generateRandomSentence = async () => {
    setSentenceLoading(true);
    const emotions = ['joy', 'anger', 'love', 'fear', 'surprise', 'sadness', 'mixed emotions'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const inputText = "Generate a random sentence with " + randomEmotion + " emotion.";
    try {
      // Adjust the input to be a prompt that your model can generate a random sentence from
      const response = await axios.post('/api/generate', { input: inputText  });
      // Assuming 'response' contains the generated sentence in its 'response' property
      setText(response.data.response); 
    } catch (error) {
      console.error('Error generating random sentence:', error);
      toast({
        title: 'Error',
        description: "Failed to generate a random sentence.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSentenceLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={5} bg="transparent" minHeight="50vh">
      <Textarea
        placeholder="Enter text to analyze sentiment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        bg="whiteAlpha.900"
      />
      <HStack>
        <Button onClick={analyzeText} isLoading={loading} colorScheme="teal" loadingText="Analyzing">
          Analyze
        </Button>
        <Button onClick={clearText} colorScheme="red">Clear</Button>
        <Button onClick={generateRandomSentence} isLoading={sentenceLoading} colorScheme="blue">Generate Random Sentence</Button>
        <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} placeholder="Select model" colorScheme="blue" maxWidth="140px">
            <option value="bert">BERT</option>
            <option value="distilbert">DistilBERT</option>
            <option value="roberta">RoBERTa</option>
        </Select>
      </HStack>
      {resultDisplay}
    </VStack>
  );
};

function getBadgeColor(score: number): string {
  if (score > 0.75) return 'green';
  if (score > 0.5) return 'yellow';
  return 'red';
}

export default SentimentAnalysisInput;
