import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Department } from '../types';
import {
  HeartPulse,
  Brain,
  Bone,
  Dna,
  ShieldCheck,
  Scan,
  Calendar,
  Stethoscope,
  Sparkles,
  Check,
  Phone,
  Building,
  ChevronRight,
  X
} from 'lucide-react';

interface DepartmentsSectionProps {
  departments: Department[];
  onOpenBookingWithSelection: (deptId?: string) => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  departments,
  onOpenBookingWithSelection
}) => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#087443]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#21A366]" />;
      case 'Bone':
        return <Bone className="w-6 h-6 text-[#087443]" />;
      case 'Dna':
        return <Dna className="w-6 h-6 text-[#21A366]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#087443]" />;
      case 'Scan':
        return <Scan className="w-6 h-6 text-[#21A366]" />;
      default:
        return <HeartPulse className="w-6 h-6 text-[#087443]" />;
    }
  };

  return (
    <section id="departments" className="py-20 bg-white border-t border-[#087443]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087443]/10 text-[#087443] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#21A366]" />
            Clinical & Diagnostic Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238] tracking-tight">
            Specialized Departments & Services
          </h2>
          <p className="text-xs sm:text-sm text-[#263238]/75 max-w-2xl mx-auto leading-relaxed">
            Explore specialized clinical units and high-tech diagnostic services at EXIM Bank Hospital (West Kazipara, Mirpur).
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onOpenBookingWithSelection()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#087443] hover:bg-[#065b34] rounded-xl transition-all shadow-md shadow-[#087443]/20 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-[#21A366]" />
              <span>Book Doctor Appointment</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Special Rates Highlight Banner */}
        <div className="bg-[#087443]/5 border border-[#087443]/20 rounded-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-[#087443]/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#087443] uppercase tracking-wider block">CT Scan (Brain)</span>
              <span className="text-base font-extrabold text-[#263238]">৳3,000 BDT</span>
            </div>
            <span className="px-2 py-1 bg-[#087443]/10 text-[#087443] text-[10px] font-bold rounded-lg">High Precision</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#087443]/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#087443] uppercase tracking-wider block">M.R.I (Brain/Spine)</span>
              <span className="text-base font-extrabold text-[#263238]">৳6,000 BDT</span>
            </div>
            <span className="px-2 py-1 bg-[#087443]/10 text-[#087443] text-[10px] font-bold rounded-lg">Silent MRI</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#087443]/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#087443] uppercase tracking-wider block">All Pathology Lab Tests</span>
              <span className="text-base font-extrabold text-[#21A366]">10% Flat Discount</span>
            </div>
            <span className="px-2 py-1 bg-[#21A366]/10 text-[#21A366] text-[10px] font-bold rounded-lg">10% OFF</span>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              whileHover={{ y: -4 }}
              className="group bg-[#F5FAF8] rounded-2xl overflow-hidden border border-[#087443]/10 hover:border-[#087443]/30 transition-all shadow-sm flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dept.image || 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800'}
                  alt={dept.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#263238]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md rounded-xl border border-[#087443]/10">
                  {getDepartmentIcon(dept.icon)}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    {dept.doctorsCount} Specialists
                  </span>
                  <h3 className="text-lg font-bold text-white line-clamp-1">{dept.name}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#087443] mb-1">{dept.tagline}</p>
                  <p className="text-xs text-[#263238]/70 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#087443]/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedDept(dept)}
                    className="text-xs font-semibold text-[#087443] hover:text-[#065b34] flex items-center gap-1"
                  >
                    <span>View Services & Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenBookingWithSelection(dept.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#087443] hover:bg-[#065b34] rounded-lg transition-colors cursor-pointer"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-[#21A366]" />
                    <span>Book Doctor Appointment</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Department Detail Modal */}
      <AnimatePresence>
        {selectedDept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263238]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#087443]/20 shadow-2xl p-6 sm:p-8 relative space-y-6"
            >
              <button
                onClick={() => setSelectedDept(null)}
                className="absolute top-6 right-6 p-2 text-[#263238]/60 hover:text-[#263238] bg-[#F5FAF8] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 border-b border-[#087443]/10 pb-4">
                <div className="p-3 bg-[#087443]/10 rounded-2xl">
                  {getDepartmentIcon(selectedDept.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#263238]">{selectedDept.name}</h3>
                  <p className="text-xs text-[#087443] font-medium">{selectedDept.tagline}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#263238]/80">
                <p className="leading-relaxed">{selectedDept.description}</p>

                <div className="grid grid-cols-2 gap-4 bg-[#F5FAF8] p-4 rounded-2xl border border-[#087443]/10 text-xs">
                  <div>
                    <span className="text-[#263238]/60 block font-medium">Chief Department Head:</span>
                    <span className="font-bold text-[#087443]">{selectedDept.headDoctor}</span>
                  </div>
                  <div>
                    <span className="text-[#263238]/60 block font-medium">Facility Location:</span>
                    <span className="font-bold text-[#263238] flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#21A366]" />
                      {selectedDept.roomNumbers || 'Executive Wing'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#263238]/60 block font-medium">Direct Line:</span>
                    <span className="font-semibold text-[#263238] flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#21A366]" />
                      {selectedDept.contactPhone || '+1 (800) 555-0000'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#263238]/60 block font-medium">Active Specialists:</span>
                    <span className="font-bold text-[#21A366]">{selectedDept.doctorsCount} Physicians</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider mb-2">
                    Specialized Medical Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDept.services.map((svc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs bg-white p-2.5 rounded-xl border border-[#087443]/10">
                        <Check className="w-4 h-4 text-[#21A366] shrink-0" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#087443]/10 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedDept(null)}
                  className="px-4 py-2 text-xs font-medium text-[#263238] hover:bg-[#F5FAF8] rounded-xl"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    const id = selectedDept.id;
                    setSelectedDept(null);
                    onOpenBookingWithSelection(id);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#087443] hover:bg-[#065b34] rounded-xl shadow-md shadow-[#087443]/20 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-[#21A366]" />
                  <span>Book Doctor Appointment</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
