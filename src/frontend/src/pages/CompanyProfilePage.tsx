import { useEffect, useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CompanyProfileSetup from '../components/CompanyProfileSetup';
import CompanyProfileView from '../components/CompanyProfileView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ProfileType } from '../backend';

export default function CompanyProfilePage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [showSetup, setShowSetup] = useState(false);

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (isAuthenticated && isFetched) {
      if (userProfile === null) {
        setShowSetup(true);
      } else if (userProfile && userProfile.profileType === ProfileType.dealer) {
        // User has a dealer profile, redirect or show message
        setShowSetup(false);
      } else {
        setShowSetup(false);
      }
    }
  }, [isAuthenticated, isFetched, userProfile]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Company Login Required</CardTitle>
              <CardDescription>
                Please log in to access your company profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login with Internet Identity'
                )}
              </button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (profileLoading || !isFetched) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (userProfile && userProfile.profileType === ProfileType.dealer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Wrong Profile Type</CardTitle>
              <CardDescription>
                You are logged in with a dealer profile. Please use the dealer profile page instead.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="/dealer-profile"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Go to Dealer Profile
              </a>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          {showSetup || userProfile === null || !userProfile ? (
            <CompanyProfileSetup onComplete={() => setShowSetup(false)} />
          ) : (
            <CompanyProfileView profile={userProfile} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
