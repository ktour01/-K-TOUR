import React from 'react';
import { ToggleRight, LayoutDashboard, Compass, PhoneCall } from 'lucide-react';

interface HeaderProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  onNavigateToBooking: () => void;
  onNavigateToBlog: () => void;
  onNavigateToProducts: () => void;
}

export default function Header({
  isAdminMode,
  setIsAdminMode,
  onNavigateToBooking,
  onNavigateToBlog,
  onNavigateToProducts,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setIsAdminMode(false)}
          className="flex items-center space-x-3 cursor-pointer group"
          id="header-logo"
        >
          <div className="w-11 h-11 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <span className="font-sans font-bold text-lg tracking-wider">KT</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-sans font-bold text-xl text-emerald-900 tracking-tight">케이투어</span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">K-TOUR</span>
            </div>
            <p className="text-[10px] text-emerald-700/80 tracking-wide font-medium">대한민국 No.1 골프 예약 파트너</p>
          </div>
        </div>

        {/* Navigation Menus for Visitor Mode */}
        {!isAdminMode ? (
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onNavigateToProducts}
              className="text-sm font-medium text-emerald-950 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              골프 상품 보기
            </button>
            <button 
              onClick={onNavigateToBlog}
              className="text-sm font-medium text-emerald-950 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              K-TOUR 리얼 답사기
            </button>
            <button 
              onClick={onNavigateToBooking}
              className="px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100/70 transition-colors cursor-pointer"
            >
              티타임 마감조회
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-800">관리자 관제 시스템 작동 중</span>
          </div>
        )}

        {/* Mode Toggle Button */}
        <div className="flex items-center space-x-3">
          <button
            id="toggle-mode-btn"
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`cursor-pointer relative flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
              isAdminMode 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-900 shadow-inner' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-md shadow-emerald-600/15'
            }`}
          >
            {isAdminMode ? (
              <>
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold font-sans">사용자 홈페이지 가기</span>
              </>
            ) : (
              <>
                <LayoutDashboard className="w-4 h-4 text-emerald-100" />
                <span className="text-xs font-bold font-sans">관리자 대시보드</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
