import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CalendarRange, Hotel, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStartBooking: () => void;
  onExploreProducts: () => void;
}

export default function Hero({ onStartBooking, onExploreProducts }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white min-h-[580px] flex items-center pt-16 pb-20">
      {/* Decorative Golf Lawn Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1920&auto=format&fit=crop" 
          alt="Premium golf course lawn" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide">대한민국 No.1 골프 예약 파트너</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-[46px] font-bold tracking-tight leading-tight font-sans text-emerald-50">
                당신은 오직 <span className="text-emerald-400 font-extrabold relative inline-block">
                  굿샷(Good Shot)
                  <span className="absolute left-0 bottom-1 w-full h-1 bg-emerald-400/30 rounded"></span>
                </span>에만 집중하세요.
                <br />
                <span className="text-white">나머지는 케이투어가 완벽하게 준비합니다.</span>
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl leading-relaxed font-light">
                국내 명문 코스부터 동남아 · 일본 황금 블럭까지, 번거로운 티매칭과 숙박 수배를 완벽하게 대행하는 대한민국 No.1 골프 파트너 K-TOUR.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={onStartBooking}
                className="cursor-pointer inline-flex items-center space-x-2.5 px-6 py-4 bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-400/20 active:scale-[0.98] transition-all"
                id="hero-booking-btn"
              >
                <span>실시간 골프 투어 예약하기</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onExploreProducts}
                className="cursor-pointer inline-flex items-center space-x-2 px-6 py-4 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 border border-emerald-700 font-semibold text-sm sm:text-base rounded-xl hover:text-white transition-all"
                id="hero-explore-btn"
              >
                <Compass className="w-5 h-5" />
                <span>국내외 패키지 둘러보기</span>
              </button>
            </motion.div>
          </div>

          {/* Right Visual Graphic Column (Mascot & Character concept placeholder) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-[360px] bg-emerald-900/40 border border-emerald-500/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative"
            >
              <div className="absolute top-4 left-4 flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="mb-4 text-right">
                <span className="font-mono text-[10px] text-emerald-400/70 font-semibold uppercase tracking-widest leading-none">LAUNCHPAD INTERFACE</span>
              </div>

              {/* Snoopy/Woodstock Inspired Cute Character Box */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-800/30 text-emerald-950 flex flex-col items-center justify-center space-y-4">
                <div className="bg-emerald-50 p-3 rounded-full border border-emerald-100">
                  <span className="text-3xl">⛳🏌️‍♂️</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-amber-600 font-bold tracking-tight bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">K-TOUR Mascot</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">"버디와 버디 친구"</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-[220px] mx-auto leading-relaxed">
                    케이투어가 보장하는 잔여티 매칭 비법! 골프 매니아분들의 마음을 가볍게 채워드립니다.
                  </p>
                </div>
                <div className="w-full bg-emerald-50 rounded-xl p-3 text-left border border-emerald-100">
                  <div className="flex items-center space-x-2 text-emerald-900 text-xs font-bold font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>TODAY HIGHTLIGHT</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium mt-1">여수 디오션 및 태국 치앙마이 황금 시간 티타임 3세트 긴급 확보!</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* USP Grid Section */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* USP 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-emerald-900/30 border border-emerald-800/60 p-6 rounded-2xl hover:bg-emerald-900/50 hover:border-emerald-500/40 transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              "매일 다른 그린을 밟는 설렘"
            </h3>
            <p className="text-sm text-emerald-100/85 leading-relaxed font-light">
              단조로운 패키지는 가라! 케이투어만의 감각으로 엄선하고 직접 검증한 3색·4색 명품 골프 투어를 만나보세요.
            </p>
          </motion.div>

          {/* USP 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-emerald-900/30 border border-emerald-800/60 p-6 rounded-2xl hover:bg-emerald-900/50 hover:border-emerald-500/40 transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform shadow-md">
              <CalendarRange className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              "실시간 잔여티 체크로 스트레스 제로"
            </h3>
            <p className="text-sm text-emerald-100/85 leading-relaxed font-light">
              마감 임박 황금 시간대 잔여 티타임 실시간 현황을 확인하고, 번거로운 승인 대기 없는 맞춤형 즉시 매칭 시스템을 약속합니다.
            </p>
          </motion.div>

          {/* USP 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-emerald-900/30 border border-emerald-800/60 p-6 rounded-2xl hover:bg-emerald-900/50 hover:border-emerald-500/40 transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform shadow-md">
              <Hotel className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              "골프와 호캉스의 완벽한 밸런스"
            </h3>
            <p className="text-sm text-emerald-100/85 leading-relaxed font-light">
              엄선된 최고 만족도의 특급 호텔 숙박 및 남도의 정갈한 제철 조·석식 특식을 무상 제공하여 동반자 모두에게 완벽한 여정을 약속합니다.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
