import { useCallback, useState, useEffect } from "react";
import { MessageRole } from "./enums/MessageRole";
import { Conversations } from "./types";
import { ChatUI } from "./components/chat-ui/ChatUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TEST_USER_INFO = { firstName: "Test", lastName: "User" };
function App() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  const [chatConversations, setChatConversations] = useState<Conversations>([
    {
      id: "1",
      role: MessageRole.ASSISTANT,
      message:
        "I am a sample chat bot made by Amitha." +
        " Imagine yourself as an interviewer and ask any questions that you have." +
        " I'll make my best effort to reply as the real Amitha would :)",
    },
  ]);

  const handleSubmit = useCallback((value: string) => {
    setIsQuerying(true);
    setChatConversations((conversations) => [
      ...conversations,
      {
        userInfo: TEST_USER_INFO,
        id: (conversations.length + 1).toString(),
        role: MessageRole.USER,
        message: value,
      },
    ]);

    let chatbotResponse = "T";
    axios
      .post("http://localhost:8000/ask", {
        name: "karthik",
        token: "abcdsdfer",
        prompt: value,
      })
      .then((response) => {
        chatbotResponse = response.data["agentResponse"];
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      setIsQuerying(false);
      setChatConversations((conversations) => [
        ...conversations,
        {
          id: (conversations.length + 1).toString(),
          role: MessageRole.ASSISTANT,
          message: chatbotResponse,
        },
      ]);
    }, 5000);
  }, []);

  return (
    <ChatUI
      isQuerying={isQuerying}
      onSubmit={handleSubmit}
      placeholder="Type here to interact with this demo"
      disabled={isQuerying}
      conversations={chatConversations}
      customSubmitIcon={<FontAwesomeIcon icon={faMailReply} />}
    />
  );
}

export default App;
