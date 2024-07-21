import RouteController from './routes/routes'
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  return (
    <TooltipProvider>
      <RouteController/>
      <Toaster/>
    </TooltipProvider>
  )
}

export default App
