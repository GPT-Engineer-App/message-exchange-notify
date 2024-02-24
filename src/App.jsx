import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index";

import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleLogin = (userId) => {
    setUserId(userId);
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const markAsRead = (id) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, isRead: true } : message)));
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile userId={userId} messages={messages} deleteMessage={deleteMessage} markAsRead={markAsRead} />} />
      </Routes>
    </Router>
  );
}

export default App;
