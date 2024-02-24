import React, { useState, useEffect } from "react";
import { Box, Container, VStack, Heading, Input, Textarea, Button, useToast, Stack, useColorModeValue, Divider, List, ListItem, IconButton, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaPaperPlane, FaBell, FaTrash } from "react-icons/fa";

const Index = () => {
  const currentUser = 1; // Simulating the current logged-in user ID
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(currentUser); // State to track the current user id
  const [inputValue, setInputValue] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleMessageChange = (e) => setMessageContent(e.target.value);

  const sendMessage = (recipientId) => {
    if (inputValue && messageContent && recipientId) {
      const newMessage = {
        id: messages.length + 1,
        recipientId: recipientId, // Adding recipientId to the message
        title: inputValue,
        content: messageContent,
        isRead: false,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setMessageContent("");
      toast({
        title: "Message sent.",
        description: "We've sent your message.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const markAsRead = (id) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, isRead: true } : message)));
  };

  const countUserMessages = () => {
    return messages.filter((message) => message.recipientId === userId && !message.isRead).length;
  };

  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    setUnreadMessagesCount(countUserMessages());
  }, [messages, userId]);

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1">Penpal Exchange</Heading>
        <Box position="relative">
          <Heading as="h3" size="lg" mb={4}>
            Inbox
          </Heading>
          {unreadMessagesCount > 0 && (
            <Box position="absolute" top="-1rem" right="0" px={2} py={1} bg="red.500" color="white" borderRadius="full" fontSize="sm">
              {unreadMessagesCount}
            </Box>
          )}
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg={useColorModeValue("white", "gray.700")} mb={6}>
          <Link as={RouterLink} to="/login">
            <Button colorScheme="teal" mb={4}>
              Go to Login
            </Button>
          </Link>
          <VStack spacing={4}>
            <Input placeholder="Title of your message" value={inputValue} onChange={handleInputChange} />
            <Textarea placeholder="Write your message here..." value={messageContent} onChange={handleMessageChange} size="sm" />
            <Button leftIcon={<FaPaperPlane />} colorScheme="blue" onClick={sendMessage}>
              Send Message
            </Button>
          </VStack>
        </Box>
        <Divider />
        <Box w="100%">
          <Heading as="h3" size="lg" mb={4}>
            Inbox
          </Heading>
          <List spacing={3}>
            {messages
              .filter((message) => message.recipientId === userId)
              .map((message) => (
                <ListItem key={message.id} p={3} shadow="md" borderWidth="1px" borderRadius="md" bg={message.isRead ? "gray.100" : "yellow.100"}>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Heading size="md">{message.title}</Heading>
                      <Box>{message.content}</Box>
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <IconButton icon={<FaBell />} aria-label="Mark as read" colorScheme={message.isRead ? "gray" : "orange"} onClick={() => markAsRead(message.id)} size="sm" />
                      <IconButton icon={<FaTrash />} aria-label="Delete message" colorScheme="red" onClick={() => deleteMessage(message.id)} size="sm" />
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
