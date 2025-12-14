import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router";
import AuthProvider from "./providers/AuthProvider";
import CartProvider from "./providers/CartProvider";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
