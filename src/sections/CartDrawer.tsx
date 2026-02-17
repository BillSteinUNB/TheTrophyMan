import { useState } from 'react';
import { Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import CheckoutDialog from './CheckoutDialog';

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-black border-l border-white/10 overflow-y-auto">
        <SheetHeader className="border-b border-white/10 pb-4">
          <SheetTitle className="flex items-center gap-3 text-white font-display">
            <ShoppingBag className="w-6 h-6 text-gold" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
            <p className="text-white/50 text-lg mb-2">Your cart is empty</p>
            <p className="text-white/30 text-sm mb-6">Add some items to get started</p>
            <Button
              onClick={() => setIsCartOpen(false)}
              className="bg-gold text-black hover:bg-gold-light rounded-none"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 py-4 px-5 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white/5 border border-white/5"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-black flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-gold text-sm mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white/10 text-white hover:bg-gold hover:text-black transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white/10 text-white hover:bg-gold hover:text-black transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-white/30 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-white/10 pt-4 pb-6 px-5 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-white">
                <span className="text-white/60">Subtotal</span>
                <span className="font-display text-xl">${totalPrice.toFixed(2)}</span>
              </div>

              {/* Note */}
              <p className="text-white/40 text-xs">
                Shipping and taxes calculated at checkout. Minimum quantities apply.
              </p>

              {/* Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-gold text-black hover:bg-gold-light rounded-none py-6 font-semibold"
                  onClick={() => {
                    setIsCheckoutOpen(true);
                    setIsCartOpen(false);
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 rounded-none"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Contact for Quote */}
              <p className="text-center text-white/40 text-xs">
                Need a custom quote?{' '}
                <a href="#contact" className="text-gold hover:underline">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>

    <CheckoutDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </>
  );
};

export default CartDrawer;
