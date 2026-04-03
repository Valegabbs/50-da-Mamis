/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MENU_ITEMS = [
  { 
    id: 'homenagem', 
    label: 'Homenagem', 
    url: 'https://drive.google.com/file/d/1GTRA4Fp9DrANhuFK2VunwMTHVz87t-O1/view?usp=sharing' 
  },
  { 
    id: 'clipe', 
    label: 'Clipe', 
    url: 'https://drive.google.com/file/d/1q0AC1ApF2wlTKx6cd7MH_lICYTNEPHPj/view?usp=sharing' 
  },
];

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : MENU_ITEMS.length - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev < MENU_ITEMS.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Enter') {
      handleSelect(selectedIndex);
    }
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const item = MENU_ITEMS[index];
    window.open(item.url, '_blank');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans text-white select-none">
      {/* 
          Background Image - Using the direct link format for Google Drive 
          This ensures it fits perfectly as the background of the entire site.
      */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://lh3.googleusercontent.com/d/19VPYHg6gXWxP9m1PhZPeSPVWGSGG6l0M"
          alt="Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback if the Drive link is blocked or fails
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/birthday-party/1920/1080";
          }}
        />
      </div>

      {/* Subtle overlay to ensure menu visibility on the left side, matching the DVD style */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />

      {/* Main Content - TV Safe Area - Reduced padding to move items more to the left */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-[6%] py-[5%]">
        
        {/* Menu Container - Positioned to the left to match the reference layout */}
        <div className="flex flex-col space-y-6 md:space-y-10 max-w-xl mt-20">
          {MENU_ITEMS.map((item, index) => {
            const isSelected = selectedIndex === index;
            
            return (
              <motion.button
                key={item.id}
                id={`menu-item-${item.id}`}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setSelectedIndex(index)}
                className="relative flex items-center focus:outline-none text-left w-fit group cursor-pointer"
                animate={{
                  x: isSelected ? 30 : 0,
                  scale: isSelected ? 1.05 : 1
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                {/* Bullet Point - Small dot like in the reference images */}
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full mr-5 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-white shadow-[0_0_15px_white]' 
                    : 'bg-white/40'
                }`} />

                {/* Label - Reduced size as requested, with shadow for readability */}
                <span className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                  isSelected ? 'text-white' : 'text-white/60'
                }`}>
                  {item.label}
                </span>

                {/* Selection Underline - Yellow line from the reference */}
                {isSelected && (
                  <motion.div
                    layoutId="menu-underline"
                    className="absolute -bottom-2 left-0 h-1 bg-yellow-400 w-full shadow-[0_0_12px_rgba(250,204,21,0.7)]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif;
          background-color: #000;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        /* Hide scrollbars for TV experience */
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
