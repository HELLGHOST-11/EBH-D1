import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Doctor, Department } from '../types';
import { Star, Calendar, Stethoscope, Sparkles, Clock, DollarSign, Award, CheckCircle2 } from 'lucide-react';

interface DoctorsSectionProps {
  doctors: Doctor[];
  departments: Department[];
  onOpenBookingWithSelection: (deptId?: string, docId?: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  doctors,
  departments,
  onOpenBookingWithSelection
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState('all');

  const filteredDoctors = selectedDeptId === 'all'
    ? doctors
    : doctors.filter((d) => d.departmentId === selectedDeptId);

  return (
    <section id="doctors" className="py-20 bg-[#F5FAF8] border-t border-[#087443]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087443]/10 text-[#087443] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#21A366]" />
            World-Class Medical Roster
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238] tracking-tight">
            Consult With Senior Specialist Doctors
          </h2>
          <p className="text-xs sm:text-sm text-[#263238]/75 max-w-2xl mx-auto leading-relaxed">
            Our experienced, board-certified physicians deliver patient-centered consultations, accurate diagnoses, and empathetic clinical care across all departments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2 max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              selectedDeptId === 'all'
                ? 'bg-[#087443] text-white shadow-md shadow-[#087443]/20'
                : 'bg-white text-[#263238] border border-[#087443]/20 hover:border-[#087443] hover:bg-[#087443]/5'
            }`}
          >
            All Specialists ({doctors.length})
          </button>
          {departments.map((dept) => {
            const count = doctors.filter((d) => d.departmentId === dept.id).length;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                  selectedDeptId === dept.id
                    ? 'bg-[#087443] text-white shadow-md shadow-[#087443]/20'
                    : 'bg-white text-[#263238] border border-[#087443]/20 hover:border-[#087443] hover:bg-[#087443]/5'
                }`}
              >
                <span>{dept.name}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedDeptId === dept.id ? 'bg-white/25 text-white' : 'bg-[#087443]/10 text-[#087443]'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredDoctors.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#087443]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-[#F5FAF8]">
                  <img
                    src={doc.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500'}
                    alt={doc.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500';
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#087443]/10 text-xs font-bold text-[#263238] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#263238]/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-medium">
                    {doc.departmentName}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#263238]">{doc.name}</h3>
                    <p className="text-xs font-semibold text-[#087443]">{doc.title}</p>
                    <p className="text-[11px] text-[#263238]/60 mt-0.5">{doc.qualification}</p>
                  </div>

                  <p className="text-xs text-[#263238]/75 leading-relaxed line-clamp-2">
                    {doc.bio}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#087443]/10 text-xs text-[#263238]/70">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#21A366]" />
                        <span>Days:</span>
                      </span>
                      <span className="font-semibold text-[#263238]">{doc.availableDays.join(', ')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#21A366]" />
                        <span>Hours:</span>
                      </span>
                      <span className="font-medium text-[#263238]">{doc.timeSlot}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#087443]" />
                        <span>Experience:</span>
                      </span>
                      <span className="font-semibold text-[#087443]">{doc.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-transparent">
                <div>
                  <span className="text-[10px] text-[#263238]/60 block uppercase font-medium">Consultation</span>
                  <span className="text-sm font-bold text-[#087443]">৳{doc.consultationFee} BDT</span>
                </div>

                <button
                  onClick={() => onOpenBookingWithSelection(doc.departmentId, doc.id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#087443] hover:bg-[#065b34] rounded-xl transition-all shadow-sm shadow-[#087443]/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-[#21A366]" />
                  <span>Book Doctor Appointment</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
