import React, { useState, useMemo } from 'react';
import { Product } from '../types.ts';
import { GOLF_PRODUCTS } from '../data.ts';
import { Search, Flame, Users, CalendarCheck, MapPin, Sparkles, Building2, Utensils, Coins } from 'lucide-react';

interface ProductSectionProps {
  onSelectProduct: (product: Product) => void;
  activeFilterOverride?: string;
}

export default function ProductSection({ onSelectProduct, activeFilterOverride }: ProductSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'overseas' | 'domestic'>('all');
  const [themeFilter, setThemeFilter] = useState<'all' | '긴급마감' | '2인출발' | '골프조인'>(
    (activeFilterOverride as any) || 'all'
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  // React to parent overrides
  React.useEffect(() => {
    if (activeFilterOverride) {
      if (['긴급마감', '2인출발', '골프조인'].includes(activeFilterOverride)) {
        setThemeFilter(activeFilterOverride as any);
        setCategoryFilter('all');
      } else if (activeFilterOverride === 'overseas' || activeFilterOverride === 'domestic') {
        setCategoryFilter(activeFilterOverride);
        setThemeFilter('all');
      }
      setSelectedSubCategory('all');
    }
  }, [activeFilterOverride]);

  // Derive unique sub categories for the selected main category
  const subCategories = useMemo(() => {
    const list = GOLF_PRODUCTS.filter(p => categoryFilter === 'all' || p.category === categoryFilter);
    const set = new Set(list.map(p => p.subCategory));
    return Array.from(set);
  }, [categoryFilter]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return GOLF_PRODUCTS.filter(product => {
      // Search text match
      const textMatch = 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

      // Main Category Match
      const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;

      // Sub Category Match
      const subCategoryMatch = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;

      // Quick Theme Match
      const themeMatch = themeFilter === 'all' || product.badge === themeFilter;

      return textMatch && categoryMatch && subCategoryMatch && themeMatch;
    });
  }, [searchTerm, categoryFilter, selectedSubCategory, themeFilter]);

  return (
    <div className="py-16 bg-slate-50" id="product-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            <span className="text-xs font-bold text-emerald-800">RECOMMENDED PACKAGES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 tracking-tight">
            케이투어 명품 골프 상품 라인업
          </h2>
          <p className="text-sm text-slate-600">
            국내 유수의 해안 씨사이드 골프 코스부터 따뜻하고 이국적인 최고의 그린까지 엄선했습니다.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-10 space-y-6">
          
          {/* Main Category Tabs + Search Input */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            
            {/* Category selection */}
            <div className="flex space-x-1 bg-slate-100 p-1.5 rounded-xl self-start">
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setSelectedSubCategory('all');
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-all ${
                  categoryFilter === 'all' 
                    ? 'bg-emerald-700 text-white shadow' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                전체 상품
              </button>
              <button
                onClick={() => {
                  setCategoryFilter('overseas');
                  setSelectedSubCategory('all');
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-all ${
                  categoryFilter === 'overseas' 
                    ? 'bg-emerald-700 text-white shadow' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                🌐 해외 골프 투어
              </button>
              <button
                onClick={() => {
                  setCategoryFilter('domestic');
                  setSelectedSubCategory('all');
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-all ${
                  categoryFilter === 'domestic' 
                    ? 'bg-emerald-700 text-white shadow' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                🇰🇷 국내 골프 투어
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="목적지, 세부 골프장 또는 키워드 입력..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all font-sans"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  초기화
                </button>
              )}
            </div>
          </div>

          {/* Quick Menu (Theme-Specific Hotfilters) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">🚨 테마별 특화 세션 (Quick Menu)</span>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setThemeFilter('all')}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer flex items-center space-x-1.5 transition-all ${
                  themeFilter === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>테마 전체보기</span>
              </button>

              <button
                id="quick-theme-spot"
                onClick={() => setThemeFilter('긴급마감')}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer flex items-center space-x-1.5 transition-all ${
                  themeFilter === '긴급마감'
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/10'
                    : 'bg-rose-50/50 text-rose-800 border-rose-200 hover:bg-rose-100/60'
                }`}
              >
                <Flame className="w-4 h-4 animate-bounce" />
                <span>[🚨 긴급마감/스팟특가]</span>
              </button>

              <button
                id="quick-theme-twopax"
                onClick={() => setThemeFilter('2인출발')}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer flex items-center space-x-1.5 transition-all ${
                  themeFilter === '2인출발'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/10'
                    : 'bg-amber-50/50 text-amber-850 border-amber-200 hover:bg-amber-100/60'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>[👥 2인 출발 가능 상품]</span>
              </button>

              <button
                id="quick-theme-join"
                onClick={() => setThemeFilter('골프조인')}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer flex items-center space-x-1.5 transition-all ${
                  themeFilter === '골프조인'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/10'
                    : 'bg-teal-50/50 text-teal-850 border-teal-200 hover:bg-teal-150'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>[🤝 2인골프 조인방/2인골프 조인신청]</span>
              </button>
            </div>
          </div>

          {/* Subcategory Pill Filters (Thailand / Gangwon etc.) */}
          {subCategories.length > 0 && (
            <div className="pt-4 border-t border-slate-50 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-2">세부 지역:</span>
              <button
                onClick={() => setSelectedSubCategory('all')}
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
                  selectedSubCategory === 'all'
                    ? 'bg-emerald-100 text-emerald-800 border-transparent font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                전체 지역
              </button>
              {subCategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
                    selectedSubCategory === sub
                      ? 'bg-emerald-150 text-emerald-900 border-transparent font-semibold shadow-sm border border-emerald-400/25'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Zero Results View */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 max-w-lg mx-auto">
            <span className="text-4xl text-slate-300">🔍</span>
            <h3 className="text-lg font-bold text-slate-800 mt-4">조건에 부합하는 골프 상품이 없습니다.</h3>
            <p className="text-xs text-slate-500 mt-2">다른 검색어나 테마 분류 필터를 클릭해보세요.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setThemeFilter('all');
                setSelectedSubCategory('all');
              }}
              className="mt-6 px-4 py-2 bg-emerald-750 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              모든 조건 초기화
            </button>
          </div>
        )}

        {/* Products Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            return (
              <div 
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full"
                id={`product-card-${product.id}`}
              >
                {/* Product Thumbnail with Tags */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide shadow-sm border ${
                        product.badge === '긴급마감' 
                          ? 'bg-rose-500 text-white border-rose-400'
                          : product.badge === '2인출발'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-emerald-600 text-white border-emerald-500'
                      }`}>
                        {product.badge === '긴급마감' ? '🚨 긴급마감' : product.badge === '2인출발' ? '👥 2인출발' : '🤝 2인조인'}
                      </span>
                    </div>
                  )}

                  {/* Duration overlay badge */}
                  <div className="absolute bottom-4 right-4 bg-black/75 px-3 py-1 rounded-lg text-white font-semibold text-[11px] backdrop-blur-sm">
                    {product.duration}
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Location Tag */}
                    <div className="flex items-center space-x-1 text-emerald-700 font-semibold text-xs mb-1.5">
                      <MapPin className="w-3 h-3" />
                      <span>{product.subCategory}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2 md:text-base mb-2">
                      {product.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 border border-slate-100/60">
                    {product.highlights.slice(0, 2).map((hl, k) => (
                      <div key={k} className="flex items-start text-xs text-slate-700 leading-normal">
                        <span className="text-emerald-600 mr-2 flex-shrink-0 mt-0.5">✔</span>
                        <p>{hl}</p>
                      </div>
                    ))}
                  </div>

                  {/* Comfort inclusions Detail Info */}
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-slate-600 text-[11px]">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700 truncate">숙소: {product.hotelName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Utensils className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500 truncate">식사: {product.meals}</span>
                    </div>
                  </div>

                  {/* Pricing and Reservation Trigger */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold block leading-none">라운딩 포함가</p>
                      <span className="font-sans font-extrabold text-lg text-emerald-800">
                        {product.priceText} <span className="text-xs text-slate-400 font-medium font-sans">원</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-4.5 py-3 rounded-xl transition-all shadow-sm shadow-emerald-700/10 active:scale-95"
                    >
                      상세확인 / 예약신청
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
