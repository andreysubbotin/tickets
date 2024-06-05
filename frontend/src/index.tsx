import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { apolloClient } from "./core/apollo/client";
import { OidcKeycloakAuthProvider } from "./core/security/OidcKeycloakAuthProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <OidcKeycloakAuthProvider>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </OidcKeycloakAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
