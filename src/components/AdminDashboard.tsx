import React, { useState, useMemo } from 'react';
import { Booking } from '../types.ts';
import { Search, Database, MessageSquare, Save, CheckCircle, Bell, RefreshCw, Send, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onUpdateBookingNotes: (id: string, adminNotes: string) => void;
  onDeleteBooking: (id: string) => void;
}

export default function AdminDashboard({
  bookings,
  onUpdateBookingStatus,
  onUpdateBookingNotes,
  onDeleteBooking,
}: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Booking['status']>('all');
  
  // Selected booking for detailed view/editing
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'alerts'>('list');
  const [adminMemoInput, setAdminMemoInput] = useState('');
  const [showSmsModal, setShowSmsModal] = useState<Booking | null>(null);
  const [smsMessageText, setSmsMessageText] = useState('');

  // Status statistics helper
  const stats = useMemo(() => {
    return {
      pending: bookings.filter(b => b.status === 'pending').length,
      discussing: bookings.filter(b => b.status === 'discussing').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      total: bookings.length
    };
  }, [bookings]);

  // Handle opening detailed view
  const handleOpenDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setAdminMemoInput(booking.adminNotes || '');
  };

  // Handle saving notes
  const handleSaveNotes = () => {
    if (selectedBooking) {
      onUpdateBookingNotes(selectedBooking.id, adminMemoInput);
      setSelectedBooking(prev => prev ? { ...prev, adminNotes: adminMemoInput } : null);
      alert('상담 디렉터 메모가 안전하게 저장되었습니다!');
    }
  };

  // Send mock SMS / KakaoTalk alert to customer
  const handleSetupSms = (booking: Booking) => {
    setShowSmsModal(booking);
    setSmsMessageText(
      `[K-TOUR 알림톡]\n\n안녕하세요 ${booking.customerName} 고객님, 대한민국 환상 골프 파트너 케이투어입니다.\n신청해주신 [${booking.productTitle}]에 관한 예약 가예약 신청이 정상 접수되었습니다.\n\n■ 신청일수: ${booking.preferredDate}\n■ 동반인원: ${booking.pax}인\n현재 예약 전담 디렉터가 골프장 코스 티타임 확보 검토를 완료했습니다. 10분 내로 유선 상담(해피콜) 주도하겠습니다.\n\n문의: 박준희 이사 010-8060-4004 / 박용재 부장 010-7310-9078 / 황희진 차장 010-9982-0673`
    );
  };

  const handleSendMockSms = () => {
    if (showSmsModal) {
      alert(`[K-TOUR 알림톡 발송 완료!]\n\n수신자: ${showSmsModal.customerName} (${showSmsModal.contact})\n메시지가 카카오 알림톡 서비스 연동 모듈을 통해 모의 발송되었습니다.`);
      setShowSmsModal(null);
    }
  };

  // Filter listings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const textMatch = 
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.productTitle.toLowerCase().includes(searchTerm.toLowerCase());
      
      const statusMatch = statusFilter === 'all' || b.status === statusFilter;
      return textMatch && statusMatch;
    });
  }, [bookings, searchTerm, statusFilter]);

  return (
    <div className="py-12 bg-slate-900 text-slate-100 min-h-screen" id="admin-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 text-xs font-bold font-mono">
              <Database className="w-3.5 h-3.5" />
              <span>K-TOUR INTERNAL CRM CORE ENGINE v2.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-white">
              케이투어 예약 관제 대시보드
            </h1>
            <p className="text-xs text-slate-400 font-light">
              유입되는 신규 골프 투어 희망건을 실시간 모니터링하고 진행 상태를 업데이트하여 빠른 해피콜 매칭을 이행할 수 있습니다.
            </p>
          </div>

          <div className="flex space-x-2 bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                activeTab === 'list' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              예약 관리 대장
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center space-x-1.5 ${
                activeTab === 'alerts' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>실시간 카카오 본부 알림</span>
              {stats.pending > 0 && (
                <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                  {stats.pending}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Real-Time status indicator cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-800 border border-slate-75 *0 rounded-2xl p-4.5 space-y-1 text-left relative overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-slate-400">전체 접수총량</span>
            <p className="text-2xl sm:text-3xl font-black font-sans text-white">{stats.total} <span className="text-xs text-slate-500 font-medium">건</span></p>
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-slate-500"></div>
          </div>

          <div className="bg-slate-800/60 border border-red-500/20 rounded-2xl p-4.5 space-y-1 text-left relative overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-red-400 flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping mr-1"></span>
              <span>🔴 신규 접수</span>
            </span>
            <p className="text-2xl sm:text-3xl font-black font-sans text-red-400">{stats.pending} <span className="text-xs text-slate-500 font-medium">건</span></p>
          </div>

          <div className="bg-slate-800/60 border border-yellow-500/20 rounded-2xl p-4.5 space-y-1 text-left relative overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-yellow-400">🟡 상담 진행중</span>
            <p className="text-2xl sm:text-3xl font-black font-sans text-yellow-450">{stats.discussing} <span className="text-xs text-slate-500 font-medium">건</span></p>
          </div>

          <div className="bg-slate-800/60 border border-emerald-500/20 rounded-2xl p-4.5 space-y-1 text-left relative overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-emerald-400">🟢 예약 완료확정</span>
            <p className="text-2xl sm:text-3xl font-black font-sans text-emerald-400">{stats.confirmed} <span className="text-xs text-slate-500 font-medium">건</span></p>
          </div>

          <div className="bg-slate-800/60 border border-slate-550/20 rounded-2xl p-4.5 space-y-1 text-left relative overflow-hidden col-span-2 lg:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">⚫ 완료 및 투어종료</span>
            <p className="text-2xl sm:text-3xl font-black font-sans text-slate-350">{stats.completed} <span className="text-xs text-slate-500 font-medium">건</span></p>
          </div>
        </div>

        {/* MOCK COMMUNICATOR TAB */}
        {activeTab === 'alerts' && (
          <div className="bg-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-sans font-bold text-base text-slate-100">동보 전송 설정: 카카오 비즈플러스 알림</h3>
              </div>
              <span className="text-xs text-slate-400">관리자 계정: rudu@paran.com</span>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                🚨 **알림 기능 데모**: 새로운 고객 예약 신청이 홈페이지 프론트 상에서 발송되는 즉시, K-TOUR 관리자의 KakaoTalk (<strong>박준희 이사 010-8060-4004 / 박용재 부장 010-7310-9078 / 황희진 차장 010-9982-0673</strong>) 혹은 헬프 번호로 아래의 템플릿 메세지가 자동 발신 처리됩니다.
              </p>

              {/* Chat log visual list */}
              <div className="space-y-4 bg-slate-900 rounded-2xl p-4.5 border border-slate-800 max-h-80 overflow-y-auto">
                {bookings.map((booking, j) => (
                  <div key={j} className="flex items-start space-x-3 text-xs bg-slate-850 p-4.5 rounded-xl border border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center font-bold text-sm">
                      Talk
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <span>[K-TOUR 본부 알림 비서]</span>
                        <span>{booking.createdAt}</span>
                      </div>
                      <p className="text-slate-200 leading-normal font-sans text-[11px] whitespace-pre-wrap">
                        📢 <strong>신규 예약 신청 도착!</strong> ({String(booking.status).toUpperCase()})
                        <br />• 예약자: {booking.customerName} 고객 ({booking.contact})
                        <br />• 신청코스: {booking.productTitle}
                        <br />• 희망출발: {booking.preferredDate} (동반: {booking.pax}명)
                        {booking.additionalRequests && <><br />• 요청내역: "{booking.additionalRequests}"</>}
                      </p>
                      <div className="pt-2 text-right">
                        <button
                          onClick={() => {
                            setActiveTab('list');
                            handleOpenDetail(booking);
                          }}
                          className="px-2.5 py-1 bg-slate-750 text-slate-200 rounded font-bold text-[10px] hover:bg-slate-700"
                        >
                          CRM 상담 처리하기 │ Click
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CRM LISTING TAB */}
        {activeTab === 'list' && (
          <div className="bg-slate-850 rounded-3xl border border-slate-800 overflow-hidden text-left shadow-sm">
            
            {/* Search and filtering toolbars inside table header */}
            <div className="p-6 border-b border-slate-800 bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search text inputs */}
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="예약자명, 연락처, 신청 상품명 실시간 대장 필터..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-750 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-505"
                />
              </div>

              {/* Main categorical status select */}
              <div className="flex space-x-1.5">
                {[
                  { value: 'all', label: '전체 (All)' },
                  { value: 'pending', label: '🔴 신규접수' },
                  { value: 'discussing', label: '🟡 상담중' },
                  { value: 'confirmed', label: '🟢 예약확정' },
                  { value: 'completed', label: '⚫ 투어종료' }
                ].map((st) => (
                  <button
                    key={st.value}
                    onClick={() => setStatusFilter(st.value as any)}
                    className={`px-3 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                      statusFilter === st.value 
                        ? 'bg-slate-100 text-slate-900' 
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Main CRM Master Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-800/80 text-slate-400 uppercase font-mono tracking-wider text-[10px] border-b border-slate-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-4.5 font-bold">접수 일시</th>
                    <th scope="col" className="px-6 py-4.5 font-semibold">고객명</th>
                    <th scope="col" className="px-6 py-4.5 font-semibold">연락처</th>
                    <th scope="col" className="px-6 py-4.5 font-semibold">신청 상품 설명</th>
                    <th scope="col" className="px-6 py-4.5 font-semibold">희망출발일</th>
                    <th scope="col" className="px-6 py-4.5 font-semibold text-center">인원수</th>
                    <th scope="col" className="px-6 py-4.5 font-semibold text-center">진행 상태</th>
                    <th scope="col" className="px-6 py-4.5 font-semibold text-right">관리 제어</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-slate-500 font-medium">
                        대장에 등록된 고객 예약 신청 데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr 
                        key={booking.id}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Reception datetimer */}
                        <td className="px-6 py-4 font-mono font-medium text-slate-400 text-[11px] whitespace-nowrap">
                          {booking.createdAt}
                        </td>

                        {/* Customer full details name */}
                        <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                          {booking.customerName}
                        </td>

                        {/* Guest phone credentials */}
                        <td className="px-6 py-4 font-mono text-slate-350 whitespace-nowrap">
                          {booking.contact}
                        </td>

                        {/* Requested target product */}
                        <td className="px-6 py-4 font-medium max-w-xs truncate" title={booking.productTitle}>
                          {booking.productTitle}
                        </td>

                        {/* Preferred date */}
                        <td className="px-6 py-4 font-mono font-semibold text-emerald-450 whitespace-nowrap">
                          📅 {booking.preferredDate}
                        </td>

                        {/* Pax Count */}
                        <td className="px-6 py-4 text-center font-bold text-slate-200">
                          {booking.pax}명
                        </td>

                        {/* CRM progress statuses badges format */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className={`inline-flex px-2 px-2.5 py-1 text-[10px] font-extrabold rounded-full ${
                            booking.status === 'pending'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : booking.status === 'discussing'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : booking.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-slate-700/20 text-slate-400 border border-slate-700/30'
                          }`}>
                            {booking.status === 'pending' && '🔴 신규접수'}
                            {booking.status === 'discussing' && '🟡 상담중'}
                            {booking.status === 'confirmed' && '🟢 예약확정'}
                            {booking.status === 'completed' && '⚫ 완료/종료'}
                          </span>
                        </td>

                        {/* CRM staff controls inline actions */}
                        <td className="px-6 py-4 text-right whitespace-nowrap space-x-1.5">
                          <button
                            onClick={() => handleOpenDetail(booking)}
                            className="px-2.5 py-1.5 bg-slate-750 hover:bg-slate-700 text-white rounded font-bold transition-colors cursor-pointer"
                          >
                            상세보기
                          </button>
                          
                          <button
                            onClick={() => handleSetupSms(booking)}
                            className="px-2.5 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded transition-colors cursor-pointer"
                          >
                            문자발송
                          </button>

                          <button
                            onClick={() => {
                              if (confirm('이 예약 신청을 삭제처리합니까?')) {
                                onDeleteBooking(booking.id);
                              }
                            }}
                            className="p-1 px-2.5 bg-rose-950 hover:bg-rose-900 border border-rose-800/30 text-rose-300 font-bold rounded transition-colors cursor-pointer inline-flex items-center"
                            title="예약삭제"
                          >
                            삭제
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* DETAILED VIEW & STATUS MANAGER MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in text-slate-800">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Header section dark styling */}
            <div className="p-6 bg-slate-900 text-white text-left relative">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-full transition-colors font-sans cursor-pointer"
              >
                ✕
              </button>
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">예약상태 상세 관제</span>
                <h3 className="text-base sm:text-lg font-bold">
                  고객 예약 신청서 ID: {selectedBooking.id}
                </h3>
                <p className="text-xs text-slate-400">접수번호: {selectedBooking.createdAt}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 text-left max-h-[60vh] overflow-y-auto">
              
              {/* Core customer particulars info */}
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">고객 성함</span>
                  <p className="text-sm font-bold text-slate-900">{selectedBooking.customerName}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">연락처</span>
                  <p className="text-sm font-semibold font-mono text-slate-800">{selectedBooking.contact}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">출발 희망일</span>
                  <p className="text-sm font-semibold font-mono text-slate-800">{selectedBooking.preferredDate}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">동반 인원</span>
                  <p className="text-sm font-bold text-slate-900">{selectedBooking.pax}명</p>
                </div>
              </div>

              {/* Package target details */}
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">신정 대상 골프투어 상품</span>
                <p className="text-xs font-bold text-slate-800 leading-normal">{selectedBooking.productTitle}</p>
              </div>

              {/* Additional comments from guest */}
              {selectedBooking.additionalRequests && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">고객 추가 전달메모</span>
                  <div className="border border-slate-200 bg-slate-50 p-4 rounded-xl text-xs text-slate-700 leading-relaxed italic">
                    "{selectedBooking.additionalRequests}"
                  </div>
                </div>
              )}

              {/* CRM status selector trigger */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">진행 상태 업데이트:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: 'pending', label: '🔴 신규접수' },
                    { key: 'discussing', label: '🟡 상담중' },
                    { key: 'confirmed', label: '🟢 예약확정' },
                    { key: 'completed', label: '⚫ 투어종료' }
                  ].map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => {
                        onUpdateBookingStatus(selectedBooking.id, st.key as any);
                        setSelectedBooking(prev => prev ? { ...prev, status: st.key as any } : null);
                      }}
                      className={`cursor-pointer py-2.5 rounded-xl border font-bold text-[10px] sm:text-xs text-center transition-all ${
                        selectedBooking.status === st.key
                          ? 'bg-slate-900 border-slate-900 text-white shadow-inner'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 font-medium'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Staff notes internal CRM text */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">상담사 디렉터 지정 메모 (비공개):</label>
                  <span className="text-[9px] text-slate-400 font-medium">*관리자들만 열람하는 상담 진행 일지</span>
                </div>
                <textarea
                  rows={3}
                  value={adminMemoInput}
                  onChange={(e) => setAdminMemoInput(e.target.value)}
                  placeholder="예: 고객과 유선상담 완료. 비행기 편명이 아시아나 대행이라 수수료 보장 안내했음. 호텔 투어 오션뷰 객실 타진 중..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400 transition resize-none"
                />
              </div>

            </div>

            {/* Admin control modal triggers bottom footer */}
            <div className="p-5.5 border-t border-slate-100 bg-slate-50 flex justify-end space-x-2.5">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-3 bg-white border border-slate-250 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="cursor-pointer px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-700/10 inline-flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>메모 저장하기</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SMS/ALIMTALK PREVIEW MODAL */}
      {showSmsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in text-slate-800">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Header styled like smartphone kakaotalk yellow header */}
            <div className="p-5 bg-amber-450 text-slate-900 text-left relative flex items-center justify-between">
              <h3 className="font-bold text-xs tracking-wide">
                💬 알림톡/문자 발송 모의 전송창
              </h3>
              <button
                onClick={() => setShowSmsModal(null)}
                className="text-slate-900/80 hover:text-slate-900 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-left bg-slate-100 flex-1">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase">수신자 정보</span>
                <p className="text-xs font-bold text-slate-800">{showSmsModal.customerName} 고객님 ({showSmsModal.contact})</p>
              </div>

              {/* Simulated chat bubble */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block">카카오톡 전송 템플릿 메세지:</span>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 text-xs text-slate-850 whitespace-pre-wrap leading-relaxed font-sans">
                  {smsMessageText}
                </div>
              </div>
            </div>

            {/* Smart Send triggers */}
            <div className="p-4 bg-white border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setShowSmsModal(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold"
              >
                취소
              </button>
              <button
                onClick={handleSendMockSms}
                className="px-4 py-2.5 bg-yellow-450 hover:bg-yellow-500 text-slate-950 rounded-xl text-xs font-extrabold flex items-center space-x-1 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>모의 전송수행</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
