import { AuthProvider } from "@/context/AuthContext";
import SplashApp from "@/navigators/SplashApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SplashApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
