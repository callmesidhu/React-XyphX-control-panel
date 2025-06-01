
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20 animate-pulse"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo container with glassmorphism */}
        <div className="relative group">
          {/* Holographic backdrop */}
          
          {/* Glass container */}
            {/* Animated border glow */}
            
            {/* Logo */}
            <div className="relative z-10">
              <img 
                src="/logo_dark.png" 
                alt="XyphX Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain filter-50 abosolute"
                
              />
            </div>
          
        </div>
        
        {/* Loading animation */}
        <div className="flex flex-col items-center space-y-4">
          {/* Rotating ring loader */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-transparent border-r-primary/60 rounded-full animate-spin-reverse"></div>
          </div>
          
          {/* Glitch text effect */}
          <div className="relative">
            <h2 className="text-2xl uppercase md:text-3xl font-bold text-primary animate-pulse glow-text">
              initializing

            </h2>
         
          </div>
          
          {/* Progress dots */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
        
      </div>
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
