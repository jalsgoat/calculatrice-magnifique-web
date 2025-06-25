
import React from 'react';
import { useProducts } from '@/contexts/ProductsContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import ReviewsSection from '../components/ReviewsSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  const { loading, siteData } = useProducts();

  if (loading || !siteData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <ReviewsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
