import React from 'react';
import { Mail, Phone, Clock, FileText, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-left">
      {/* Upper links section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-800/80">
        
        {/* Brand visual column */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold font-sans text-sm shadow">
              KT
            </div>
            <span className="font-sans font-bold text-lg text-white tracking-tight">케이투어</span>
            <span className="font-mono text-[10px] font-bold text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">No.1 Golf Travel Partner</span>
          </div>
          <p className="text-xs text-slate-450 leading-relaxed font-light">
            골퍼들의 영원한 동반자 K-TOUR. 복잡한 수배, 인원조인, 황금 마감 잔여티 확보까지 완벽한 골프 컨시어지 케어를 약속합니다. 당신은 필드 위에서 오직 기분좋은 굿샷만 완성하세요.
          </p>
        </div>

        {/* Highlight contact particulars block */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start space-x-2.5 text-xs">
            <Phone className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-slate-300 font-bold block mb-1.5">고객센터문의</p>
              <div className="space-y-1">
                <p className="text-slate-200 text-sm leading-tight">
                  <span className="text-slate-400 font-medium">박준희 이사</span>{" "}
                  <span className="font-bold font-mono text-slate-100 select-all">010-8060-4004</span>
                </p>
                <p className="text-slate-200 text-sm leading-tight">
                  <span className="text-slate-400 font-medium">박용재 부장</span>{" "}
                  <span className="font-bold font-mono text-slate-100 select-all">010-7310-9078</span>
                </p>
                <p className="text-slate-200 text-sm leading-tight">
                  <span className="text-slate-400 font-medium">황희진 차장</span>{" "}
                  <span className="font-bold font-mono text-slate-100 select-all">010-9982-0673</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2.5 text-xs">
            <div className="w-4 h-4 rounded-sm bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5 select-none">
              ₩
            </div>
            <div>
              <p className="text-slate-300 font-bold block mb-1">예약금 입금계좌</p>
              <p className="text-slate-100 font-extrabold font-sans text-[11px] leading-tight select-all">NH농협 351-1329-2852-73</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">예금주: 박준희(케이투어K-TOUR)</p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5 text-xs">
            <Clock className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-slate-300 font-bold block mb-0.5">상담 영업시간</p>
              <p className="text-slate-400">평일 09:00 ~ 18:00</p>
              <p className="text-[10px] text-slate-500 font-bold">(토/일/공휴일 휴무)</p>
            </div>
          </div>
        </div>

        {/* Scroll back to top column */}
        <div className="md:col-span-1 flex justify-end">
          <button
            onClick={scrollToTop}
            className="cursor-pointer p-3 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-750 transition-colors flex items-center justify-center shadow"
            title="맨 앞으로 가기"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main legal company information according to e-commerce compliance guidance */}
      <div className="bg-slate-950/70 py-8 text-xs text-slate-500 leading-normal font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Main detailed line */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-400">
            <span className="font-bold text-slate-300">상호명: 케이투어(K-TOUR)</span>
            <span>일반과세업체</span>
            <span>대표자: 박준희</span>
            <span>사업자등록번호: [833-33-01197]</span>
            <span>이메일: <a href="mailto:rudu@paran.com" className="text-slate-400 hover:text-emerald-400 underline font-mono">rudu@paran.com</a></span>
          </div>

          <div className="space-y-1">
            <p>사업장 소재지: 서울특별시 노원구 노해로 491, 상계동 4층 4136호</p>
            <p className="flex items-center space-x-1.5 text-[11px]">
              <FileText className="w-3.5 h-3.5 text-slate-600 inline" />
              <span>관광사업등록증: 제 [2022-000004]호</span>
            </p>
          </div>

          {/* Compliance & trademark notices */}
          <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
            <p>케이투어 상품은 현지 리조트 및 골프장과의 합작 수배를 기본으로 합니다. 상품 신청과 동시에 상담 매칭이 즉시 매니징 처리됩니다.</p>
            <p className="font-mono text-slate-500">Copyright © 2026 K-TOUR. All Rights Reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
