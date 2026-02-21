import { Phone, Mail } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Phone className="w-4 h-4 text-primary" />
        </div>
        <div className="flex flex-col">
          <a 
            href="tel:+918688981604" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            +91 8688981604
          </a>
          <a 
            href="tel:+918688853148" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            +91 8688853148
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Mail className="w-4 h-4 text-primary" />
        </div>
        <a 
          href="mailto:safatraders66@gmail.com" 
          className="text-sm font-medium text-foreground hover:text-primary transition-colors break-all"
        >
          safatraders66@gmail.com
        </a>
      </div>
    </div>
  );
}
