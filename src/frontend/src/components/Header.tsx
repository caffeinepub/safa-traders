import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Menu, X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ProfileType } from '../backend';

export default function Header() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/assets/generated/logo.dim_256x256.png" 
              alt="Safa Traders Logo" 
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-foreground">Safa Traders</span>
              <span className="text-xs text-muted-foreground">Scrap Trading Solutions</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            {isAuthenticated && userProfile && userProfile.profileType === ProfileType.dealer && (
              <a href="/dealer-profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dealer Profile
              </a>
            )}
            {isAuthenticated && userProfile && userProfile.profileType === ProfileType.company && (
              <a href="/company-profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Company Profile
              </a>
            )}
            <button
              onClick={handleAuth}
              disabled={isLoggingIn}
              className="px-5 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : isAuthenticated ? (
                'Logout'
              ) : (
                'Login'
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a 
                href="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              {isAuthenticated && userProfile && userProfile.profileType === ProfileType.dealer && (
                <a 
                  href="/dealer-profile" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dealer Profile
                </a>
              )}
              {isAuthenticated && userProfile && userProfile.profileType === ProfileType.company && (
                <a 
                  href="/company-profile" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Company Profile
                </a>
              )}
              <button
                onClick={() => {
                  handleAuth();
                  setMobileMenuOpen(false);
                }}
                disabled={isLoggingIn}
                className="px-5 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : isAuthenticated ? (
                  'Logout'
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
