import { useState } from 'react';
import { ShoppingCart, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [added, setAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="group bg-black-card border border-white/5 overflow-hidden hover:border-gold/30 transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-black">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-gold text-black text-xs font-bold px-3 py-1">
              {product.badge}
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={() => setShowQuickView(true)}
              className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-gold transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-white font-medium text-sm mb-2 line-clamp-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gold font-display text-lg">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-white/40 text-sm line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Min Quantity */}
          <p className="text-white/40 text-xs mb-3">
            Min. order: {product.minQuantity} units
          </p>

          {/* Add to Cart Section */}
          <div className="flex gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-white/20">
              <button
                onClick={() => setQuantity(Math.max(product.minQuantity, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                -
              </button>
              <span className="w-10 text-center text-white text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || added}
              className={`flex-1 rounded-none transition-all duration-300 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-gold text-black hover:bg-gold-light'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-3xl bg-black-card border-white/10 p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square bg-black">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col">
              <p className="text-gold text-xs uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h2 className="font-display text-2xl text-white mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gold font-display text-3xl">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-white/40 text-lg line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm mb-4">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <p className="text-white text-sm font-medium mb-2">Features:</p>
                <ul className="space-y-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Min Quantity */}
              <p className="text-white/40 text-sm mb-6">
                Minimum order quantity: {product.minQuantity} units
              </p>

              {/* Add to Cart */}
              <div className="mt-auto space-y-3">
                <div className="flex gap-3">
                  <div className="flex items-center border border-white/20">
                    <button
                      onClick={() => setQuantity(Math.max(product.minQuantity, quantity - 1))}
                      className="w-10 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={() => {
                      handleAddToCart();
                      setShowQuickView(false);
                    }}
                    className="flex-1 bg-gold text-black hover:bg-gold-light rounded-none h-12"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <p className="text-center text-white/40 text-xs">
                  Need a custom quote for larger quantities?{' '}
                  <a href="#contact" className="text-gold hover:underline">
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
