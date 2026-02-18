import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Design Philosophy: Japanese Tradition meets Modern Humor
 * - Saisen-bako (offering box) + Maneki-neko (lucky cat) theme
 * - Realistic coin animation for celebratory feeling
 * - Large, bold text "投げ銭を贈る" (throw coins/donate)
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
      {/* Realistic coin rain animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-60px`,
              animation: `coinFall ${4 + Math.random() * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {/* Coin SVG */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="drop-shadow-md"
            >
              <circle cx="16" cy="16" r="14" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
              <circle cx="16" cy="16" r="12" fill="none" stroke="#FFF8DC" strokeWidth="1" opacity="0.6" />
              <text x="16" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B6914" fontFamily="serif">
                ¥
              </text>
            </svg>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes coinFall {
          0% {
            transform: translateY(0) rotateY(0deg);
            opacity: 0.9;
          }
          50% {
            opacity: 0.7;
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
      `}</style>

      {/* Main content */}
      {showContent && (
        <div className="flex flex-col items-center justify-center z-10 px-6 max-w-md">
          {/* Saisen-bako + Maneki-neko image */}
          <div className="w-40 h-40 mb-12 fade-in-up">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/sEcir6chkXZ4TN1hcybGzY/sandbox/TH26OjOaZ9POIFyWLxcsTi-img-1_1771377790000_na1fn_c2Fpc2VuLW1hbmVraQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0VjaXI2Y2hyWFo0VE4xaGN5Ykd6WS9zYW5kYm94L1RIMjZPak9hWjlQT0lGeVdMeGNzVGktaW1nLTFfMTc3MTM3Nzc5MDAwMF9uYTFmbl9jMkZwYzJWdUxXMWhibVZyYVEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rjLVw5iaKi0aHY7JyFzjoZt8YA9YvhSAOP1Sc2jYmox0KBDRvasIyqTbSD6yoNYNu9pEcvztX2IeOdeyikNTZd7XlnhAgubRq~sFOpjHLlZHpI99oOW0ljvthFUdvILfuqWmf-4UwkUTmQ8S4ScnW4hDV4XkgzLXe06voCiaR2C-OZ~rgAA8FH52qe5rOZk2gJ1oLicTjJIWrtCNXXiF93~nZLOt5~0Z-UtC~7qGrx5TVkLiayxVtjlSPRTigbSX-k5BPjkCUENyJcdPOZEeae~67SUXTpekR9YtJLCC2afTX-Q-wqH78PwSLy~UZ90jcD~fEtnx~a6zBB7f0JmaNA__"
              alt="Saisen-bako with Maneki-neko"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Main heading - only "投げ銭を贈る" */}
          <h1 className="text-6xl font-black text-center mb-8 text-amber-900 fade-in-up-delay-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            投げ銭を贈る
          </h1>

          {/* CTA Button - styled to match yellow theme */}
          <Button
            onClick={handlePayPayRedirect}
            className="w-full py-7 text-lg font-bold mb-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 fade-in-up-delay-2 border-2 border-amber-600"
          >
            PayPayを開く
          </Button>

          {/* Back button - subtle */}
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            className="w-full text-amber-700 hover:text-amber-900 hover:bg-amber-50 fade-in-up-delay-2"
          >
            ← 戻る
          </Button>
        </div>
      )}
    </div>
  );
}
