"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Section {
  id: string;
  title: string;
}

interface SectionNavigationProps {
  sections: Section[];
}

export default function SectionNavigation({ sections }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    // Handle scroll to update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for sticky nav

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    // Handle hash on page load
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setActiveSection(hash);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Card className="sticky top-20 z-10 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="flex flex-wrap gap-2 justify-center" dir="rtl">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleClick(section.id)}
            className={cn(
              "transition-all",
              activeSection === section.id && "shadow-md"
            )}
          >
            {section.title}
          </Button>
        ))}
      </nav>
    </Card>
  );
}

