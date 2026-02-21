import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import QuotationRequestModal from '../components/QuotationRequestModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Truck, Shield, Leaf } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        {/* Services Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Our Services
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Trusted scrap trading solutions for dealers and companies across the region
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Recycle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Metal Recycling</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive metal scrap collection and recycling services with competitive pricing
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Pickup Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Fast and reliable scrap pickup from your location with professional handling
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Fair Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Transparent and competitive rates for all types of scrap materials
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Eco-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Committed to sustainable practices and environmental responsibility
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <img 
                      src="/assets/generated/dismantle-icon.dim_128x128.png" 
                      alt="Dismantling Service" 
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl">Dismantling</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    We also dismantle hotel, office, company, or any site with professional expertise
                  </CardDescription>
                  <QuotationRequestModal triggerVariant="outline" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
              About Safa Traders
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-center mb-6">
                Safa Traders is your trusted partner in the scrap trading industry. We specialize in 
                providing reliable, sustainable, and professional scrap collection and recycling services 
                for both individual dealers and corporate clients.
              </p>
              <p className="text-center">
                With years of experience and a commitment to environmental responsibility, we ensure 
                fair pricing, prompt service, and complete transparency in all our transactions. 
                Join our network of satisfied dealers and companies today.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your profile today and join the Safa Traders network
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/dealer-profile" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Dealer Login
              </a>
              <a 
                href="/company-profile" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-colors border-2 border-primary/20"
              >
                Company Login
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
