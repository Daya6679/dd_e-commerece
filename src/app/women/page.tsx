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

const WomenPage: React.FC = () => {
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        // Using Fake Store API for women's clothing
        const response = await fetch('https://fakestoreapi.com/products/category/women\'s%20clothing');
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

        // Add some additional women's products if API returns few items
        if (transformedProducts.length < 8) {
          const additionalProducts: Product[] = [
            {
              id: 'women-1',
              name: 'Elegant Evening Dress',
              image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
              price: 4999,
              originalPrice: 6999,
              discount: 29,
              rating: 5,
              reviewCount: 234
            },
            {
              id: 'women-2',
              name: 'Designer Blouse',
              image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=400&h=400&fit=crop',
              price: 2999,
              rating: 4,
              reviewCount: 156
            },
            {
              id: 'women-3',
              name: 'Casual Skirt',
              image: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=400&h=400&fit=crop',
              price: 1999,
              originalPrice: 2499,
              discount: 20,
              rating: 4,
              reviewCount: 89
            },
            {
              id: 'women-4',
              name: 'Luxury Handbag',
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
              price: 7999,
              rating: 5,
              reviewCount: 67
            },
            {
              id: 'women-5',
              name: 'High Heels',
              image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
              price: 3999,
              originalPrice: 4999,
              discount: 20,
              rating: 4,
              reviewCount: 134
            },
            {
              id: 'women-6',
              name: 'Summer Dress',
              image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
              price: 3499,
              rating: 4,
              reviewCount: 278
            }
          ];

          setWomenProducts([...transformedProducts, ...additionalProducts]);
        } else {
          setWomenProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error fetching women products:', error);
        // Fallback to static products if API fails
        const fallbackProducts: Product[] = [
          {
            id: 'women-fallback-1',
            name: 'Elegant Evening Dress',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
            price: 4999,
            originalPrice: 6999,
            discount: 29,
            rating: 5,
            reviewCount: 234
          },
          {
            id: 'women-fallback-2',
            name: 'Designer Blouse',
            image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=400&h=400&fit=crop',
            price: 2999,
            rating: 4,
            reviewCount: 156
          },
          {
            id: 'women-fallback-3',
            name: 'Casual Skirt',
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=400&h=400&fit=crop',
            price: 1999,
            originalPrice: 2499,
            discount: 20,
            rating: 4,
            reviewCount: 89
          },
          {
            id: 'women-fallback-4',
            name: 'Luxury Handbag',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
            price: 7999,
            rating: 5,
            reviewCount: 67
          }
        ];
        setWomenProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
  }, []);

  if (loading) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <NavigationBar wishlistCount={5} onCartToggle={handleCartToggle} />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading women's collection...</p>
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

        {/* Hero Section for Women */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20 mb-2">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              WOMEN'S COLLECTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-pink-100"
            >
              Discover the latest trends in women's fashion
            </motion.p>
          </div>
        </section>

        {/* Products Section */}
        <ProductGrid products={womenProducts} />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default WomenPage;