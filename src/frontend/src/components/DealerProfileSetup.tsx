import { useState } from 'react';
import { useSaveDealerProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DealerProfileSetupProps {
  onComplete: () => void;
}

export default function DealerProfileSetup({ onComplete }: DealerProfileSetupProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const saveDealerProfile = useSaveDealerProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !location.trim() || !contactNumber.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await saveDealerProfile.mutateAsync({ name, location, contactNumber });
      toast.success('Dealer profile created successfully!');
      onComplete();
    } catch (error) {
      console.error('Error saving dealer profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Dealer Profile</CardTitle>
        <CardDescription>
          Please provide your information to complete your dealer profile setup
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter your location/city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Enter your contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={saveDealerProfile.isPending}
            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saveDealerProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Profile...
              </>
            ) : (
              'Create Dealer Profile'
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
