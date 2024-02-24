import React, { useState } from "react";
import { Container, VStack, Input, Button } from "@chakra-ui/react";

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");

  const handleLogin = () => {
    onLogin(userId);
  };

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Input placeholder="Enter user ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default Login;
