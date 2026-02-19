import { useState, useEffect } from 'react';

/**
 * Design Philosophy: Japanese Tradition meets Modern Humor
 * - Saisen-bako (offering box) + Maneki-neko (lucky cat) theme
 * - Lightweight coin animation for smooth performance
 * - Calligraphy text "投げ銭を贈る" (throw coins/donate) above maneki-neko
 * - Warm yellow gradient background
 * - Cohesive color scheme throughout
 */

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showCalligraphy, setShowCalligraphy] = useState(false);
  const [showManekiNeko, setShowManekiNeko] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const rippleIdRef = useState(0)[1];

  // Show content with gentle fade-in animation and prevent scrolling
  useEffect(() => {
    setShowContent(true);
    // Show both calligraphy and maneki-neko simultaneously
    setShowCalligraphy(true);
    setShowManekiNeko(true);
    
    // Prevent vertical scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle ripple effect on button click
  const handleRippleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    // Trigger redirect after a short delay
    setTimeout(() => {
      handlePayPayRedirect();
    }, 100);
  };

  // Handle redirect to PayPay
  const handlePayPayRedirect = () => {
    const payPayUrl = 'https://qr.paypay.ne.jp/p2p01_nd8UMxxYcZOhhHUu';
    window.location.href = payPayUrl;
  };

  // Generate random coins with varying positions, speeds, and types
  // Create continuous waterfall effect with staggered delays
  const coins = Array.from({ length: 6 }, (_, i) => {
    const coinTypes = ['coin2', 'coin3', 'coin4', 'coin5'];
    const randomType = coinTypes[Math.floor(Math.random() * coinTypes.length)];
    const duration = 10 + Math.random() * 3; // Slower fall (10-13s)
    return {
      id: i,
      left: Math.random() * 100,
      duration: duration,
      delay: i * 1.5, // Larger gap between coins (1.5s each)
      type: randomType,
      isSparkle: false,
    };
  });

  // Generate sparkles (キラキラ) mixed with coins - reduced to 4 for less overlap
  const sparkles = Array.from({ length: 4 }, (_, i) => {
    const sparkleTypes = ['kira1', 'kira2'];
    const randomType = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
    const duration = (8 + Math.random() * 4) / 0.7; // 70% speed (11.4-17.1s)
    return {
      id: `sparkle-${i}`,
      left: Math.random() * 100,
      duration: duration,
      delay: Math.random() * 3, // Random staggered start
      type: randomType,
      isSparkle: true,
    };
  });

  // Combine coins and sparkles
  const items = [...coins, ...sparkles];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-amber-100 overflow-hidden relative" style={{ backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/UAYUTUlSRcSDmskr.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Coin rain animation - 12 coins with random positions and speeds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {items.map((item) => {
          if (item.isSparkle) {
            // Render sparkle
            const sparkleImages: Record<string, string> = {
              kira1: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/SADnSLicALtKhvRl.svg',
              kira2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/aZrRbCeIorsfZvEG.svg',
            };
            return (
              <img
                key={item.id}
                src={sparkleImages[item.type]}
                alt="sparkle"
                style={{
                  position: 'absolute',
                  left: `${item.left}%`,
                  top: `-40px`,
                  width: '24px',
                  height: 'auto',
                  animationName: 'coinFall',
                  animationDuration: `${item.duration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${item.delay}s`,
                  willChange: 'transform',
                  opacity: 0.2,
                  filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))',
                } as React.CSSProperties}
              />
            );
          } else {
            // Render coin
            const coin = item;
            const coinImages: Record<string, string> = {
              coin2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/wogAFEOmgxzUhAka.svg',
              coin3: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/OiOJcZEnXdubRMbq.svg',
              coin4: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/MdzMoiuFzpDjrKgJ.svg',
              coin5: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/cNVVFaQqgDnGyUBo.svg',
            };
            return (
              <img
                key={coin.id}
                src={coinImages[coin.type]}
                alt="coin"
                style={{
                  position: 'absolute',
                  left: `${coin.left}%`,
                  top: `-50px`,
                  width: '38px',
                  height: 'auto',
                  animationName: 'coinFall',
                  animationDuration: `${coin.duration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${coin.delay}s`,
                  willChange: 'transform',
                  opacity: 0.2,
                } as React.CSSProperties}
              />
            );
          }
        })}
      </div>

      <style>{`
        @keyframes coinFall {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 12px 32px rgba(239, 68, 68, 0.6);
          }
        }

        @keyframes buttonGlow {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.1);
          }
        }

        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 600px;
            height: 600px;
            opacity: 0;
          }
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          pointer-events: none;
          animation: ripple 0.6s ease-out;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .fade-in-up-delay-2 {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.4s;
        }

        .pop-in {
          animation: popIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .button-pulse {
          animation: buttonPulse 1.2s ease-in-out infinite, buttonGlow 1.2s ease-in-out infinite;
        }

        /* Ensure button animations work with inline styles */
        button {
          animation-delay: 0s;
        }
      `}</style>

      {/* Main content */}
      {showContent && (
        <div className="flex flex-col items-center justify-center z-10 px-6 max-w-md gap-6 -mt-32">
          {/* Main heading - calligraphy image */}
          {showCalligraphy && (
            <div style={{ animation: 'floatIn 2s ease-in forwards' }}>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/NvoOCWMTdfPIJRxj.png"
                alt="投げ銭を贈る"
                className="h-32 object-contain"
              />
            </div>
          )}

          {/* Maneki-neko image with floating animation */}
          {showManekiNeko && (
            <div className="w-64 h-64 relative -mt-10" style={{ animation: 'floatIn 2s ease-in forwards' }}>
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/KFLaeEugoUKIrops.png"
                alt="Maneki-neko"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}

          {/* CTA Button - red gradient with ripple animation */}
          <button
            onClick={handleRippleClick}
            style={{ animation: 'floatIn 2s ease-in forwards, buttonPulse 1.2s ease-in-out infinite' }}
            className="relative px-12 py-5 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="ripple"
                style={{
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
            PayPayを開く
          </button>
        </div>
      )}
    </div>
  );
}
