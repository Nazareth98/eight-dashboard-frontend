import React from "react";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AllProviders from "./contexts/contexts.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AllProviders>
        <App />
      </AllProviders>
    </BrowserRouter>
  </React.StrictMode>
);
