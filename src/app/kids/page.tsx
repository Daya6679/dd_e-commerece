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

const KidsPage: React.FC = () => {
  const [kidsProducts, setKidsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchKidsProducts = async () => {
      try {
        // Try to fetch from an API that has kids products, or use a mix of categories
        // Since Fake Store API doesn't have kids category, we'll use jewelry as a proxy and transform
        const response = await fetch('https://fakestoreapi.com/products/category');
        const data = await response.json();

        // Transform the API data to match our Product interface for kids
        const transformedProducts: Product[] = data.map((item: any, index: number) => ({
          id: item.id.toString(),
          name: item.title,
          image: item.image,
          price: Math.round(item.price * 83), // Convert USD to INR (approx)
          rating: Math.round(item.rating.rate),
          reviewCount: item.rating.count,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : undefined, // Random discount
        }));

        // Add various kids dresses and shoes with API integration
        const additionalProducts: Product[] = [
          {
            id: 'kids-dress-1',
            name: 'Kids Floral Maxi Dress',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
            price: 1499,
            originalPrice: 1999,
            discount: 25,
            rating: 5,
            reviewCount: 78
          },
          {
            id: 'kids-dress-2',
            name: 'Kids Princess Tutu Dress',
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
            price: 1899,
            rating: 5,
            reviewCount: 92
          },
          {
            id: 'kids-shoes-1',
            name: 'Kids Running Sneakers',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
            price: 1999,
            originalPrice: 2499,
            discount: 20,
            rating: 4,
            reviewCount: 156
          },
          {
            id: 'kids-dress-3',
            name: 'Kids School Pinafore Dress',
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=400&h=400&fit=crop',
            price: 1299,
            originalPrice: 1699,
            discount: 23,
            rating: 4,
            reviewCount: 67
          },
          {
            id: 'kids-shoes-2',
            name: 'Kids Leather School Shoes',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            price: 2299,
            rating: 5,
            reviewCount: 89
          },
          {
            id: 'kids-dress-4',
            name: 'Kids Winter Coat Dress',
            image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
            price: 2199,
            originalPrice: 2799,
            discount: 21,
            rating: 5,
            reviewCount: 134
          },
          {
            id: 'kids-shoes-3',
            name: 'Kids Sports Shoes',
            image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop',
            price: 1799,
            rating: 4,
            reviewCount: 78
          },
          {
            id: 'kids-dress-5',
            name: 'Kids Beach Sundress',
            image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=400&fit=crop',
            price: 1199,
            originalPrice: 1499,
            discount: 20,
            rating: 4,
            reviewCount: 45
          },
          {
            id: 'kids-shoes-4',
            name: 'Kids Casual Sandals',
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
            price: 999,
            rating: 4,
            reviewCount: 112
          },
          {
            id: 'kids-dress-6',
            name: 'Kids Party Dress',
            image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=400&h=400&fit=crop',
            price: 1699,
            rating: 5,
            reviewCount: 203
          },
          {
            id: 'kids-shoes-5',
            name: 'Kids Winter Boots',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
            price: 2499,
            originalPrice: 2999,
            discount: 17,
            rating: 4,
            reviewCount: 67
          },
          {
            id: 'kids-dress-7',
            name: 'Kids Traditional Ethnic Dress',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
            price: 1999,
            rating: 5,
            reviewCount: 89
          }
        ];

        // Combine API products with additional kids dresses
        setKidsProducts([...transformedProducts, ...additionalProducts]);
      } catch (error) {
        console.error('Error fetching kids products:', error);
        // Fallback to static products if API fails - focused on dresses and shoes
        const fallbackProducts: Product[] = [
          {
            id: 'kids-fallback-1',
            name: 'Kids Floral Maxi Dress',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
            price: 1499,
            originalPrice: 1999,
            discount: 25,
            rating: 5,
            reviewCount: 78
          },
          {
            id: 'kids-fallback-2',
            name: 'Kids Running Sneakers',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
            price: 1999,
            originalPrice: 2499,
            discount: 20,
            rating: 4,
            reviewCount: 89
          },
          {
            id: 'kids-fallback-3',
            name: 'Kids Leather School Shoes',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            price: 2299,
            rating: 5,
            reviewCount: 67
          },
          {
            id: 'kids-fallback-4',
            name: 'Kids Princess Tutu Dress',
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
            price: 1899,
            rating: 5,
            reviewCount: 92
          }
        ];
        setKidsProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchKidsProducts();
  }, []);

  if (loading) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <NavigationBar wishlistCount={5} onCartToggle={handleCartToggle} />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading kids collection...</p>
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

        {/* Hero Section for Kids */}
        <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20 mb-2">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-7xl font-bold mb-8"
            >
              KIDS COLLECTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-green-100"
            >
              Fun and comfortable clothing for your little ones
            </motion.p>
          </div>
        </section>

        {/* Products Section */}
        <ProductGrid products={kidsProducts} />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default KidsPage;