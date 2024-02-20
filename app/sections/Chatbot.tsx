// evan-naderi/app/sections/Chatbot.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, Text, Input, Button, useToast, HStack, Spinner, Link } from '@chakra-ui/react';
import colors from '../../theme/theme';
import { IoMdSend } from 'react-icons/io';
import { Icon } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type MessageType = {
    type: 'user' | 'ai';
    content: string;
};

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const chatboxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom whenever messages update
    }, [messages, isLoading]);

    useEffect(() => {
        const handleAIResponse = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/agent', {
                    method: 'POST',
                    body: JSON.stringify({ messages: messages.slice(0, messages.length - 1), input: messages[messages.length - 1].content }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseText = await response.json();
                const aiResponse: MessageType = {
                    type: 'ai',
                    content: responseText.response.answer,
                };
                setMessages([...messages, aiResponse]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching AI response:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch AI response.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
            setIsLoading(false);
        };
        if (messages.length > 0 && messages[messages.length - 1].type === 'user') {
            handleAIResponse();
        }
    }, [messages, toast]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = (message: string = inputValue) => {
        if (message.trim() !== '') {
            const newMessage: MessageType = {
                type: 'user',
                content: message,
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const sendPresetMessage = (preset: string) => {
        handleSendMessage(preset);
    };

    const adjustedColors = {
        background: '#f5f5f5', // Light brownish background
        userMessageBg: colors.liver, // Darker brown for user messages
        aiMessageBg: '#ffffff', // Lighter brown for AI messages
        buttonBg: '#6d4c41', // Brown color for the button
    };

    return (
        <VStack align="stretch" w="50vh" h="80vh" spacing={4} overflowY="auto" bg={adjustedColors.background} p={4} boxShadow="md" borderRadius="lg">
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Chat with Resume
                <Link href="/Evan_Naderi_resume.pdf" isExternal>
                    <ExternalLinkIcon mx="2px" />
                </Link>
            </Text>
            <Text fontSize="sm" fontWeight="bold" textAlign="center" color="gray.500" mt={-3}>
                Built with Langchain
            </Text>
            <VStack ref={chatboxRef} flex={1} align="stretch" spacing={4} overflowY="auto">
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        alignSelf={message.type === 'ai' ? 'flex-start' : 'flex-end'}
                        bg={message.type === 'user' ? adjustedColors.userMessageBg : adjustedColors.aiMessageBg}
                        color={message.type === 'ai' ? 'black' : 'white'}
                        p={3}
                        borderRadius="md"
                    >
                        <Text>{message.content}</Text>
                    </Box>
                ))}
                {isLoading && ( // Show loading placeholder when waiting for AI response
                    <Box alignSelf="flex-start" bg={adjustedColors.aiMessageBg} p={3} borderRadius="md">
                        <HStack spacing={2}>
                            <Spinner size="sm" />
                            <Text>Thinking...</Text>
                        </HStack>
                    </Box>
                )}
            </VStack>
            <HStack>
                <Button colorScheme="orange" size="sm" onClick={() => sendPresetMessage('Tell me about Evan\'s experience.')}>Experience</Button>
                <Button colorScheme="orange" size="sm" onClick={() => sendPresetMessage('What skills does Evan have?')}>Skills</Button>
                <Button colorScheme="orange" size="sm" onClick={() => sendPresetMessage('Does Evan have any projects?')}>Projects</Button>
                <Button colorScheme="orange" size="sm" onClick={() => sendPresetMessage('What is Evan\'s education background?')}>Education</Button>
            </HStack>
            <HStack>
                <Input placeholder="Type your message here..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                <Button colorScheme="brown" bgColor={adjustedColors.buttonBg} color="white" onClick={() => handleSendMessage()}><Icon as={IoMdSend} /></Button>
                {/* Preset Buttons for quick prompts */}
                
            </HStack>
            
        </VStack>
    );
};

export default Chatbot;
