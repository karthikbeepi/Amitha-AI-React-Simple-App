import { useCallback, useEffect, useState } from "react";
import { MessageRole } from "./enums/MessageRole";
import { Conversations } from "./types";
import { ChatUI } from "./components/chat-ui/ChatUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Login from "./components/login-ui/Login";

const TEST_USER_INFO = { firstName: "User", lastName: "User" };
function App() {
  const authTokenName = "authToken";

  const [authToken, setAuthToken] = useState<string>("initialToken");

  useEffect(() => {
    const storedToken = sessionStorage.getItem(authTokenName);
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

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

    let chatbotResponse = "Response to backend failed";
    const storedAuthToken = sessionStorage.getItem(authTokenName);
    console.log(`Auth token: ${storedAuthToken}`);
    axios
      .post("https://461e-45-44-28-25.ngrok-free.app/ask", {
        token: storedAuthToken,
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
    <div>
      {authToken !== "initialToken" ? (
        <div>
          <ChatUI
            isQuerying={isQuerying}
            onSubmit={handleSubmit}
            placeholder="Type here to chat with Amitha AI."
            disabled={isQuerying}
            conversations={chatConversations}
            customSubmitIcon={<FontAwesomeIcon icon={faMailReply} />}
          />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
