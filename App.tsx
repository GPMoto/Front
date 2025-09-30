import { AuthProvider } from "@/context/AuthContext";
import SplashApp from "@/navigators/SplashApp";
import { ThemeProvider as CustomThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomThemeProvider>
          <SplashApp />
        </CustomThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
