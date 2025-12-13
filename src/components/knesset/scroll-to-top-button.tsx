"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show button when scrolled down more than 300px
      // Hide button when scrollY <= 300 (which includes < 100)
      setIsVisible(scrollY > 300);
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className={cn(
        "fixed bottom-6 left-6 h-12 w-12 rounded-full shadow-lg z-50",
        "transition-opacity duration-300",
        "hover:scale-110 active:scale-95",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="חזרה למעלה"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
