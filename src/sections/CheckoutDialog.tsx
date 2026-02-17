import { useState } from 'react';
import { CheckCircle, CreditCard, Package, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { items, totalPrice, clearCart, setIsCartOpen } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'confirmed'>('info');

  const handleClose = () => {
    onOpenChange(false);
    // Reset to first step after close animation
    setTimeout(() => setStep('info'), 300);
  };

  const handlePlaceOrder = () => {
    // Mock order — nothing is collected or stored
    setStep('confirmed');
    clearCart();
  };

  const handleDone = () => {
    handleClose();
    setIsCartOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) handleClose();
      else onOpenChange(val);
    }}>
      <DialogContent className="bg-[hsl(0,0%,6%)] border border-white/10 text-white sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-none">
        {/* Progress Steps */}
        {step !== 'confirmed' && (
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`flex items-center gap-1.5 text-xs font-medium ${step === 'info' ? 'text-gold' : 'text-white/40'}`}>
              <Package className="w-3.5 h-3.5" />
              Shipping
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className={`flex items-center gap-1.5 text-xs font-medium ${step === 'payment' ? 'text-gold' : 'text-white/40'}`}>
              <CreditCard className="w-3.5 h-3.5" />
              Payment
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-1.5 text-xs font-medium text-white/40">
              <CheckCircle className="w-3.5 h-3.5" />
              Confirm
            </div>
          </div>
        )}

        {/* Step 1: Shipping Info */}
        {step === 'info' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white font-display text-xl">Shipping Information</DialogTitle>
              <DialogDescription className="text-white/50 text-sm">
                This is a demo checkout — no information is collected or stored.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">First Name</label>
                  <Input
                    placeholder="John"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Last Name</label>
                  <Input
                    placeholder="Doe"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-xs mb-1 block">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs mb-1 block">Phone</label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs mb-1 block">Address</label>
                <Input
                  placeholder="123 Main Street"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="text-white/60 text-xs mb-1 block">City</label>
                  <Input
                    placeholder="New York"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">State</label>
                  <Input
                    placeholder="NY"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Zip</label>
                  <Input
                    placeholder="10001"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                  />
                </div>
              </div>

              {/* Order Summary Mini */}
              <div className="bg-white/5 border border-white/10 p-3 space-y-2">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Order Summary</p>
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-white/70 truncate mr-2">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-white flex-shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-gold font-display text-lg">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-none"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gold text-black hover:bg-gold-light rounded-none font-semibold"
                onClick={() => setStep('payment')}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white font-display text-xl">Payment Details</DialogTitle>
              <DialogDescription className="text-white/50 text-sm">
                Demo only — enter any details. Nothing is processed or stored.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div>
                <label className="text-white/60 text-xs mb-1 block">Name on Card</label>
                <Input
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs mb-1 block">Card Number</label>
                <Input
                  placeholder="4242 4242 4242 4242"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Expiry Date</label>
                  <Input
                    placeholder="MM / YY"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">CVC</label>
                  <Input
                    placeholder="123"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none h-10"
                  />
                </div>
              </div>

              {/* Total */}
              <div className="bg-white/5 border border-white/10 p-3 flex justify-between items-center">
                <span className="text-white/60 text-sm">Order Total</span>
                <span className="text-gold font-display text-xl">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Lock className="w-3 h-3" />
                <span>This is a demo checkout. No real payment is processed.</span>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-none"
                onClick={() => setStep('info')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                className="flex-1 bg-gold text-black hover:bg-gold-light rounded-none font-semibold"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmed' && (
          <div className="flex flex-col items-center text-center py-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-gold" />
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-display text-2xl">Order Sent!</h2>
              <p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed">
                This is a demo checkout. No payment was processed and no order information was collected or stored.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 w-full max-w-xs space-y-2 text-sm">
              <p className="text-white/40 text-xs uppercase tracking-wider font-medium">Demo Order</p>
              <p className="text-white/60">Order #DEMO-{Math.floor(Math.random() * 90000 + 10000)}</p>
              <p className="text-white/40 text-xs">
                In a real setup, you would receive an email confirmation and tracking details.
              </p>
            </div>

            <Button
              className="bg-gold text-black hover:bg-gold-light rounded-none font-semibold px-8 py-5"
              onClick={handleDone}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
