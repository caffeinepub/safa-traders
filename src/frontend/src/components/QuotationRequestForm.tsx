import { useState } from 'react';
import { useAddQuotationRequest } from '../hooks/useQueries';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface QuotationRequestFormProps {
  onSuccess?: () => void;
}

interface SizeInfoInput {
  length: string;
  width: string;
  height: string;
  units: string;
}

export default function QuotationRequestForm({ onSuccess }: QuotationRequestFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [siteType, setSiteType] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [sizeInfoList, setSizeInfoList] = useState<SizeInfoInput[]>([
    { length: '', width: '', height: '', units: 'meters' }
  ]);

  const addQuotationRequest = useAddQuotationRequest();

  const addSizeInfo = () => {
    setSizeInfoList([...sizeInfoList, { length: '', width: '', height: '', units: 'meters' }]);
  };

  const removeSizeInfo = (index: number) => {
    if (sizeInfoList.length > 1) {
      setSizeInfoList(sizeInfoList.filter((_, i) => i !== index));
    }
  };

  const updateSizeInfo = (index: number, field: keyof SizeInfoInput, value: string) => {
    const updated = [...sizeInfoList];
    updated[index] = { ...updated[index], [field]: value };
    setSizeInfoList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!companyName.trim() || !contactPerson.trim() || !phoneNumber.trim() || !email.trim() || !siteType || !siteAddress.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Convert size info to backend format
    const sizeInfo = sizeInfoList
      .filter(info => info.length && info.width && info.height)
      .map(info => ({
        length: BigInt(parseInt(info.length) || 0),
        width: BigInt(parseInt(info.width) || 0),
        height: BigInt(parseInt(info.height) || 0),
        units: info.units
      }));

    try {
      await addQuotationRequest.mutateAsync({
        companyName,
        contactPerson,
        phoneNumber,
        email,
        siteType,
        siteAddress,
        sizeInfo,
        additionalNotes
      });
      toast.success('Quotation request submitted successfully! We will contact you soon.');
      
      // Reset form
      setCompanyName('');
      setContactPerson('');
      setPhoneNumber('');
      setEmail('');
      setSiteType('');
      setSiteAddress('');
      setAdditionalNotes('');
      setSizeInfoList([{ length: '', width: '', height: '', units: 'meters' }]);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting quotation request:', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person *</Label>
          <Input
            id="contactPerson"
            type="text"
            placeholder="Enter contact person name"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteType">Site Type *</Label>
        <Select value={siteType} onValueChange={setSiteType} required>
          <SelectTrigger id="siteType">
            <SelectValue placeholder="Select site type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="office">Office</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteAddress">Site Address *</Label>
        <Input
          id="siteAddress"
          type="text"
          placeholder="Enter complete site address"
          value={siteAddress}
          onChange={(e) => setSiteAddress(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Site Dimensions (Optional)</Label>
          <button
            type="button"
            onClick={addSizeInfo}
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add More
          </button>
        </div>
        
        {sizeInfoList.map((sizeInfo, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dimension {index + 1}</span>
              {sizeInfoList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSizeInfo(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`length-${index}`} className="text-xs">Length</Label>
                <Input
                  id={`length-${index}`}
                  type="number"
                  placeholder="0"
                  value={sizeInfo.length}
                  onChange={(e) => updateSizeInfo(index, 'length', e.target.value)}
                  min="0"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor={`width-${index}`} className="text-xs">Width</Label>
                <Input
                  id={`width-${index}`}
                  type="number"
                  placeholder="0"
                  value={sizeInfo.width}
                  onChange={(e) => updateSizeInfo(index, 'width', e.target.value)}
                  min="0"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor={`height-${index}`} className="text-xs">Height</Label>
                <Input
                  id={`height-${index}`}
                  type="number"
                  placeholder="0"
                  value={sizeInfo.height}
                  onChange={(e) => updateSizeInfo(index, 'height', e.target.value)}
                  min="0"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor={`units-${index}`} className="text-xs">Units</Label>
                <Select 
                  value={sizeInfo.units} 
                  onValueChange={(value) => updateSizeInfo(index, 'units', value)}
                >
                  <SelectTrigger id={`units-${index}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="yards">Yards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          placeholder="Any additional information about the dismantling project..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={addQuotationRequest.isPending}
        className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {addQuotationRequest.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting Request...
          </>
        ) : (
          'Submit Quotation Request'
        )}
      </button>
    </form>
  );
}
