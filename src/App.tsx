import React, { useState, useEffect, useRef } from 'react';
import { Product, Booking } from './types.ts';
import { INITIAL_BOOKINGS, GOLF_PRODUCTS } from './data.ts';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ProductSection from './components/ProductSection.tsx';
import BlogSection from './components/BlogSection.tsx';
import BookingForm from './components/BookingForm.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import Footer from './components/Footer.tsx';
import { CalendarRange, Sparkles, MessageCircleCode, CheckCircle, Smartphone, Lock, ShieldAlert, X } from 'lucide-react';

export default function App() {
  // Application Mode Toggle State
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Admin Dashboard Security states
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle mode handle with password interrogation
  const handleToggleAdminMode = (nextMode: boolean) => {
    if (nextMode) {
      setPasswordInput('');
      setPasswordError('');
      setShowPasswordModal(true);
    } else {
      setIsAdminMode(false);
    }
  };

  // Automated pattern parsing on numeric credentials match
  useEffect(() => {
    if (passwordInput.length === 4) {
      if (passwordInput === '0125') {
        setIsAdminMode(true);
        setShowPasswordModal(false);
        setPasswordInput('');
        setPasswordError('');
      } else {
        setPasswordError('비밀번호 4자리가 일치하지 않습니다.');
        // Briefly maintain wrong sequence then autofilled flush
        const timer = setTimeout(() => {
          setPasswordInput('');
        }, 550);
        return () => clearTimeout(timer);
      }
    }
  }, [passwordInput]);

  const handleKeypadPress = (digit: string) => {
    if (digit === 'C') {
      setPasswordInput('');
      setPasswordError('');
    } else if (digit === '⌫') {
      setPasswordInput(prev => prev.slice(0, -1));
      setPasswordError('');
    } else {
      if (passwordInput.length < 4) {
        setPasswordInput(prev => prev + digit);
        setPasswordError('');
      }
    }
    // Refocus target mechanism for smooth keystrokes
    inputRef.current?.focus();
  };

  // Persistence State Management for Bookings
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Selected Booking target for multi-step form modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active categorical filters override from CTA buttons
  const [activeFilterOverride, setActiveFilterOverride] = useState<string>('all');

  // Simulated KakaoTalk Pop-up Overlay State for user confirmation
  const [simulatedAlimTalk, setSimulatedAlimTalk] = useState<{
    customerName: string;
    contact: string;
    productTitle: string;
    preferredDate: string;
  } | null>(null);

  // Load Bookings from localStorage, initializing with defaults if empty
  useEffect(() => {
    const saved = localStorage.getItem('k_tour_bookings_v1');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (err) {
        setBookings(INITIAL_BOOKINGS);
      }
    } else {
      setBookings(INITIAL_BOOKINGS);
      localStorage.setItem('k_tour_bookings_v1', JSON.stringify(INITIAL_BOOKINGS));
    }
  }, []);

  // Update localStorage when bookings state changes
  const updateBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('k_tour_bookings_v1', JSON.stringify(newBookings));
  };

  // Adding a new reservation
  const handleCreateBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    // Generate new alphanumeric reservation ID
    const nextId = `B${String(bookings.length + 1).padStart(3, '0')}`;
    
    // Get formatted current date/time to align with metadata: e.g., "06-03 13:00"
    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newBooking: Booking = {
      ...bookingData,
      id: nextId,
      createdAt: formattedDate,
      adminNotes: '신규 예약이 온라인에서 무상 접수되었습니다. 30분 이내 해피콜 진행 타진 중.'
    };

    const updatedList = [newBooking, ...bookings];
    updateBookings(updatedList);
    setSelectedProduct(null); // Close modal

    // Trigger visual KakaoTalk Pop-up to demonstrate immediate integration
    setSimulatedAlimTalk({
      customerName: bookingData.customerName,
      contact: bookingData.contact,
      productTitle: bookingData.productTitle,
      preferredDate: bookingData.preferredDate
    });
  };

  // Update Booking Status
  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    updateBookings(updated);
  };

  // Update Admin Notes
  const handleUpdateBookingNotes = (id: string, adminNotes: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, adminNotes } : b);
    updateBookings(updated);
  };

  // Delete a booking record
  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    updateBookings(updated);
  };

  // Quick navigation smooth-scrollers
  const scrollToCatalog = () => {
    const element = document.getElementById('product-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBlog = () => {
    const element = document.getElementById('blog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handles starting a booking with specific product pre-set
  const handleInitiateBookingWithId = (productId: string) => {
    const product = GOLF_PRODUCTS.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-700 selection:text-white">
      
      {/* Universal Sticky Header (User/Admin toggler) */}
      <Header 
        isAdminMode={isAdminMode} 
        setIsAdminMode={handleToggleAdminMode} 
        onNavigateToBooking={scrollToCatalog}
        onNavigateToBlog={scrollToBlog}
        onNavigateToProducts={scrollToCatalog}
      />

      {/* Main Container Switch */}
      <main className="flex-1">
        {isAdminMode ? (
          
          /* Admin CRM Dashboard Portals */
          <AdminDashboard 
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onUpdateBookingNotes={handleUpdateBookingNotes}
            onDeleteBooking={handleDeleteBooking}
          />

        ) : (

          /* Elegant Customer Landing Portals */
          <div className="space-y-0">
            
            {/* Hero & USP Showcase */}
            <Hero 
              onStartBooking={() => {
                // Instantly open the first item or let them pick
                setSelectedProduct(GOLF_PRODUCTS[0]);
              }} 
              onExploreProducts={scrollToCatalog} 
            />

            {/* Quick Menu Hub & Features bar */}
            <div className="bg-white py-8 border-b border-slate-100 shadow-sm relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">원클릭 황금 티타임 조율 세션</h4>
                      <p className="text-[11px] text-slate-500 font-medium">원하는 특례 테마 카테고리를 터치하시면 상품들이 즉시 분류됩니다.</p>
                    </div>
                  </div>

                  {/* High visual fidelity Quick Category Access Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setActiveFilterOverride('긴급마감');
                        scrollToCatalog();
                      }}
                      className="cursor-pointer px-4.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-extrabold border border-rose-200 shadow-sm flex items-center space-x-1"
                    >
                      <span>🔥 [🚨 긴급마감 특가]</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setActiveFilterOverride('2인출발');
                        scrollToCatalog();
                      }}
                      className="cursor-pointer px-4.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-extrabold border border-amber-200 shadow-sm flex items-center space-x-1"
                    >
                      <span>👥 [👥 2인출발 허용]</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveFilterOverride('골프조인');
                        const joinProduct = GOLF_PRODUCTS.find(p => p.id === 'join-matching-pax2');
                        if (joinProduct) {
                          setSelectedProduct(joinProduct);
                        } else {
                          scrollToCatalog();
                        }
                      }}
                      className="cursor-pointer px-4.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-extrabold border border-emerald-200 shadow-sm flex items-center space-x-1"
                      title="2인 골프 조인 신청서 즉시 작성하기"
                    >
                      <span>🤝 [2인골프 조인방/2인골프 조인신청]</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* Main Interactive Golf Travel Products Listings */}
            <ProductSection 
              onSelectProduct={setSelectedProduct}
              activeFilterOverride={activeFilterOverride}
            />

            {/* Real Naver Blog Feed Mimicry */}
            <BlogSection 
              onSelectProductById={handleInitiateBookingWithId}
            />

          </div>
        )}
      </main>

      {/* FOOTER Section with official legal terms */}
      <Footer />

      {/* 3-Step Wizard Schedule Form Modal */}
      {selectedProduct && (
        <BookingForm
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSubmitBooking={handleCreateBooking}
        />
      )}

      {/* SIMULATED KAKAOTALK BUSINESS ALIMTALK TOAST / CONFIRMATION OVERLAY */}
      {simulatedAlimTalk && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-750 p-6 space-y-4 animate-slide-in">
          
          {/* Header styled like smart alimtalk notification banner */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-yellow-400">
              <MessageCircleCode className="w-5 h-5" />
              <span className="text-xs font-black font-sans tracking-wide">K-TOUR 알림톡 도착</span>
            </div>
            <button
              onClick={() => setSimulatedAlimTalk(null)}
              className="text-slate-400 hover:text-white font-bold text-xs"
            >
              닫기✕
            </button>
          </div>

          <div className="space-y-3.5 text-left">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-yellow-450 text-slate-900 flex items-center justify-center font-black text-sm">
                주
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">K-TOUR 비즈니스 톡채널</h4>
                <p className="text-[10px] text-emerald-400 font-bold">인증 파트너사 정보 연동 완료</p>
              </div>
            </div>

            <div className="bg-slate-850 p-3.5 rounded-2xl text-xs space-y-2 text-slate-200 border border-slate-800">
              <p className="font-extrabold text-white text-[13px]">🛎️ 가예약 신청 접수완료</p>
              <p className="text-[11px] leading-relaxed">
                안녕하세요, <strong>{simulatedAlimTalk.customerName}</strong> 골퍼님!
                <br />신청하신 상품에 대한 투어 티타임 매칭이 시작되었습니다.
              </p>
              <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 space-y-0.5">
                <p>• 신청상품: {simulatedAlimTalk.productTitle}</p>
                <p>• 희망출발일: 📅 {simulatedAlimTalk.preferredDate}</p>
                <p>• 수신연락처: {simulatedAlimTalk.contact}</p>
              </div>
              <p className="text-[10px] text-amber-400 font-bold leading-normal pt-1.5">
                ※ 골프 매칭 디렉터가 30분 이내로 티 배정 확인 전화를 드립니다. 전화를 꼭 받아주세요!
              </p>
            </div>
            
            <div className="flex space-x-2 text-center text-xs">
              <button
                onClick={() => {
                  setSimulatedAlimTalk(null);
                  handleToggleAdminMode(true);
                }}
                className="cursor-pointer flex-1 py-2.5 bg-yellow-450 hover:bg-yellow-500 text-slate-900 font-black rounded-xl transition-all"
              >
                관리자 모드에서 즉시 확인하기 (Demo)
              </button>
            </div>
          </div>

        </div>
      )}

      {/* PASSWORD PROTECTION MODAL FOR ADMIN PORTAL */}
      {showPasswordModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => {
            setShowPasswordModal(false);
            setPasswordInput('');
            setPasswordError('');
          }}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
            style={{ animation: 'bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordInput('');
                setPasswordError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full p-1.5 transition-colors z-10 cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            {/* Header Area */}
            <div className="bg-slate-900 p-6 text-white flex flex-col items-center justify-center text-center space-y-3 pt-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 text-amber-500 shadow-md">
                <Lock className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans font-extrabold text-base tracking-tight">관리자 인증 보안</h3>
                <p className="text-[11px] text-slate-400 leading-normal font-medium">케이투어 대시보드 진입을 위해 비밀번호를 입력해주세요.</p>
              </div>
            </div>

            {/* Form Area with Hidden Input for Keyboard support */}
            <div className="p-6 space-y-6 bg-white">
              {/* Fallback hidden input field */}
              <input
                ref={inputRef}
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={4}
                value={passwordInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) {
                    setPasswordInput(val);
                    setPasswordError('');
                  }
                }}
                className="sr-only"
                autoFocus
              />

              {/* Secure Dots Visual Pin Indicator */}
              <div className="space-y-3">
                <div className="flex justify-center space-x-4 py-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div 
                      key={idx} 
                      className={`w-4 h-4 rounded-full transition-all duration-200 border-2 ${
                        idx < passwordInput.length 
                          ? 'bg-emerald-600 border-emerald-600 scale-110 shadow-sm shadow-emerald-500/30' 
                          : 'bg-slate-100 border-slate-300'
                      }`}
                      style={{
                        backgroundColor: idx < passwordInput.length ? '#059669' : undefined,
                        borderColor: idx < passwordInput.length ? '#059669' : undefined
                      }}
                    />
                  ))}
                </div>

                {/* Error message slot */}
                {passwordError ? (
                  <div className="text-xs text-rose-600 text-center font-bold flex items-center justify-center gap-1 animate-pulse">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>{passwordError}</span>
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-400 text-center font-semibold">
                    (안내: 비밀번호는 <strong className="text-emerald-700">0125</strong> 입니다)
                  </div>
                )}
              </div>

              {/* High-fidelity Custom Security Keypad for touch and click comfort */}
              <div className="grid grid-cols-3 gap-2 mx-auto pb-1 select-none">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKeypadPress(btn);
                    }}
                    className={`cursor-pointer h-12 rounded-xl flex items-center justify-center text-sm font-extrabold transition-all active:scale-95 ${
                      btn === 'C'
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                        : btn === '⌫'
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Footer lock indicator */}
            <div className="bg-slate-50 py-3 text-center border-t border-slate-100">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">🔒 K-TOUR SECURE GATEWAY</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
