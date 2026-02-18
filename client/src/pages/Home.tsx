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

  // Show content with floating animation and auto-play meow sound
  useEffect(() => {
    setShowContent(true);
    // Show both calligraphy and maneki-neko simultaneously
    setShowCalligraphy(true);
    setShowManekiNeko(true);
    
    // Auto-play meow sound on page load
    const audio = new Audio('https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/SxgKHkdlVWUSQCQF.wav');
    audio.play().catch(() => {
      // Silently fail if audio can't play
    });
  }, []);

  // Handle ripple effect on button click
  const handleRippleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    // Play meow sound
    const audio = new Audio('https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/SxgKHkdlVWUSQCQF.wav');
    audio.play().catch(() => {
      // Silently fail if audio can't play
    });

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

  // Generate random coins with varying positions and speeds
  const coins = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 8 + Math.random() * 2,
    delay: (i / 8) * 1.0,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-amber-100 overflow-hidden relative" style={{ backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/djAUtxiQqvVXUVEv.png)', backgroundBlendMode: 'multiply', backgroundSize: '400px 400px' }}>
      {/* Coin rain animation - 12 coins with random positions and speeds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="absolute rounded-full"
            style={{
              left: `${coin.left}%`,
              top: `-40px`,
              width: '24px',
              height: '24px',
              background: 'radial-gradient(circle at 35% 35%, #FFED4E, #FFD700)',
              border: '2px solid #DAA520',
              borderRadius: '50%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              animationName: 'coinFall',
              animationDuration: `${coin.duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${coin.delay}s`,
              willChange: 'transform',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes coinFall {
          0% {
            transform: translateY(0) rotateY(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(50vh) rotateY(180deg);
          }
          100% {
            transform: translateY(100vh) rotateY(360deg);
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
      `}</style>

      {/* Main content */}
      {showContent && (
        <div className="flex flex-col items-center justify-center z-10 px-6 max-w-md gap-8 fade-in-up fade-in-up-delay-2">
          {/* Main heading - calligraphy image */}
          {showCalligraphy && (
            <div style={{ animation: 'floatIn 0.8s ease-out forwards' }}>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/vMNSMVVvrhnUKaWC.png"
                alt="投げ銭を贈る"
                className="h-33 object-contain"
              />
            </div>
          )}

          {/* Maneki-neko image with floating animation */}
          {showManekiNeko && (
            <div className="w-56 h-56 relative -mt-10" style={{ animation: 'floatIn 0.8s ease-out forwards' }}>
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/BHlLtdKUUWXnMFIV.png"
                alt="Maneki-neko"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* CTA Button - red gradient with ripple animation */}
          <button
            onClick={handleRippleClick}
            className="relative px-10 py-5 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 fade-in-up-delay-2 button-pulse overflow-hidden"
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
