import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import QuotationRequestForm from './QuotationRequestForm';
import { FileText } from 'lucide-react';

interface QuotationRequestModalProps {
  triggerText?: string;
  triggerVariant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
}

export default function QuotationRequestModal({ 
  triggerText = 'Request Quote',
  triggerVariant = 'default'
}: QuotationRequestModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className="gap-2">
          <FileText className="w-4 h-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request a Dismantling Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you with a detailed quotation for your dismantling project.
          </DialogDescription>
        </DialogHeader>
        <QuotationRequestForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
