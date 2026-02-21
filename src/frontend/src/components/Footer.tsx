import ContactInfo from './ContactInfo';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'safa-traders');

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/assets/generated/logo.dim_256x256.png" 
                alt="Safa Traders Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="font-bold text-lg text-foreground">Safa Traders</h3>
                <p className="text-sm text-muted-foreground">Scrap Trading Solutions</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in sustainable scrap trading and recycling services.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ContactInfo />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/dealer-profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dealer Login
                </a>
              </li>
              <li>
                <a href="/company-profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Company Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Safa Traders. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
