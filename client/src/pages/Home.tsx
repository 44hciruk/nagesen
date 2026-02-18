import { useEffect, useState } from 'react';

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
      {/* Coin rain animation - increased to 6 coins */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i + 1) * 14}%`,
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

        @keyframes buttonPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
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

        .button-pulse {
          animation: buttonPulse 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Main content */}
      {showContent && (
        <div className="flex flex-col items-center justify-center z-10 px-6 max-w-md gap-8">
          {/* Main heading - calligraphy image */}
          <div className="fade-in-up">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/vMNSMVVvrhnUKaWC.png"
              alt="投げ銭を贈る"
              className="h-32 object-contain"
            />
          </div>

          {/* Maneki-neko image with pop-in animation */}
          <div className="w-56 h-56 relative pop-in -mt-6">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/YXhSFzJbaTvJqWxQ.png"
              alt="Maneki-neko"
              className="w-full h-full object-contain"
            />
          </div>

          {/* CTA Button - red gradient with pulse animation */}
          <button
            onClick={handlePayPayRedirect}
            className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 fade-in-up-delay-2 button-pulse"
          >
            PayPayを開く
          </button>
        </div>
      )}
    </div>
  );
}
