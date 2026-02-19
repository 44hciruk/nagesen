import { useState, useEffect, useRef } from 'react';

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
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useState(0)[1];
  const [isThrowingEffect, setIsThrowingEffect] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bgmVolume');
      return saved ? parseFloat(saved) : 0.05;
    }
    return 0.05;
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  // Show content with gentle fade-in animation and prevent scrolling
  useEffect(() => {
    setShowContent(true);
    // Show both calligraphy and maneki-neko simultaneously
    setShowCalligraphy(true);
    setShowManekiNeko(true);
    
    // Prevent vertical scrolling
    document.body.style.overflow = 'hidden';
    
    // Initialize background music
    const initAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.loop = true;
        try {
          await audioRef.current.play();
        } catch (err) {
          console.log('Autoplay blocked, will play on interaction');
        }
      }
    };
    
    initAudio();
    
    // Fallback: play on first user interaction
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused && volume > 0) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [volume]);

  // Handle ripple effect on button click
  const handleRippleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    // Trigger throwing effect
    setIsThrowingEffect(true);
    setTimeout(() => {
      setIsThrowingEffect(false);
    }, 1500);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    // Trigger redirect after effect completes (1.2s for faster navigation)
    setTimeout(() => {
      handlePayPayRedirect();
    }, 1200);
  };

  // Handle redirect to PayPay
  const handlePayPayRedirect = () => {
    const payPayUrl = 'https://qr.paypay.ne.jp/p2p01_nd8UMxxYcZOhhHUu';
    window.location.href = payPayUrl;
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('bgmVolume', String(newVolume));
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        audioRef.current.pause();
      } else {
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  };

  // Generate random coins with varying positions, speeds, and types
  // Create continuous waterfall effect with staggered delays
  const baseCoins = Array.from({ length: 6 }, (_, i) => {
    const coinTypes = ['coin2', 'coin3', 'coin4', 'coin5'];
    const randomType = coinTypes[Math.floor(Math.random() * coinTypes.length)];
    const duration = 10 + Math.random() * 3; // Slower fall (10-13s)
    return {
      id: i,
      left: Math.random() * 100,
      duration,
      delay: Math.random() * 2,
      type: randomType,
      isBurst: false,
    };
  });

  // Generate burst coins (triggered by button click)
  const burstCoins = isThrowingEffect
    ? Array.from({ length: 160 }, (_, i) => {
        const coinTypes = ['coin2', 'coin3', 'coin4'];
        const randomType = coinTypes[Math.floor(Math.random() * coinTypes.length)];
        const duration = 1.2 + Math.random() * 0.6; // 1.2-1.8s fall
        return {
          id: `burst-${i}`,
          left: Math.random() * 100,
          duration,
          delay: Math.random() * 0.3,
          type: randomType,
          isBurst: true,
        };
      })
    : [];

  // Generate burst kira (sparkles)
  const burstKira = isThrowingEffect
    ? Array.from({ length: 70 }, (_, i) => {
        const kiraTypes = ['kira-01', 'kira-02'];
        const randomType = kiraTypes[Math.floor(Math.random() * kiraTypes.length)];
        const duration = 1.2 + Math.random() * 0.6; // 1.2-1.8s fall
        return {
          id: `kira-burst-${i}`,
          left: Math.random() * 100,
          duration,
          delay: Math.random() * 0.3,
          type: randomType,
          isBurst: true,
        };
      })
    : [];

  const allCoins = [...baseCoins, ...burstCoins];
  const allKira = [...Array.from({ length: 4 }, (_, i) => {
    const duration = 11.2 + Math.random() * 5.9; // 11.2-17.1s
    return {
      id: i,
      left: Math.random() * 100,
      duration,
      delay: Math.random() * 2,
      isBurst: false,
    };
  }), ...burstKira];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-yellow-50 via-yellow-50 to-yellow-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(200,180,140,0.1) 35px, rgba(200,180,140,0.1) 70px)`,
      }}></div>

      {/* Animated kira (sparkles) */}
      <div className="absolute inset-0 pointer-events-none">
        {allKira.map((kira) => {
          const kiraImages: Record<string, string> = {
            'kira-01': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/lfKfRqMCQfZPRxZN.svg',
            'kira-02': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/qZyaKQNNNRfYmUZP.svg',
          };
          const kiraType = 'type' in kira ? kira.type : 'kira-01';
          return (
            <img
              key={kira.id}
              src={kiraImages[kiraType] || kiraImages['kira-01']}
              alt="kira"
              style={{
                position: 'absolute',
                left: `${kira.left}%`,
                top: kira.isBurst ? '-50px' : `-50px`,
                width: kira.isBurst ? '24px' : '24px',
                height: 'auto',
                animationName: kira.isBurst ? 'burstFall' : 'coinFall',
                animationDuration: `${'duration' in kira ? kira.duration : 11.2}s`,
                animationTimingFunction: kira.isBurst ? 'ease-out' : 'linear',
                animationIterationCount: kira.isBurst ? '1' : 'infinite',
                animationDelay: `${'delay' in kira ? kira.delay : 0}s`,
                willChange: 'transform',
                opacity: kira.isBurst ? 1 : 0.2,
                zIndex: kira.isBurst ? 50 : 1,
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      {/* Animated coins */}
      <div className="absolute inset-0 pointer-events-none">
        {allCoins.map((coin) => {
          if (typeof coin.id === 'number' || coin.id.startsWith('burst')) {
            const coin_item = coin;
            const coinImages: Record<string, string> = {
              coin2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/wogAFEOmgxzUhAka.svg',
              coin3: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/OiOJcZEnXdubRMbq.svg',
              coin4: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/MdzMoiuFzpDjrKgJ.svg',
              coin5: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663052010650/cNVVFaQqgDnGyUBo.svg',
            };
            return (
              <img
                key={coin_item.id}
                src={coinImages[coin_item.type]}
                alt="coin"
                style={{
                  position: 'absolute',
                  left: `${coin_item.left}%`,
                  top: coin_item.isBurst ? '-50px' : `-50px`,
                  width: coin_item.isBurst ? '56px' : '38px',
                  height: 'auto',
                  animationName: coin_item.isBurst ? 'burstFall' : 'coinFall',
                  animationDuration: `${coin_item.duration}s`,
                  animationTimingFunction: coin_item.isBurst ? 'ease-out' : 'linear',
                  animationIterationCount: coin_item.isBurst ? '1' : 'infinite',
                  animationDelay: `${coin_item.delay}s`,
                  willChange: 'transform',
                  opacity: coin_item.isBurst ? 1 : 0.2,
                  zIndex: coin_item.isBurst ? 50 : 1,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformStyle: 'flat',
                  WebkitTransformStyle: 'flat',
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

        @keyframes burstFall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
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

      {/* Background music */}
      <audio ref={audioRef} src="/bgm.mp3" />

      {/* Volume slider */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-md">
        <span className="text-lg">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 cursor-pointer"
          title="Volume"
        />
      </div>

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
