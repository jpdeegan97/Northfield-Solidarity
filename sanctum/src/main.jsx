import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { DocsProvider } from "./context/DocsContext.jsx";
import { OwnershipProvider } from "./context/OwnershipContext.jsx";
import { JournalProvider } from "./context/JournalContext.jsx";

import { SecurityProvider } from "./context/SecurityContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OwnershipProvider>
            <JournalProvider>
              <DocsProvider>
                <SecurityProvider>
                  <App />
                </SecurityProvider>
              </DocsProvider>
            </JournalProvider>
          </OwnershipProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);