'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
        >
          Trending Now
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-full text-lg font-semibold">
                    {product.discount}% OFF
                  </div>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`p-3 rounded-full shadow-md transition-all duration-200 ${
                      isInWishlist(product.id)
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-white hover:bg-pink-50'
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 transition-colors duration-200 ${
                        isInWishlist(product.id)
                          ? 'text-white'
                          : 'text-gray-600'
                      }`}
                      fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-xl line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-pink-600">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-base text-gray-600">({product.reviewCount})</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;