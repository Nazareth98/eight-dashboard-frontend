import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext.tsx";
import { ChatbotContextProvider } from "./contexts/chatbotContext.tsx";
import { CustomerContextProvider } from "./contexts/customerContext.tsx";
import { UserContextProvider } from "./contexts/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatbotContextProvider>
        <CustomerContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </CustomerContextProvider>
      </ChatbotContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
