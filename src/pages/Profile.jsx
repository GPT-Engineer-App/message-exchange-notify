import React from "react";
import { Box, Container, VStack, Heading, List, ListItem, ListIcon, IconButton, Stack } from "@chakra-ui/react";
import { FaBell, FaTrash } from "react-icons/fa";

const Profile = ({ userId, messages, deleteMessage, markAsRead }) => {
  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1">Your Messages</Heading>
        <Box w="100%">
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

export default Profile;
