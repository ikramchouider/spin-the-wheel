'use client'
import React, { useState, useRef } from 'react';
import { Swords } from 'lucide-react';

const AttackOnTitanWheel = () => {

  React.useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'true';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css2?family=New+Rocker&family=UnifrakturMaguntia&display=swap';
    link3.rel = 'stylesheet';
    document.head.appendChild(link3);
  }, []);

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('');
  const [prize, setPrize] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const wheelRef = useRef(null);

  const segments = [
    { 
      name: 'EREN', 
      image: '/eren.jpg'
    },
    { 
      name: 'MIKASA', 
      image: '/mikasa.jpg'
    },
    { 
      name: 'ARMIN', 
      image: '/armin.jpg'
    },
    { 
      name: 'LEVI', 
      image: '/levi.jpg'
    },
    { 
      name: 'ERWIN',  
      image: '/erwin.jpg'
    },
    { 
      name: 'HANGE', 
      image: '/hange.jpg'
    },
  ];

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult('');
    
    const spinDuration = 4000;
    const minSpins = 5;
    const extraRotation = Math.random() * 360;
    const totalRotation = rotation + (360 * minSpins) + extraRotation;
    console.log('totalRotation = ', totalRotation)
   
    setRotation(totalRotation);
    
    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / segments.length;
      const adjustedRotation = (360 - normalizedRotation ) % 360;
      const segmentIndex = Math.floor(adjustedRotation / segmentAngle);
      
      
      setResult(segments[segmentIndex].name);

      const prizes = ["STICKER", "NOTEBOOK", "PENCIL", "ART CARD"];
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);


      setSpinning(false);
      console.log('normalizedRotation = ', normalizedRotation)
      console.log('adjustedRotation = ', adjustedRotation)
      console.log('segmentIndex = ', segmentIndex)

    }, spinDuration);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative"
      style={{
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
      }}
    >

      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("/background.png")',
          opacity: 0.3
        }}
      />
      

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-white mb-4 flex items-center justify-center gap-6" style={{ 
            fontFamily: "'New Rocker', cursive", 
            fontWeight: 400,
            fontSize: '60px',
            lineHeight: '100%',
            textShadow: '3px 3px 6px #A23B3D'
          }}>
            <Swords className="text-[#A23B3D]" size={80} />
            ATTACK ON TITAN
            <Swords className="text-[#A23B3D]" size={80} />
          </h1>
          <p className="text-white" style={{ 
            fontFamily: "'New Rocker', cursive", 
            fontWeight: 400,
            fontSize: '50px',
            lineHeight: '100%',
            textShadow: '2px 2px 4px #A23B3D'
          }}>SPIN THE WHEEL</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
              <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-red-600 drop-shadow-lg"></div>
            </div>


            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full shadow-2xl overflow-hidden border-8 border-gray-900 bg-black">
              <div
                ref={wheelRef}
                className="w-full h-full relative transition-transform duration-[4000ms] ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                }}
              >
                {segments.map((segment, index) => {

                  

                  const angle = (360 / segments.length) * index;
                  const segmentAngle = 360 / segments.length;
                  
                  return (
                    <div
                      key={index}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(segmentAngle * Math.PI / 180)}% ${50 - 50 * Math.cos(segmentAngle * Math.PI / 180)}%)`
                      }}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center  relative"
                        style={{ 
                          backgroundImage: `url(${segment.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                      </div>
                    </div>
                  );
                })}
              </div>
              

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-900 rounded-full border-4 border-amber-500 shadow-2xl z-10"></div>
            </div>
          </div>


          <div className="flex flex-col items-center gap-8">

            <button
              onClick={spinWheel}
              disabled={spinning}
              className={`px-12 py-6 rounded-xl shadow-2xl transition-all transform border-2 ${
                spinning
                  ? 'bg-gray-600 border-gray-500 cursor-not-allowed'
                  : 'bg-red-700 border-red-800 hover:bg-red-800 hover:scale-105 active:scale-95 text-white'
              }`}
              style={{ 
                fontFamily: "'New Rocker', cursive",  
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '100%',
                minWidth: '200px'
              }}
            >
              {spinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
            </button>


            {result && (
              <div className="p-8 bg-black rounded-xl shadow-2xl border-4 border-red-600 animate-pulse  flex flex-col items-center justify-center md:w-3/5">
                <img className='rounded-xl mb-8' src={result +"1.jpg"}></img>
                <p className="text-white text-center mb-4" style={{ 
                  fontFamily: "'New Rocker', cursive", 
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '100%',
                }}>
                  YOU GOT: <span className="text-red-400">{result}!</span>
                </p>
                <p className="text-white text-center mb-4 mt-4" style={{ 
                  fontFamily: "'New Rocker', cursive", 
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '100%',
                }}>
                  {result} IS GIVING YOU 
                </p>
                 <span className="text-red-400"  style={{ 
                  fontFamily: "'New Rocker', cursive", 
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '100%',
                }}>  {prize.charAt(0) === "A" || prize.charAt(0) === "O" || prize.charAt(0) === "I"  ? "AN ": "A "} {prize}!</span>
              </div>
            )}


            <div className="text-center max-w-md bg-black/80 p-6 rounded-xl border-2 border-gray-700">
              <p className="text-white italic" style={{ 
                fontFamily: "'New Rocker', cursive", 
                fontWeight: 300,
                fontSize: '24px',
                lineHeight: '140%',
              }}>
                "If you win, you live. If you lose, you die. If you don't fight, you can't win!"
              </p>
              <p className="text-gray-300 mt-4 " style={{ 
                fontFamily: "'New Rocker', cursive", 
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
              }}>- Eren Yeager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttackOnTitanWheel;