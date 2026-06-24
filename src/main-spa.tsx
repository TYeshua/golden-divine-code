import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles.css";

// Importa o componente SPA diretamente (sem SSR / TanStack Start)
import IndexSpa from "./routes/index-spa";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IndexSpa />
    </QueryClientProvider>
  </React.StrictMode>
);
