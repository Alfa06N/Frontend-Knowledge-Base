import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AdvancedInput from "./components/AdvancedInput/AdvancedInput";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdvancedInput />
    </QueryClientProvider>
  );
}

export default App;
