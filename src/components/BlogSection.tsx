import React, { useState } from 'react';
import { BlogReview, Product } from '../types.ts';
import { NAVER_BLOG_REVIEWS, GOLF_PRODUCTS } from '../data.ts';
import { Calendar, ChevronRight, MessageSquareCode, Share2, Award, Heart, HeartOff, FileHeart, ExternalLink, Sparkles, Send } from 'lucide-react';

interface BlogSectionProps {
  onSelectProductById: (productId: string) => void;
}

export default function BlogSection({ onSelectProductById }: BlogSectionProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogReview | null>(null);
  const [likedBlogs, setLikedBlogs] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedBlogs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Associate blog with real golf products
  const getAssociatedProduct = (golfCourseName: string): Product | undefined => {
    if (golfCourseName.includes('디오션')) {
      return GOLF_PRODUCTS.find(p => p.id === 'dom-yeosu');
    } else if (golfCourseName.includes('치앙마이') || golfCourseName.includes('하이랜드')) {
      return GOLF_PRODUCTS.find(p => p.id === 'ovs-chiangmai');
    } else if (golfCourseName.includes('루스츠') || golfCourseName.includes('북해도')) {
      return GOLF_PRODUCTS.find(p => p.id === 'ovs-hokkaido');
    } else if (golfCourseName.includes('제주') || golfCourseName.includes('핀크스')) {
      return GOLF_PRODUCTS.find(p => p.id === 'dom-jeju');
    }
    return undefined;
  };

  return (
    <section className="py-20 bg-white border-y border-emerald-50" id="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="text-emerald-700 text-xs font-bold font-mono">NAVER BLOG RSS INTEGRATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
              🍀 K-TOUR 리얼 현지 답사기
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-light">
              판매자의 전문성을 바탕으로 직접 해외 골프장 및 호캉스 리조트를 답사한 생생한 실사 후기만을 모았습니다. 허위 이미지 없는 진짜 후기를 만나보세요.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <a 
              href="https://blog.naver.com/rudu_ktour" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-emerald-600 font-bold border border-slate-200 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all font-sans"
            >
              <span>케이투어 공식 네이버 블로그 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Blog Post List (RSS Mock Widget Cards Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NAVER_BLOG_REVIEWS.map((review) => {
            const isLiked = likedBlogs[review.id];
            
            return (
              <div
                key={review.id}
                onClick={() => setSelectedBlog(review)}
                className="bg-slate-50 rounded-2xl border border-slate-100/80 p-5 flex flex-col justify-between hover:shadow-lg hover:border-emerald-100 group transition-all duration-300 cursor-pointer h-full relative"
                id={`blog-card-${review.id}`}
              >
                <div>
                  {/* Visual Image Header */}
                  <div className="relative aspect-[16/10] bg-slate-200 rounded-xl overflow-hidden mb-4">
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow border border-slate-150 px-2 py-0.5 rounded text-[10px] font-extrabold text-emerald-800">
                      💚 리얼현지답사
                    </div>
                  </div>

                  {/* Date & Author */}
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold mb-2">
                    <span className="text-emerald-600 truncate max-w-[120px]">{review.author}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-2 text-sm sm:text-base mb-2.5 transition-colors leading-snug">
                    {review.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4 font-light">
                    {review.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-200/40 px-2.5 py-1 rounded-md">
                    {review.golfCourse}
                  </span>
                  
                  {/* Action hearts */}
                  <div className="flex items-center space-x-2 text-slate-400">
                    <button 
                      onClick={(e) => handleLike(review.id, e)}
                      className="hover:text-red-500 p-1.5 hover:bg-white rounded-full transition-colors font-sans"
                    >
                      {isLiked ? (
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      ) : (
                        <Heart className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cross-linking conversion trust banner */}
        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-lg shadow-inner">
              📢
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">실사 후기를 보고 안심하신 후 예약하세요!</h4>
              <p className="text-xs text-emerald-800/80 mt-0.5 leading-relaxed">
                케이투어의 모든 상품은 대표자가 전속 인력과 함께 직접 현지 골프장, 조식, 숙소 동선을 확인한 후 발매합니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById('product-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="cursor-pointer bg-white hover:bg-emerald-100 text-emerald-950 px-5  py-2.5 rounded-xl border border-emerald-250 text-xs font-extrabold shadow-sm flex items-center space-x-1"
          >
            <span>상담 후기 연결 상품보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Blog Overlay Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100">
            {/* Header image cover */}
            <div className="relative h-60 w-full bg-slate-100">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2.5 rounded-full transition-colors font-sans hover:scale-105"
              >
                ✕
              </button>

              <div className="absolute bottom-5 left-6 right-6 text-white text-left space-y-1.5">
                <span className="px-2.5 py-0.5 bg-emerald-700 text-white text-[10px] font-extrabold rounded">
                  네이버 블로그 리포트
                </span>
                <h3 className="font-bold text-lg sm:text-xl font-sans tracking-tight leading-snug">
                  {selectedBlog.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 text-left space-y-6">
              
              {/* Author details */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    K
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{selectedBlog.author}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">케이투어 공식 필드디렉터</p>
                  </div>
                </div>
                <div className="text-right text-slate-400 text-xs">
                  <div className="flex items-center space-x-1 text-[11px] font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>작성일: {selectedBlog.date}</span>
                  </div>
                </div>
              </div>

              {/* Text Blog post contents - simulated in details */}
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans">
                <p className="font-semibold text-emerald-800 text-base">
                  📍 답사 골프 코스: {selectedBlog.golfCourse}
                </p>
                <p>
                  골프 여행 매니아분들 반갑습니다! {selectedBlog.author}입니다. 인터넷에 널려 있는 가짜 리뷰, 퍼온 숙박 사진 말고 정말 저희가 한 땀 한 땀 답사하며 코스 상태와 주변 맛집 경로까지 풀 세팅해둔 답사 실황을 공유합니다.
                </p>
                <p>
                  그린 스피드는 현재 2.8m 선을 유지하고 있어 초급자분들도 충분히 즐길 수 있는 스피드가 나오며, 잔디 배수 상태가 우수하여 혹시 모를 짧은 골프 스콜 기후에도 완벽한 굿 샷이 가능합니다. 특식으로 포함되는 식단 또한 단품이 아닌 남도의 진수 성찬과 호텔 파인다이닝 등 최고 만족률을 자랑하는 코스만 추려두어 자부하게 설명해 드립니다.
                </p>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-150 text-xs text-emerald-950 font-medium">
                  💡 대표자 한줄조언: 이 패키지는 부부 동반이나 친목 라운딩으로 다녀오실 때 호텔 숙소의 방 배치도 완벽히 분할되어 있어 프라이버시가 강하게 보장됩니다.
                </div>
                <p>
                  이미 명문 구장 조인 시스템도 티오프 스케줄도 케이투어에서 황금 시간대 블록으로 전량을 미리 사두었기 때문에, "잔여 티 타임 매칭 대기 스트레스" 없이 아래 예약을 주시면 담당자 해피콜만으로 즉시 출정 가능한 투어로 설계해 드립니다!
                </p>
              </div>

              {/* CROSS LINKING CONVERSION ACTION BUTTON */}
              {getAssociatedProduct(selectedBlog.golfCourse) ? (
                <div className="mt-8 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block font-mono">CROSS-RECOMMENDED PRODUCT</span>
                      <h4 className="font-bold text-sm text-slate-100 mt-1">
                        {getAssociatedProduct(selectedBlog.golfCourse)?.title}
                      </h4>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold px-2 py-1 rounded">
                      {getAssociatedProduct(selectedBlog.golfCourse)?.priceText} 원~
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        const product = getAssociatedProduct(selectedBlog.golfCourse);
                        if (product) {
                          onSelectProductById(product.id);
                          setSelectedBlog(null);
                        }
                      }}
                      className="cursor-pointer flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors text-center"
                    >
                      👉 이 후기 골프상품 즉시 예약 상담 신청하기
                    </button>
                    <a
                      href={selectedBlog.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center justify-center space-x-1"
                    >
                      <span>네이버 실글 보기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="px-5 py-2.5 bg-slate-150 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold"
                  >
                    창 닫기
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
