import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

/**
 * Design Philosophy: Playful & Engaging
 * - Yo-yo theme to represent "throwing money" as a joke
 * - Coin rain animation for celebratory feeling
 * - Large, bold text to make the joke clear
 * - Smooth animations and transitions
 */

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Simulate loading animation (1.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle redirect to PayPay
  const handlePayPayRedirect = () => {
    const payPayUrl = 'https://qr.paypay.ne.jp/p2p01_nd8UMxxYcZOhhHUu';
    window.location.href = payPayUrl;
  };

  // Handle go back
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100 via-yellow-100 to-orange-100 overflow-hidden relative">
      {/* Coin rain background animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 rounded-full bg-yellow-300 opacity-0 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-50px`,
              animation: `fall ${3 + i * 0.5}s infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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

        .yoyo-spin {
          animation: spin 2s linear infinite;
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

      {/* Loading screen */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center z-10">
          <div className="w-24 h-24 mb-6">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/sEcir6chkXZ4TN1hcybGzY/sandbox/h7IeElmcfe5fb5a6Uk2YFl-img-1_1771377019000_na1fn_eW95by1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0VjaXI2Y2hrWFo0VE4xaGN5Ykd6WS9zYW5kYm94L2g3SWVFbG1jZmU1ZmI1YTZVazJZRmwtaW1nLTFfMTc3MTM3NzAxOTAwMF9uYTFmbl9lVzk1Ynkxb1pYSnYucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=iyRCWpQOeAID303DwhG1cxE-7dMMXZAFbrDjY4togJaTXoGmefIXmd0Or9tPa6uJuWFPtfEkaODaGmp-fLvdB~1~eGr~ZA2~ikH~QGnPPhBKJTs-IWsFj7h8toFm508GACCj~~9VhPSK7dfHcl8B0ugFxpiT~QQIv~nY8F7o5PUK4LngkwAJIPXwfN9oSyUPmuzuCaIQGquZsKTlERgGRM53AM2Gaaqz9Pr~VCgGPMQLqUMrXIl--36uXPNDqWQXPF97gys0t~DRX~32Y-TRKzjHUh6ooPNACcR3OpMt9OrOb4hfE-O9ZnrofX7taWEA-K1cWdIZxCbWdMNzHemxsw__"
              alt="Yo-yo"
              className="w-full h-full object-contain yoyo-spin"
            />
          </div>
          <p className="text-lg font-semibold text-gray-700 fade-in-up">投げ銭を贈る準備中...</p>
        </div>
      )}

      {/* Main content */}
      {showContent && (
        <div className="flex flex-col items-center justify-center z-10 px-6 max-w-md">
          {/* Yo-yo image */}
          <div className="w-32 h-32 mb-8 fade-in-up">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/sEcir6chkXZ4TN1hcybGzY/sandbox/h7IeElmcfe5fb5a6Uk2YFl-img-1_1771377019000_na1fn_eW95by1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0VjaXI2Y2hrWFo0VE4xaGN5Ykd6WS9zYW5kYm94L2g3SWVFbG1jZmU1ZmI1YTZVazJZRmwtaW1nLTFfMTc3MTM3NzAxOTAwMF9uYTFmbl9lVzk1Ynkxb1pYSnYucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=iyRCWpQOeAID303DwhG1cxE-7dMMXZAFbrDjY4togJaTXoGmefIXmd0Or9tPa6uJuWFPtfEkaODaGmp-fLvdB~1~eGr~ZA2~ikH~QGnPPhBKJTs-IWsFj7h8toFm508GACCj~~9VhPSK7dfHcl8B0ugFxpiT~QQIv~nY8F7o5PUK4LngkwAJIPXwfN9oSyUPmuzuCaIQGquZsKTlERgGRM53AM2Gaaqz9Pr~VCgGPMQLqUMrXIl--36uXPNDqWQXPF97gys0t~DRX~32Y-TRKzjHUh6ooPNACcR3OpMt9OrOb4hfE-O9ZnrofX7taWEA-K1cWdIZxCbWdMNzHemxsw__"
              alt="Yo-yo"
              className="w-full h-full object-contain yoyo-spin"
            />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-black text-center mb-4 text-purple-700 fade-in-up-delay-1">
            投げ銭を贈る
          </h1>

          {/* Subheading */}
          <p className="text-xl text-center text-gray-700 mb-8 fade-in-up-delay-2">
            ヨーヨーをタッチして、投げ銭を贈りましょう！
          </p>

          {/* CTA Button */}
          <Button
            onClick={handlePayPayRedirect}
            className="w-full py-6 text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 fade-in-up-delay-2"
          >
            PayPayを開く
          </Button>

          {/* Back button */}
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-800 fade-in-up-delay-2"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
        </div>
      )}
    </div>
  );
}
