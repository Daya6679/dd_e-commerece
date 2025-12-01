'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface NavigationBarProps {
  wishlistCount?: number;
  onSearch?: (query: string) => void;
  onCartToggle?: () => void;
  onWishlistToggle?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  wishlistCount = 0,
  onSearch,
  onCartToggle,
  onWishlistToggle
}) => {
  const { getCartItemCount, getWishlistCount } = useCart();
  const cartItemCount = getCartItemCount();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-1 text-sm">
        FREE SHIPPING on orders above ₹999 | Extra 10% off on first purchase
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg"></span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Fashion club
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { label: 'HOME', href: '/' },
              { label: 'MEN', href: '/men' },
              { label: 'WOMEN', href: '/women' },
              { label: 'KIDS', href: '/kids' },
              { label: 'BEAUTY', href: '/beauty' }
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="font-medium text-gray-700 hover:text-pink-600 transition-colors duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  if (item.href.startsWith('/')) {
                    // For internal routes, let Next.js handle navigation
                    return;
                  }
                  // For anchor links, prevent default and scroll
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              initial={{ scale: 0, y: -20 }}
              animate={{
                scale: 1,
                y: 0,
                rotate: [0, -10, 10, -5, 5, 0]
              }}
              transition={{
                scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.4 },
                y: { type: "spring", stiffness: 300, damping: 25, delay: 0.4 },
                rotate: { duration: 0.8, delay: 0.6, ease: "easeInOut" }
              }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: {
                  scale: { type: "spring", stiffness: 400, damping: 10 },
                  rotate: { duration: 0.4, ease: "easeInOut" }
                }
              }}
              whileTap={{
                scale: 0.9,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <motion.svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </motion.svg>
              {/* Twinkle effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.2,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full rounded-full bg-yellow-300 opacity-20 blur-sm" />
              </motion.div>
            </motion.button>

            {/* Wishlist */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.8
              }}
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{
                scale: 0.9,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              onClick={onWishlistToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <motion.svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </motion.svg>
              {getWishlistCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    delay: 1.8
                  }}
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {getWishlistCount()}
                </motion.span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.6
              }}
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{
                scale: 0.9,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              onClick={onCartToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <motion.svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h13M12 18a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 0 000-4z" />
              </motion.svg>
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    delay: 1.6
                  }}
                  className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Account */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.2
              }}
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{
                scale: 0.9,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              onClick={() => {
                // This will be handled by parent component
                const event = new CustomEvent('openUserProfile');
                window.dispatchEvent(event);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <motion.svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                  />
                  <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-md hover:from-pink-600 hover:to-purple-700 transition-all"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavigationBar;