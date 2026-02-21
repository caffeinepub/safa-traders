import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import DealerProfilePage from './pages/DealerProfilePage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import WhatsAppButton from './components/WhatsAppButton';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <WhatsAppButton />
      <Toaster />
    </>
  ),
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const dealerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dealer-profile',
  component: DealerProfilePage,
});

const companyProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/company-profile',
  component: CompanyProfilePage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, dealerProfileRoute, companyProfileRoute]);

// Create the router
const router = createRouter({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
