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
              animationName: 'coinFall',
              animationDuration: `${4 + Math.random() * 2}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
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
              src="https://private-us-east-1.manuscdn.com/sessionFile/sEcir6chkXZ4TN1hcybGzY/sandbox/tYPqTsy0u7RHg8TXS9iTIm-img-1_1771378127000_na1fn_c2Fpc2VuLW1hbmVraS12Mg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0VjaXI2Y2hyWFo0VE4xaGN5Ykd6WS9zYW5kYm94L3RZUHFUc3kwdTdSSGc4VFhTOWlUSW0taW1nLTFfMTc3MTM3ODEyNzAwMF9uYTFmbl9jMkZwYzJWdUxXMWhibVZyYVMxMk1nLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=skzOqrKW9P-4lHcJRpm1kIz-byKrD2d3fcrXNFX~UcvyJhrZDlowqvDKrdM53PN1HKmhkO01OtPW9p46e8QVIT4edHjl2NPAt-EMRi-2Jt2yMOfwU90bp2QhxinrvoBTlrmsuRgp913CNTJsxOmK2EvCr2aF0ob66Ca68dXXEyTUtWi3X-hH76di~kdhuTqlyPzzHvS4Eay0MpFjxGDpFCVCRkY9bH~hZPC~4Pb6Frq7btcEJzWRhZzDj4tjVB4Poos~I7ibdI2in9~8mcDilrtGFLsqEjiLmOWAYOlutk03r56M3uzujJE8AFuqp0vs1dzZpIUe--1hY5qWt8iNOQ__"
              alt="Saisen-bako with Maneki-neko"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Main heading - only "投げ銭を贈る" */}
          <h1 className="text-4xl font-black text-center mb-8 text-amber-900 fade-in-up-delay-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            投げ銭を贈る
          </h1>

          {/* CTA Button - red gradient with white text */}
          <Button
            onClick={handlePayPayRedirect}
            className="w-full py-7 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 fade-in-up-delay-2"
          >
            PayPayを開く
          </Button>
        </div>
      )}
    </div>
  );
}
