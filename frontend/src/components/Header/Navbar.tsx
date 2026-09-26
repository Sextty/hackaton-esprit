import React, { useState } from 'react';
import { Language, NavItem, PageId } from '../../types';
import { Logo } from './Logo';
import { navigationItems } from '../../data/mockData';
import { ChevronDown, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  activeNav: PageId;
  onNavSelect: (page: PageId, subpage?: string) => void;
  onSearchOpen: () => void;
  onOpenModalAction?: (action: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  activeNav,
  onNavSelect,
  onSearchOpen,
  onOpenModalAction,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="h-20 bg-[#003087] shadow-lg sticky top-0 z-40 relative select-none">
      <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        {/* Official Logo */}
        <Logo lang={lang} onClick={() => onNavSelect('accueil')} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full">
          <ul className="flex items-center h-full">
            {navigationItems.map((item) => {
              const isActive = activeNav === item.id;
              const hasDropdown = Boolean(item.hasDropdown && (item.sections || item.children));

              return (
                <li
                  key={item.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      onNavSelect(item.id);
                      if (hasDropdown) {
                        setOpenDropdown(openDropdown === item.id ? null : item.id);
                      }
                    }}
                    className={`h-full px-3 flex items-center gap-1 text-[13px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer relative ${
                      isActive
                        ? 'bg-[rgba(255,255,255,0.15)] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#C8A951]'
                        : 'hover:bg-[rgba(255,255,255,0.10)]'
                    }`}
                  >
                    <span>{item.label[lang]}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${
                          openDropdown === item.id ? 'rotate-180 text-[#C8A951]' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Mega-menu dropdown */}
                  {hasDropdown && openDropdown === item.id && (
                    <div
                      className={`absolute top-20 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18)] border-t-2 border-[#C8A951] z-50 animate-fade-in text-left ${
                        item.sections && item.sections.length > 1
                          ? 'w-[680px] -left-32'
                          : 'min-w-[320px] left-0'
                      }`}
                    >
                      {item.sections ? (
                        <div className={`p-4 grid gap-6 ${item.sections.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                          {item.sections.map((sec, sIdx) => (
                            <div key={sIdx} className="space-y-2">
                              <h4 className="text-[11px] font-bold text-[#003087] uppercase tracking-wider border-b border-[#E0E0E0] pb-1.5 flex items-center gap-1">
                                <span className="w-1.5 h-3 bg-[#C8A951] rounded-xs inline-block" />
                                {sec.category[lang]}
                              </h4>
                              <div className="space-y-1">
                                {sec.items.map((sub, subIdx) => (
                                  <button
                                    key={subIdx}
                                    onClick={() => {
                                      if (sub.action && onOpenModalAction) {
                                        onOpenModalAction(sub.action);
                                      } else {
                                        onNavSelect(sub.page, sub.subpage);
                                      }
                                      setOpenDropdown(null);
                                    }}
                                    className="w-full text-left p-1.5 text-xs text-[#444444] hover:text-[#003087] hover:bg-[#F5F5F5] rounded transition-colors group flex items-start justify-between cursor-pointer"
                                  >
                                    <span className="group-hover:font-semibold">
                                      {sub.title[lang]}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[9px] bg-[#E8F0FE] text-[#003087] font-bold px-1.5 py-0.2 rounded ml-1 shrink-0">
                                        {sub.badge[lang]}
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-2">
                          {item.children?.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                onNavSelect(sub.page, sub.subpage);
                                setOpenDropdown(null);
                              }}
                              className="w-full text-left px-5 py-2.5 hover:bg-[#F5F5F5] text-xs text-[#333333] hover:text-[#003087] transition-colors border-b border-[#F0F0F0] last:border-b-0 cursor-pointer"
                            >
                              <span className="font-semibold">{sub.title[lang]}</span>
                              {sub.desc && (
                                <p className="text-[11px] text-[#777777] mt-0.5">{sub.desc[lang]}</p>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick Search */}
          <button
            onClick={onSearchOpen}
            title={lang === 'ar' ? 'بحث في الموقع' : 'Rechercher sur le portail'}
            className="ml-3 p-2.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onSearchOpen}
            className="p-2 text-white hover:bg-white/10 rounded-md"
            title="Recherche"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-md cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#002266] border-t border-[#003087] text-white px-4 py-4 space-y-2 shadow-2xl animate-fade-in max-h-[80vh] overflow-y-auto">
          {navigationItems.map((item) => (
            <div key={item.id} className="border-b border-[#003399]/40 pb-2">
              <button
                onClick={() => {
                  onNavSelect(item.id);
                  if (!item.sections && !item.children) setMobileMenuOpen(false);
                  else setOpenDropdown(openDropdown === item.id ? null : item.id);
                }}
                className={`w-full flex items-center justify-between py-2 text-left text-xs font-bold uppercase ${
                  activeNav === item.id ? 'text-[#C8A951]' : 'text-white'
                }`}
              >
                <span>{item.label[lang]}</span>
                {(item.sections || item.children) && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === item.id ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {openDropdown === item.id && (
                <div className="pl-3 mt-1.5 space-y-2 bg-[#001848]/70 p-2.5 rounded text-xs">
                  {item.sections ? (
                    item.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="space-y-1 mb-2">
                        <strong className="text-[10px] text-[#C8A951] uppercase block border-b border-white/10 pb-0.5">
                          {sec.category[lang]}
                        </strong>
                        {sec.items.map((sub, subIdx) => (
                          <button
                            key={subIdx}
                            onClick={() => {
                              if (sub.action && onOpenModalAction) {
                                onOpenModalAction(sub.action);
                              } else {
                                onNavSelect(sub.page, sub.subpage);
                              }
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left block py-1 text-slate-200 hover:text-white"
                          >
                            {sub.title[lang]}
                          </button>
                        ))}
                      </div>
                    ))
                  ) : (
                    item.children?.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onNavSelect(sub.page, sub.subpage);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left block py-1 text-slate-200 hover:text-white"
                      >
                        {sub.title[lang]}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
