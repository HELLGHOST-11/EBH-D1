import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Department, Doctor } from '../types';
import { Calendar, ShieldCheck, ArrowRight, Activity, HeartPulse, Stethoscope, Sparkles, Phone } from 'lucide-react';

interface HeroProps {
  departments: Department[];
  doctors: Doctor[];
  onOpenBookingWithSelection: (deptId?: string, docId?: string) => void;
  onOpenAuth: () => void;
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  departments,
  doctors,
  onOpenBookingWithSelection,
  onOpenAuth,
  setActiveTab
}) => {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');

  const filteredDoctors = selectedDept
    ? doctors.filter((d) => d.departmentId === selectedDept)
    : doctors;

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingWithSelection(selectedDept, selectedDoc);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#F5FAF8] via-[#F5FAF8] to-white">
      
      {/* Subtle Background Glow Spheres */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#21A366]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#087443]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087443]/10 border border-[#087443]/20 text-[#087443] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#21A366]" />
              <span>EXIM Bank Foundation CSR Initiative • Est. May 8, 2010</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#263238] leading-[1.12]">
              Providing Healthcare With Care & <span className="text-[#087443]">Rational Manner</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#263238]/70 max-w-2xl font-normal leading-relaxed">
              Serving the nation with modern, affordable medical care. Conveniently located beside Kazipara Metro Rail Station, Dhaka with 24/7 emergency, diagnostic, and specialist medical care.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onOpenBookingWithSelection()}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#087443] hover:bg-[#065b34] rounded-xl shadow-lg shadow-[#087443]/25 transition-all duration-200 group cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-[#21A366]" />
                <span>Book Doctor Appointment</span>
              </button>

              <a
                href="tel:+8801857903231"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-[#087443] bg-white hover:bg-emerald-50/80 border-2 border-[#087443]/30 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#087443]/10 flex items-center justify-center text-[#087443] group-hover:bg-[#087443] group-hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Call Now: +880 1857-903231</span>
              </a>
            </div>

            {/* Quick Feature & Diagnostic Offer Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-t border-[#087443]/10 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#087443] bg-white p-2.5 rounded-xl border border-[#087443]/10 shadow-xs">
                <HeartPulse className="w-4 h-4 text-[#21A366] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#263238]/60 uppercase font-medium">CT Scan (Brain)</span>
                  <span className="font-extrabold text-[#087443]">৳3,000 BDT</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#087443] bg-white p-2.5 rounded-xl border border-[#087443]/10 shadow-xs">
                <Activity className="w-4 h-4 text-[#087443] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#263238]/60 uppercase font-medium">M.R.I (Brain/Spine)</span>
                  <span className="font-extrabold text-[#087443]">৳6,000 BDT</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#087443] bg-white p-2.5 rounded-xl border border-[#087443]/10 shadow-xs">
                <Stethoscope className="w-4 h-4 text-[#21A366] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#263238]/60 uppercase font-medium">Pathology Lab</span>
                  <span className="font-extrabold text-[#21A366]">10% Flat Discount</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Image + Quick Booking Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#087443]/15 bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                alt="EXIM Bank Hospital Medical Center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800';
                }}
                className="w-full h-64 object-cover rounded-2xl"
              />

              {/* Floating Live Vitals Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#087443]/10 shadow-lg flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#21A366] animate-ping" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#087443]">Live Hospital Status</p>
                  <p className="text-xs font-bold text-[#263238]">99.4% Patient Care Index</p>
                </div>
              </div>

              {/* Quick Booking Form Box */}
              <div className="p-5 bg-white rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#087443]/10 pb-3">
                  <h3 className="text-base font-semibold text-[#263238] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#087443]" />
                    Quick Appointment Booking
                  </h3>
                  <span className="text-[10px] bg-[#21A366]/10 text-[#087443] px-2 py-0.5 rounded font-medium">Instant</span>
                </div>

                <form onSubmit={handleQuickBook} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#263238]/70 mb-1">
                      1. Select Medical Department
                    </label>
                    <select
                      value={selectedDept}
                      onChange={(e) => {
                        setSelectedDept(e.target.value);
                        setSelectedDoc('');
                      }}
                      className="w-full px-3 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl text-[#263238] focus:outline-none focus:border-[#087443]"
                    >
                      <option value="">Choose Department...</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#263238]/70 mb-1">
                      2. Choose Attending Specialist
                    </label>
                    <select
                      value={selectedDoc}
                      onChange={(e) => setSelectedDoc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl text-[#263238] focus:outline-none focus:border-[#087443]"
                    >
                      <option value="">Any Available Specialist</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} - {doc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#087443] hover:bg-[#065b34] rounded-xl shadow-md shadow-[#087443]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Stethoscope className="w-4 h-4 text-[#21A366]" />
                    <span>Book Doctor Appointment</span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Minimalist Key Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white border border-[#087443]/10 shadow-sm">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#087443]">14,500+</p>
            <p className="text-xs text-[#263238]/70">Patients Served Annually</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#21A366]">85+</p>
            <p className="text-xs text-[#263238]/70">World-Class Physicians</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#087443]">100%</p>
            <p className="text-xs text-[#263238]/70">Digital EHR Privacy</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#21A366]">24/7</p>
            <p className="text-xs text-[#263238]/70">Emergency Critical Unit</p>
          </div>
        </div>

      </div>
    </section>
  );
};
