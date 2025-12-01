'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const HeroSection: React.FC = () => {
  const router = useRouter();

  const handleShopNow = () => {
    // Scroll to products section on the same page
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100">
      <div className="text-center z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6"
        >
          Fashion Redefined
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl text-gray-600 mb-12 max-w-4xl mx-auto"
        >
          Discover the latest trends in fashion, beauty & lifestyle
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShopNow}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-6 rounded-full font-semibold text-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;