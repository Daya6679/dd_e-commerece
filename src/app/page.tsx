'use client';

import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import UserProfile from '../components/UserProfile';
import Wishlist from '../components/Wishlist';
import { CartProvider } from '../contexts/CartContext';

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

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const handleProfileOpen = () => setIsProfileOpen(true);
    const handleWishlistOpen = () => setIsWishlistOpen(true);

    window.addEventListener('openUserProfile', handleProfileOpen);
    window.addEventListener('openWishlist', handleWishlistOpen);

    return () => {
      window.removeEventListener('openUserProfile', handleProfileOpen);
      window.removeEventListener('openWishlist', handleWishlistOpen);
    };
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Fetch products from all categories
        const [menResponse, womenResponse, jeweleryResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/products/category/men\'s%20clothing'),
          fetch('https://fakestoreapi.com/products/category/women\'s%20clothing'),
          fetch('https://fakestoreapi.com/products/category/jewelery')
        ]);

        const [menData, womenData, jeweleryData] = await Promise.all([
          menResponse.json(),
          womenResponse.json(),
          jeweleryResponse.json()
        ]);

        // Transform and combine all products
        const menProducts: Product[] = menData.map((item: any) => ({
          id: `men-${item.id}`,
          name: item.title,
          image: item.image,
          price: Math.round(item.price * 83),
          rating: Math.round(item.rating.rate),
          reviewCount: item.rating.count,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : undefined,
        }));

        const womenProducts: Product[] = womenData.map((item: any) => ({
          id: `women-${item.id}`,
          name: item.title,
          image: item.image,
          price: Math.round(item.price * 83),
          rating: Math.round(item.rating.rate),
          reviewCount: item.rating.count,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : undefined,
        }));

        const beautyProducts: Product[] = jeweleryData.map((item: any) => ({
          id: `beauty-${item.id}`,
          name: item.title,
          image: item.image,
          price: Math.round(item.price * 83),
          rating: Math.round(item.rating.rate),
          reviewCount: item.rating.count,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : undefined,
        }));

        // Add more comprehensive kids products (dresses and shoes)
        const kidsProducts: Product[] = [
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
            id: 'kids-shoes-1',
            name: 'Kids Running Sneakers',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
            price: 1999,
            originalPrice: 2499,
            discount: 20,
            rating: 4,
            reviewCount: 89
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
            id: 'kids-shoes-2',
            name: 'Kids Leather School Shoes',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            price: 2299,
            rating: 5,
            reviewCount: 67
          },
          {
            id: 'kids-dress-3',
            name: 'Kids School Pinafore Dress',
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=400&h=400&fit=crop',
            price: 1299,
            originalPrice: 1699,
            discount: 23,
            rating: 4,
            reviewCount: 156
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
            id: 'kids-shoes-4',
            name: 'Kids Casual Sandals',
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
            price: 999,
            rating: 4,
            reviewCount: 112
          }
        ];

        const combinedProducts = [...menProducts, ...womenProducts, ...beautyProducts, ...kidsProducts];
        setAllProducts(combinedProducts);
        setFilteredProducts(combinedProducts);

      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to sample products
        const fallbackProducts: Product[] = [
          {
            id: '1',
            name: 'Floral Maxi Dress',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
            price: 2999,
            originalPrice: 3999,
            discount: 25,
            rating: 4,
            reviewCount: 128
          },
          {
            id: '2',
            name: 'Designer Handbag',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
            price: 4999,
            rating: 5,
            reviewCount: 89
          }
        ];
        setAllProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <NavigationBar wishlistCount={5} onCartToggle={handleCartToggle} />
          <HeroSection />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
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
        <NavigationBar wishlistCount={5} onSearch={handleSearch} onCartToggle={handleCartToggle} onWishlistToggle={() => setIsWishlistOpen(true)} />
        <HeroSection />
        <div id="products-section">
          <ProductGrid products={filteredProducts} />
        </div>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <UserProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      </div>
    </CartProvider>
  );
}
