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

const MenPage: React.FC = () => {
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        // Using Fake Store API for men's clothing
        const response = await fetch('https://fakestoreapi.com/products/category/men\'s%20clothing');
        const data = await response.json();

        // Transform the API data to match our Product interface
        const transformedProducts: Product[] = data.map((item: any, index: number) => ({
          id: item.id.toString(),
          name: item.title,
          image: item.image,
          price: Math.round(item.price * 83), // Convert USD to INR (approx)
          rating: Math.round(item.rating.rate),
          reviewCount: item.rating.count,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : undefined, // Random discount
        }));

        // Add some additional men's products if API returns few items
        if (transformedProducts.length < 8) {
          const additionalProducts: Product[] = [
            {
              id: 'men-1',
              name: 'Classic White Shirt',
              image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
              price: 2499,
              originalPrice: 3499,
              discount: 29,
              rating: 4,
              reviewCount: 156
            },
            {
              id: 'men-2',
              name: 'Slim Fit Jeans',
              image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
              price: 3999,
              rating: 5,
              reviewCount: 203
            },
            {
              id: 'men-3',
              name: 'Casual Polo Shirt',
              image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
              price: 1899,
              originalPrice: 2499,
              discount: 24,
              rating: 4,
              reviewCount: 89
            },
            {
              id: 'men-4',
              name: 'Leather Jacket',
              image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
              price: 8999,
              rating: 5,
              reviewCount: 67
            },
            {
              id: 'men-5',
              name: 'Formal Trousers',
              image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
              price: 3299,
              originalPrice: 4299,
              discount: 23,
              rating: 4,
              reviewCount: 134
            },
            {
              id: 'men-6',
              name: 'Sports T-Shirt',
              image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
              price: 1299,
              rating: 4,
              reviewCount: 278
            }
          ];

          setMenProducts([...transformedProducts, ...additionalProducts]);
        } else {
          setMenProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error fetching men products:', error);
        // Fallback to static products if API fails
        const fallbackProducts: Product[] = [
          {
            id: 'men-fallback-1',
            name: 'Classic White Shirt',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
            price: 2499,
            originalPrice: 3499,
            discount: 29,
            rating: 4,
            reviewCount: 156
          },
          {
            id: 'men-fallback-2',
            name: 'Slim Fit Jeans',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
            price: 3999,
            rating: 5,
            reviewCount: 203
          },
          {
            id: 'men-fallback-3',
            name: 'Casual Polo Shirt',
            image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
            price: 1899,
            originalPrice: 2499,
            discount: 24,
            rating: 4,
            reviewCount: 89
          },
          {
            id: 'men-fallback-4',
            name: 'Leather Jacket',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
            price: 8999,
            rating: 5,
            reviewCount: 67
          }
        ];
        setMenProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchMenProducts();
  }, []);

  if (loading) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <NavigationBar wishlistCount={5} onCartToggle={handleCartToggle} />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading men's collection...</p>
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

        {/* Hero Section for Men */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 mb-2">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              MEN'S COLLECTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-blue-100"
            >
              Discover the latest trends in men's fashion
            </motion.p>
          </div>
        </section>

        {/* Products Section */}
        <ProductGrid products={menProducts} />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default MenPage;