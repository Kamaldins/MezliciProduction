import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  lang?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, lang }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Description
    setMetaTag('description', description);

    // Update Keywords
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Update HTML lang attribute
    if (lang) {
      document.documentElement.lang = lang;
    }

    // Update Open Graph tags for better sharing
    const setOgTag = (property: string, content: string) => {
       let element = document.querySelector(`meta[property="${property}"]`);
       if (!element) {
         element = document.createElement('meta');
         element.setAttribute('property', property);
         document.head.appendChild(element);
       }
       element.setAttribute('content', content);
    };
    
    setOgTag('og:title', title);
    setOgTag('og:description', description);
    setOgTag('og:type', 'website');
    // We could add og:image and og:url here if we had access to full URL and default image

  }, [title, description, keywords, lang]);

  return null;
};

export default SEO;