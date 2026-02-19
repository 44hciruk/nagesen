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

  // Generate random coins and sparkles with varying positions and speeds
  const coins = Array.from({ length: 12 }, (_, i) => {
    const isSparkle = Math.random() > 0.6;
    const rotation = Math.random() * 360;
    return {
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 2,
      delay: (i / 12) * 1.0,
      isSparkle,
      rotation,
    };
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-amber-100 overflow-hidden relative" style={{ backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/UAYUTUlSRcSDmskr.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Coin rain animation - coins and sparkles with random positions and speeds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {coins.map((coin) => {
          if (coin.isSparkle) {
            return (
              <div
                key={coin.id}
                className="absolute"
                style={{
                  left: `${coin.left}%`,
                  top: `-20px`,
                  width: '16px',
                  height: '16px',
                  background: '#FFD700',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)',
                  animationName: 'coinFall',
                  animationDuration: `${coin.duration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${coin.delay}s`,
                  willChange: 'transform',
                } as React.CSSProperties}
              />
            );
          }
          return (
            <div
              key={coin.id}
              className="absolute rounded-full"
              style={{
                left: `${coin.left}%`,
                top: `-40px`,
                width: '28px',
                height: `${Math.abs(Math.cos(coin.rotation * Math.PI / 180)) * 28 + 8}px`,
                background: 'radial-gradient(circle at 30% 30%, #FFED4E 0%, #FFD700 50%, #DAA520 100%)',
                border: '2px solid #DAA520',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                animationName: 'coinFall',
                animationDuration: `${coin.duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${coin.delay}s`,
                willChange: 'transform',
                transform: `rotateX(${coin.rotation}deg)`,
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes coinFall {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(50vh);
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
            box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 12px 32px rgba(239, 68, 68, 0.6);
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
          transform: scale(1);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
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
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/RLNvuDxvwcfhfBXr.png"
                alt="投げ銭を贈る"
                className="h-32 w-auto drop-shadow-lg"
              />
            </div>
          )}

          {/* Maneki-neko (lucky cat) */}
          {showManekiNeko && (
            <div style={{ animation: 'floatIn 2s ease-in forwards' }} className="-mt-6">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/zKNvNnRXEhNQhKfI.png"
                alt="招き猫"
                className="h-56 w-auto drop-shadow-xl"
              />
            </div>
          )}

          {/* PayPay button */}
          <button
            onClick={handleRippleClick}
            className="relative px-12 py-4 bg-red-500 text-white font-bold text-lg rounded-full hover:bg-red-600 transition-colors overflow-hidden"
            style={{ animation: 'floatIn 2s ease-in forwards, buttonPulse 1.2s ease-in-out infinite' }}
          >
            PayPayを開く
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="ripple"
                style={{
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: '0',
                  height: '0',
                }}
              />
            ))}
          </button>
        </div>
      )}
    </div>
  );
}
