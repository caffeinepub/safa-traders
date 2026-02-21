import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, FileText } from 'lucide-react';
import { UserProfile } from '../backend';

interface CompanyProfileViewProps {
  profile: UserProfile;
}

export default function CompanyProfileView({ profile }: CompanyProfileViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Company Profile</h1>
        <p className="text-muted-foreground">View and manage your company information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Company Information</CardTitle>
          <CardDescription>Your registered company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">Company Name</p>
              <p className="text-lg font-semibold text-foreground">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">Company Address</p>
              <p className="text-lg font-semibold text-foreground">
                {profile.companyAddress || 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">Registration Number</p>
              <p className="text-lg font-semibold text-foreground">
                {profile.companyRegistrationNumber || 'Not specified'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Need to update your profile? Contact Safa Traders support at{' '}
            <a href="mailto:safatraders66@gmail.com" className="text-primary font-medium hover:underline">
              safatraders66@gmail.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
