
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TribePage from "./pages/TribePage";
import ClanPage from "./pages/ClanPage";
import PostPage from "./pages/PostPage";
import OdysseyPage from "./pages/OdysseyPage";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/tribe" element={<Layout><TribePage /></Layout>} />
          <Route path="/clan/:clanId" element={<Layout><ClanPage /></Layout>} />
          <Route path="/post/:postId" element={<Layout><PostPage /></Layout>} />
          <Route path="/odyssey" element={<Layout><OdysseyPage /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
