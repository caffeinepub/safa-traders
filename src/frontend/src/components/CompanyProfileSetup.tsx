import { useState } from 'react';
import { useSaveCompanyProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CompanyProfileSetupProps {
  onComplete: () => void;
}

export default function CompanyProfileSetup({ onComplete }: CompanyProfileSetupProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const saveCompanyProfile = useSaveCompanyProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !address.trim() || !registrationNumber.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await saveCompanyProfile.mutateAsync({ name, address, registrationNumber });
      toast.success('Company profile created successfully!');
      onComplete();
    } catch (error) {
      console.error('Error saving company profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Company Profile</CardTitle>
        <CardDescription>
          Please provide your company information to complete your profile setup
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your company name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Company Address *</Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your company address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number *</Label>
            <Input
              id="registrationNumber"
              type="text"
              placeholder="Enter your company registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={saveCompanyProfile.isPending}
            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saveCompanyProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Profile...
              </>
            ) : (
              'Create Company Profile'
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
