'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../../components/NavigationBar';
import ProductGrid from '../../components/ProductGrid';
import Cart from '../../components/Cart';
import { CartProvider } from '../../contexts/CartContext';

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

const BeautyPage: React.FC = () => {
  const [beautyProducts, setBeautyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchBeautyProducts = async () => {
      try {
        // Using Fake Store API for beauty products (jewelery category as proxy)
        const response = await fetch('https://fakestoreapi.com/products/category/jewelery');
        const data = await response.json();

        // Transform the API data to match our Product interface for beauty
        const transformedProducts: Product[] = data.map((item: any, index: number) => ({
          id: item.id.toString(),
          name: item.title,
          image: item.image,
          price: Math.round(item.price * 83), // Convert USD to INR (approx)
          rating: Math.round(item.rating.rate),
          reviewCount: item.rating.count,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : undefined, // Random discount
        }));

        // Add various beauty products
        const additionalProducts: Product[] = [
          {
            id: 'beauty-1',
            name: 'Luxury Perfume Set',
            image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop',
            price: 2499,
            originalPrice: 3499,
            discount: 29,
            rating: 5,
            reviewCount: 203
          },
          {
            id: 'beauty-2',
            name: 'Designer Lipstick',
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
            price: 899,
            rating: 4,
            reviewCount: 156
          },
          {
            id: 'beauty-3',
            name: 'Premium Makeup Kit',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
            price: 3999,
            originalPrice: 5499,
            discount: 27,
            rating: 5,
            reviewCount: 89
          },
          {
            id: 'beauty-4',
            name: 'Skincare Serum',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
            price: 1899,
            rating: 4,
            reviewCount: 267
          },
          {
            id: 'beauty-5',
            name: 'Hair Care Bundle',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
            price: 1499,
            originalPrice: 1999,
            discount: 25,
            rating: 4,
            reviewCount: 134
          },
          {
            id: 'beauty-6',
            name: 'Nail Polish Set',
            image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop',
            price: 699,
            rating: 4,
            reviewCount: 78
          },
          {
            id: 'beauty-7',
            name: 'Facial Cleanser',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
            price: 1299,
            originalPrice: 1699,
            discount: 24,
            rating: 5,
            reviewCount: 192
          },
          {
            id: 'beauty-8',
            name: 'Luxury Face Mask',
            image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=400&fit=crop',
            price: 799,
            rating: 4,
            reviewCount: 145
          }
        ];

        // Combine API products with additional beauty products
        setBeautyProducts([...transformedProducts, ...additionalProducts]);
      } catch (error) {
        console.error('Error fetching beauty products:', error);
        // Fallback to static products if API fails
        const fallbackProducts: Product[] = [
          {
            id: 'beauty-fallback-1',
            name: 'Luxury Perfume Set',
            image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop',
            price: 2499,
            originalPrice: 3499,
            discount: 29,
            rating: 5,
            reviewCount: 203
          },
          {
            id: 'beauty-fallback-2',
            name: 'Designer Lipstick',
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
            price: 899,
            rating: 4,
            reviewCount: 156
          },
          {
            id: 'beauty-fallback-3',
            name: 'Premium Makeup Kit',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
            price: 3999,
            originalPrice: 5499,
            discount: 27,
            rating: 5,
            reviewCount: 89
          },
          {
            id: 'beauty-fallback-4',
            name: 'Skincare Serum',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
            price: 1899,
            rating: 4,
            reviewCount: 267
          }
        ];
        setBeautyProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchBeautyProducts();
  }, []);

  if (loading) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <NavigationBar wishlistCount={5} onCartToggle={handleCartToggle} />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading beauty collection...</p>
            </div>
          </div>
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar wishlistCount={5} onCartToggle={handleCartToggle} />

        {/* Hero Section for Beauty */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-20 mb-2">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              BEAUTY COLLECTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-purple-100"
            >
              Discover premium beauty and skincare products
            </motion.p>
          </div>
        </section>

        {/* Products Section */}
        <ProductGrid products={beautyProducts} />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default BeautyPage;