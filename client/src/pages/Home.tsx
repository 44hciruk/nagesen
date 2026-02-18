import { useEffect, useState } from 'react';

/**
 * Design Philosophy: Japanese Tradition meets Modern Humor
 * - Saisen-bako (offering box) + Maneki-neko (lucky cat) theme
 * - Lightweight coin animation for smooth performance
 * - Large, bold serif text "投げ銭を贈る" (throw coins/donate) above maneki-neko
 * - Warm yellow gradient background
 * - Cohesive color scheme throughout
 */

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Show content immediately
  useEffect(() => {
    setShowContent(true);
  }, []);

  // Handle redirect to PayPay
  const handlePayPayRedirect = () => {
    const payPayUrl = 'https://qr.paypay.ne.jp/p2p01_nd8UMxxYcZOhhHUu';
    window.location.href = payPayUrl;
  };

  // Handle ripple effect
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-amber-100 overflow-hidden relative">
      {/* Coin rain animation - ultra lightweight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i + 1) * 20}%`,
              top: `-40px`,
              width: '24px',
              height: '24px',
              background: 'radial-gradient(circle at 35% 35%, #FFED4E, #FFD700)',
              border: '2px solid #DAA520',
              borderRadius: '50%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              animation: `coinFall ${7 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes coinFall {
          0% {
            transform: translateY(0);
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

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .fade-in-up-delay-1 {
          animation: fadeInUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .fade-in-up-delay-2 {
          animation: fadeInUp 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .pop-in {
          animation: popIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          pointer-events: none;
          animation: ripple 0.6s ease-out forwards;
        }
      `}</style>

      {/* Main content */}
      {showContent && (
        <div className="flex flex-col items-center justify-center z-10 px-6 max-w-md">
          {/* Main heading - above maneki-neko */}
          <h1 
            className="text-5xl font-black text-center mb-6 text-amber-900 fade-in-up" 
            style={{
              textShadow: '3px 3px 6px rgba(0,0,0,0.15)',
              fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif",
              fontWeight: 900,
              letterSpacing: '0.05em'
            }}
          >
            投げ銭を贈る
          </h1>

          {/* Maneki-neko image with pop-in animation */}
          <div className="w-64 h-64 mb-12 relative pop-in">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/YXhSFzJbaTvJqWxQ.png"
              alt="Maneki-neko"
              className="w-full h-full object-contain"
            />
          </div>

          {/* CTA Button - red gradient with ripple effect */}
          <button
            onClick={handlePayPayRedirect}
            onMouseDown={handleMouseDown}
            className="relative px-8 py-4 text-base font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 fade-in-up-delay-2 overflow-hidden"
          >
            PayPayを開く
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="ripple-effect"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: '20px',
                  height: '20px',
                  marginLeft: '-10px',
                  marginTop: '-10px',
                }}
              />
            ))}
          </button>
        </div>
      )}
    </div>
  );
}
