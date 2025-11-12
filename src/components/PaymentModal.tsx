import { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, Building2, Smartphone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  totalAmount: string;
  bookingDetails: {
    eventDate: string;
    guestCount: string;
    eventType: string;
  };
}

export function PaymentModal({ isOpen, onClose, vendorName, totalAmount, bookingDetails }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [upiId, setUpiId] = useState('');

  const advanceAmount = parseInt(totalAmount.replace(/[^0-9]/g, '')) * 0.2; // 20% advance
  const formattedAdvance = `₹${advanceAmount.toLocaleString('en-IN')}`;

  const handlePayment = async () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error('Please fill all card details');
        return;
      }
    } else if (paymentMethod === 'upi' && !upiId) {
      toast.error('Please enter UPI ID');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      toast.success('Payment successful!');
    }, 2000);
  };

  const handleClose = () => {
    setPaymentSuccess(false);
    setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
    setUpiId('');
    onClose();
  };

  if (paymentSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your booking with {vendorName} is confirmed
            </p>
            
            <Card className="bg-gradient-to-r from-amber-50 to-rose-50 mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-left">
                    <p className="text-gray-600">Booking ID</p>
                    <p className="font-semibold">#BKG{Math.floor(Math.random() * 10000)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Amount Paid</p>
                    <p className="font-semibold text-green-600">{formattedAdvance}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-600">Event Date</p>
                    <p className="font-semibold">{bookingDetails.eventDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Guests</p>
                    <p className="font-semibold">{bookingDetails.guestCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-gray-500 mb-4">
              Confirmation email sent to your registered email address
            </p>

            <div className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-rose-500" onClick={handleClose}>
                View My Bookings
              </Button>
              <Button variant="outline" className="w-full" onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Complete Payment</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Payment Details */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="text-lg mb-4">Select Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <Card className={`cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-amber-500 border-2' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5 text-indigo-600" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-amber-500 border-2' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5 text-purple-600" />
                          <span>UPI Payment</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-amber-500 border-2' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <span>Net Banking</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      if (value.replace(/\s/g, '').length <= 16) {
                        setCardDetails({ ...cardDetails, number: value });
                      }
                    }}
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        if (value.length <= 5) {
                          setCardDetails({ ...cardDetails, expiry: value });
                        }
                      }}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        if (e.target.value.length <= 3) {
                          setCardDetails({ ...cardDetails, cvv: e.target.value });
                        }
                      }}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-800">
                    Enter your UPI ID and verify the payment request on your UPI app
                  </p>
                </div>
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bank">Select Bank</Label>
                  <select className="w-full border rounded-md p-2">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    You will be redirected to your bank's website to complete the payment
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="md:col-span-2">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Booking Summary</h3>
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vendor</p>
                  <p className="font-semibold">{vendorName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Event Type</p>
                  <p className="font-semibold">{bookingDetails.eventType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Event Date</p>
                  <p className="font-semibold">{bookingDetails.eventDate}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Guest Count</p>
                  <p className="font-semibold">{bookingDetails.guestCount} guests</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount</span>
                    <span>{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Advance Payment (20%)</span>
                    <span className="text-green-600">{formattedAdvance}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining Amount</span>
                    <span>₹{(parseInt(totalAmount.replace(/[^0-9]/g, '')) * 0.8).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Amount to Pay Now</p>
                  <p className="text-3xl font-bold text-amber-600">{formattedAdvance}</p>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Pay {formattedAdvance}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}