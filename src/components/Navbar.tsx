import React, { useState } from 'react';
import { Logo } from './Logo';
import { User } from '../types';
import { UserCheck, Shield, Menu, X, Calendar, LogOut, FileText, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenBooking: () => void;
  onToggleAdmin: () => void;
  isAdminView: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenBooking,
  onToggleAdmin,
  isAdminView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <>
      {/* Top Corporate & Emergency Info Strip */}
      <div className="bg-[#263238] text-white text-[11px] py-1.5 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-300">
            <span className="text-[#21A366] font-semibold">EXIM Bank Foundation CSR Initiative</span>
            <span>•</span>
            <span>Beside Kazipara Metro Station, Mirpur, Dhaka</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-bold">Helpline: +880 1857-903231</span>
            <span className="bg-[#21A366]/20 text-[#21A366] px-2 py-0.5 rounded text-[10px] font-semibold uppercase">24 Hours Open</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#F5FAF8]/90 backdrop-blur-md border-b border-[#087443]/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
          <Logo />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/60 p-1.5 rounded-full border border-[#087443]/10 shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id && !isAdminView;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#087443] text-white shadow-sm'
                    : 'text-[#263238]/80 hover:text-[#087443] hover:bg-[#087443]/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#087443]/15">
              {currentUser.role === 'admin' && (
                <button
                  onClick={onToggleAdmin}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
                    isAdminView
                      ? 'bg-[#263238] text-white'
                      : 'bg-[#087443]/10 text-[#087443] hover:bg-[#087443]/20'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{isAdminView ? 'Exit Admin' : 'Admin Panel'}</span>
                </button>
              )}
              <span className="text-xs font-semibold text-[#087443] bg-[#087443]/10 px-3 py-1.5 rounded-xl">
                {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 text-[#263238]/60 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#087443] bg-white hover:bg-[#087443]/5 border border-[#087443]/20 rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#21A366]" />
              <span>Patient Portal</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="p-2 bg-[#087443] text-white rounded-lg"
            title="Book Appointment"
          >
            <Calendar className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#263238] hover:bg-[#087443]/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5FAF8] border-b border-[#087443]/10 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#087443] text-white'
                    : 'text-[#263238] hover:bg-[#087443]/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#087443]/10 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setActiveTab('portal');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-[#087443] text-white rounded-xl text-sm font-semibold"
                >
                  My Medical Records ({currentUser.name})
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      onToggleAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 bg-[#263238] text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#21A366]" />
                    {isAdminView ? 'Exit Admin Panel' : 'Admin Panel'}
                  </button>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 bg-red-50 text-red-600 rounded-xl text-xs font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 bg-[#087443] text-white rounded-xl text-sm font-semibold shadow-sm"
              >
                Patient Portal / Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  </>
  );
};
