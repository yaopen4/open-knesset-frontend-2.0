"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    // Handle scroll to update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

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
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-background" dir="rtl">
      <div className="text-sm font-semibold mb-3 text-foreground text-right">תוכן עניינים</div>
      <nav dir="rtl">
        <ul className="space-y-2 text-sm" dir="rtl">
          {sections.map((section, index) => (
            <li key={section.id} dir="rtl">
              <button
                onClick={() => handleClick(section.id)}
                className={cn(
                  "text-right w-full hover:underline transition-colors",
                  activeSection === section.id 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                dir="rtl"
              >
                {index + 1}. {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
