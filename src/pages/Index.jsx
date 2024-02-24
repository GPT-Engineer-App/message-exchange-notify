import React, { useState } from "react";
import { Box, Container, VStack, Heading, Input, Textarea, Button, useToast, Stack, useColorModeValue, Divider, List, ListItem, ListIcon, IconButton } from "@chakra-ui/react";
import { FaPaperPlane, FaBell, FaTrash } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleMessageChange = (e) => setMessageContent(e.target.value);

  const sendMessage = () => {
    if (inputValue && messageContent) {
      const newMessage = {
        id: messages.length + 1,
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

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1">Penpal Exchange</Heading>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg={useColorModeValue("white", "gray.700")}>
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
            {messages.map((message) => (
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
