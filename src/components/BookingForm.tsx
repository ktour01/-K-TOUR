import React, { useState, useEffect } from 'react';
import { Product, Booking } from '../types.ts';
import { GOLF_PRODUCTS } from '../data.ts';
import { CalendarRange, Users, ClipboardCopy, BadgeAlert, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';

interface BookingFormProps {
  product: Product | null;
  onClose: () => void;
  onSubmitBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
}

export default function BookingForm({ product, onClose, onSubmitBooking }: BookingFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // 3-Step Wizard State
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Field States
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [pax, setPax] = useState<number>(4);
  const [customerName, setCustomerName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [additionalRequests, setAdditionalRequests] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Active month inside custom calendar: 'June 2026' or 'July 2026'
  const [calendarMonth, setCalendarMonth] = useState<'June' | 'July'>('June');

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
      setStep(1); // Reset to step 1
    }
  }, [product]);

  // Generate calendar days for custom mini interactive calendar
  // Average days/dates in June 2026 or July 2026
  const getCalendarDays = () => {
    if (calendarMonth === 'June') {
      // 2026-06-01 is Monday (since June 3rd is Wed in our system metadata)
      // We will output days of the month from 1 to 30
      return Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        dateString: `2026-06-${String(i + 1).padStart(2, '0')}`,
        isWeekend: (i + 1) % 7 === 6 || (i + 1) % 7 === 0, // Mock sat/sun
        isHoliday: (i + 1) === 6 // Memorial Day (June 6)
      }));
    } else {
      // July 2026 start with Wednesday (since June has 30 days)
      // Days from 1 to 31
      return Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        dateString: `2026-07-${String(i + 1).padStart(2, '0')}`,
        isWeekend: (i - 2) % 7 === 4 || (i - 2) % 7 === 5,
        isHoliday: false
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedProduct) {
        setValidationError('상품을 선택해주세요.');
        return;
      }
      setValidationError(null);
      setStep(2);
    } else if (step === 2) {
      if (!preferredDate) {
        setValidationError('출발 희망일을 달력에서 선택해주세요.');
        return;
      }
      setValidationError(null);
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError('성함을 입력해주세요.');
      return;
    }
    // Contact simple regex validation
    if (!contact.trim()) {
      setValidationError('연락처를 입력해주세요.');
      return;
    }
    const cleanContact = contact.replace(/[^0-9-]/g, '');
    if (cleanContact.length < 9) {
      setValidationError('올바른 연락처 형식을 입력해주세요. (예: 010-1234-5678)');
      return;
    }

    setValidationError(null);

    // Call submit handler
    onSubmitBooking({
      customerName,
      contact,
      productId: selectedProduct?.id || '',
      productTitle: selectedProduct?.title || '',
      preferredDate,
      pax,
      status: 'pending',
      additionalRequests
    });
  };

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-emerald-950 text-white text-left relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 hover:bg-emerald-900 rounded-full cursor-pointer transition-colors"
          >
            ✕
          </button>
          
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block font-mono">STEP {step}/3 RESERVATION</span>
            <h3 className="text-lg font-bold font-sans">
              {step === 1 && '1. 신청 골프 상품 확인 및 정보'}
              {step === 2 && '2. 출발 희망일 및 동반 인원'}
              {step === 3 && '3. 예약자 추가 상세정보'}
            </h3>
            <p className="text-xs text-emerald-100/70 font-light truncate">
              신청중: {selectedProduct.title}
            </p>
          </div>

          {/* Graphical Step Indicator bar */}
          <div className="mt-4 flex items-center space-x-1">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-10 bg-emerald-400' : 'w-5 bg-emerald-800'}`}></div>
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-10 bg-emerald-400' : 'w-5 bg-emerald-800'}`}></div>
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'w-10 bg-emerald-400' : 'w-5 bg-emerald-800'}`}></div>
          </div>
        </div>

        {/* Form area */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col text-left">
          
          <div className="p-6 sm:p-8 flex-1 max-h-[60vh] overflow-y-auto space-y-6">
            
            {/* Display error if matches */}
            {validationError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 flex items-start space-x-2.5 text-xs">
                <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <p className="font-semibold leading-normal">{validationError}</p>
              </div>
            )}

            {/* STEP 1: Product confirmation & alternative product picker */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-100 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-150">
                      {selectedProduct.subCategory}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{selectedProduct.duration}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {selectedProduct.title}
                  </h4>

                  {/* Pricing outline */}
                  <div className="text-right pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] text-slate-400 font-bold mr-1.5 uppercase tracking-wider block">기준 가격선(1인)</span>
                    <span className="font-sans font-extrabold text-emerald-800 text-lg">
                      {selectedProduct.priceText} 원~
                    </span>
                  </div>
                </div>

                {/* Additional Inclusions Info Panel */}
                <div className="space-y-3.5 text-slate-700 text-xs">
                  <span className="text-xs font-bold text-slate-500 block">📢 투어 혜택 안내</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-100/60 rounded-xl">
                      <p className="font-bold text-slate-800 block mb-1">🏨 호텔숙박 정보</p>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{selectedProduct.hotelName}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100/60 rounded-xl">
                      <p className="font-bold text-slate-800 block mb-1">🍲 식사안내</p>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{selectedProduct.meals}</p>
                    </div>
                  </div>
                </div>

                {/* Alternate product dropdown just in case */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 block">다른 패키지로 변경하기:</label>
                  <select
                    value={selectedProduct.id}
                    onChange={(e) => {
                      const found = GOLF_PRODUCTS.find(p => p.id === e.target.value);
                      if (found) setSelectedProduct(found);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/25"
                  >
                    {GOLF_PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>
                        [{p.subCategory}] {p.title} ({p.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Important notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 text-xs leading-normal">
                  ⚠️ <strong>주의:</strong> 실시간 골프 티타임과 객실 마감 여부를 최종 확인하는 프로세스이므로, <strong>결제 전 예약 신청 접수 후</strong> 담당자가 30분 내로 전화를 드리는 <strong>해피콜 및 확정 시스템</strong>으로 진행됩니다.
                </div>
              </div>
            )}

            {/* STEP 2: Date & Pax selection */}
            {step === 2 && (
              <div className="space-y-5">
                
                {/* Months Toggle Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">출발 희망일 선택 (2026년)</span>
                  <div className="flex space-x-1 border border-slate-250 bg-slate-100 p-0.5 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setCalendarMonth('June')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        calendarMonth === 'June' ? 'bg-white shadow text-emerald-800' : 'text-slate-500'
                      }`}
                    >
                      6월 (June)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalendarMonth('July')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        calendarMonth === 'July' ? 'bg-white shadow text-emerald-800' : 'text-slate-500'
                      }`}
                    >
                      7월 (July)
                    </button>
                  </div>
                </div>

                {/* Custom Interactive Calendar Grid */}
                <div>
                  {/* Calendar Days Title header */}
                  <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400 mb-2 font-mono">
                    <span className="text-rose-500">SUN</span>
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span className="text-sky-500">SAT</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {/* Padding blank days for start of month alignment */}
                    {calendarMonth === 'June' ? (
                      // 2026-06-01 is Monday (padded with 1 offset for Sunday)
                      Array.from({ length: 1 }).map((_, i) => <div key={`p-1-${i}`}></div>)
                    ) : (
                      // 2026-07-01 is Wednesday (padded with 3 offsets)
                      Array.from({ length: 3 }).map((_, i) => <div key={`p-2-${i}`}></div>)
                    )}

                    {getCalendarDays().map((item) => {
                      const isSelected = preferredDate === item.dateString;
                      return (
                        <button
                          key={item.day}
                          type="button"
                          onClick={() => setPreferredDate(item.dateString)}
                          className={`cursor-pointer aspect-square rounded-xl flex flex-col items-center justify-center transition-all p-1.5 ${
                            isSelected
                              ? 'bg-emerald-700 text-white font-extrabold shadow-md shadow-emerald-700/20 ring-2 ring-emerald-400'
                              : 'bg-slate-50 hover:bg-slate-100 border border-slate-100'
                          }`}
                        >
                          <span className={`text-[11px] sm:text-xs font-bold ${
                            !isSelected && item.isWeekend ? 'text-rose-500' : !isSelected && item.isHoliday ? 'text-rose-500' : ''
                          }`}>
                            {item.day}
                          </span>
                          
                          {/* Small visual green dot tag for available booking slots */}
                          <span className={`h-1 w-1 rounded-full mt-1 ${
                            isSelected ? 'bg-white' : 'bg-emerald-500'
                          }`}></span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Date indicator */}
                {preferredDate && (
                  <div className="bg-emerald-50 text-emerald-950 font-bold text-xs p-3.5 rounded-2xl border border-emerald-150 flex items-center justify-between">
                    <span>선택한 희망일: 📅 {preferredDate}</span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded">티 예약 가능</span>
                  </div>
                )}

                {/* Pax selection slider or pills */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600">동반 인원 (Pax):</label>
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
                      {pax === 8 ? '8명 단체 (2팀)' : pax === 1 ? '1인 싱글조인 신청' : `${pax}인 (1팀)`}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 4, 8].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPax(size)}
                        className={`cursor-pointer py-3.5 rounded-xl border font-bold text-xs text-center transition-all ${
                          pax === size
                            ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {size === 1 ? '1인 (조인)' : size === 4 ? '4인 (1팀)' : size === 8 ? '8인 (2팀)' : `${size}인`}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* STEP 3: User Details & Comments */}
            {step === 3 && (
              <div className="space-y-4">
                
                {/* Selected specs preview */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-700 font-medium space-y-1">
                  <p className="font-bold text-slate-800">예약 신청 요약:</p>
                  <p>• 상품명: {selectedProduct.title}</p>
                  <p>• 출발일: 📅 {preferredDate}</p>
                  <p>• 인원수: {pax}명</p>
                </div>

                {/* Customer Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-extrabold text-slate-600 block">신청자 성함(실명):</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/25 focus:border-emerald-700 transition"
                  />
                </div>

                {/* Contact phone number */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-extrabold text-slate-600 block">연락처 (해피콜용):</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/25 focus:border-emerald-700 transition"
                  />
                  <p className="text-[10px] text-slate-400 font-bold">휴대폰 연락처를 정확히 기입하셔야 즉시 티 안내 전화를 받으실 수 있습니다.</p>
                </div>

                {/* Additional requests / comments */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-extrabold text-slate-600 block">추가 요청사항 (선택):</label>
                  <textarea
                    rows={3}
                    placeholder="예: 2박3일 일정 변경 문의, 싱글룸 비용 추가여부, 공항 송영 차량 별도 신청 등..."
                    value={additionalRequests}
                    onChange={(e) => setAdditionalRequests(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/25 focus:border-emerald-700 transition resize-none"
                  />
                </div>

                {/* Aggrement compliance block */}
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-[10px] leading-relaxed border border-emerald-150">
                  ℹ️ 국내외 여행업 규정에 맞춘 개인정보 취급 및 제공에 자동 동의하며, 접수와 동시에 담당 디렉터의 무료 매칭 카운슬링이 개시됩니다.
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer Controls */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex space-x-3">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="cursor-pointer px-5 py-3.5 bg-white hover:bg-slate-100 border border-slate-250 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                이전단계
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="cursor-pointer flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow shadow-emerald-700/20 text-center"
              >
                다음단계 진행하기
              </button>
            ) : (
              <button
                type="submit"
                className="cursor-pointer flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition-all shadow shadow-slate-900/10 text-center"
                id="booking-submit-final"
              >
                📝 명품 골프 예약 신청하기
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
