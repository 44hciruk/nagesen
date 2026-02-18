import { useEffect, useState } from 'react';

/**
 * Design Philosophy: Japanese Tradition meets Modern Humor
 * - Saisen-bako (offering box) + Maneki-neko (lucky cat) theme
 * - Realistic coin animation with rotation for celebratory feeling
 * - Large, bold serif text "投げ銭を贈る" (throw coins/donate) above maneki-neko
 * - Warm yellow gradient background
 * - Cohesive color scheme throughout
 */

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  // Show content immediately
  useEffect(() => {
    setShowContent(true);
  }, []);

  // Handle redirect to PayPay
  const handlePayPayRedirect = () => {
    const payPayUrl = 'https://qr.paypay.ne.jp/p2p01_nd8UMxxYcZOhhHUu';
    window.location.href = payPayUrl;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-amber-100 overflow-hidden relative">
      {/* Coin rain animation - with rotation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-40px`,
              width: '28px',
              height: '28px',
              background: 'radial-gradient(circle at 30% 30%, #FFED4E, #FFD700)',
              border: '2px solid #DAA520',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset -1px -1px 3px rgba(0,0,0,0.3)',
              animationName: 'coinSpin',
              animationDuration: `${6 + Math.random() * 2}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${i * 0.5}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes coinSpin {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
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
            opacity: 1;
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
            className="relative w-full py-7 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 fade-in-up-delay-2 overflow-hidden"
            onMouseDown={(e) => {
              const button = e.currentTarget;
              const rect = button.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              const ripple = document.createElement('span');
              ripple.style.position = 'absolute';
              ripple.style.left = x + 'px';
              ripple.style.top = y + 'px';
              ripple.style.width = '20px';
              ripple.style.height = '20px';
              ripple.style.background = 'rgba(255, 255, 255, 0.6)';
              ripple.style.borderRadius = '50%';
              ripple.style.pointerEvents = 'none';
              ripple.style.animationName = 'ripple';
              ripple.style.animationDuration = '0.6s';
              ripple.style.animationTimingFunction = 'ease-out';
              ripple.style.transform = 'translate(-50%, -50%)';
              
              button.appendChild(ripple);
              
              setTimeout(() => ripple.remove(), 600);
            }}
          >
            PayPayを開く
          </button>
        </div>
      )}
    </div>
  );
}
