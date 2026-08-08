import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Department, Doctor, User } from '../types';
import { X, Calendar, Clock, User as UserIcon, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
  doctors: Doctor[];
  initialDeptId?: string;
  initialDocId?: string;
  currentUser: User | null;
  onAppointmentCreated: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  departments,
  doctors,
  initialDeptId = '',
  initialDocId = '',
  currentUser,
  onAppointmentCreated
}) => {
  const [deptId, setDeptId] = useState(initialDeptId);
  const [doctorId, setDoctorId] = useState(initialDocId);
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [patientEmail, setPatientEmail] = useState(currentUser?.email || '');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [reason, setReason] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialDeptId) setDeptId(initialDeptId);
    if (initialDocId) setDoctorId(initialDocId);
    if (currentUser) {
      setPatientName(currentUser.name || '');
      setPatientEmail(currentUser.email || '');
      setPatientPhone(currentUser.phone || '');
    }
  }, [initialDeptId, initialDocId, currentUser, isOpen]);

  if (!isOpen) return null;

  const filteredDoctors = deptId
    ? doctors.filter((d) => d.departmentId === deptId)
    : doctors;

  const availableTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '02:00 PM', '02:30 PM', '03:30 PM', '04:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const selectedDoc = doctors.find((d) => d.id === doctorId);
    const selectedDept = departments.find((dp) => dp.id === deptId);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: currentUser?.id || 'guest',
          patientName,
          patientEmail,
          patientPhone,
          doctorId: selectedDoc?.id || '',
          doctorName: selectedDoc?.name || 'Assigned Specialist',
          departmentName: selectedDept?.name || selectedDoc?.departmentName || 'General Medicine',
          date,
          time,
          reason
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit appointment.');
      }

      setSuccessMsg('Your appointment request has been confirmed by EXIM Bank Hospital!');
      onAppointmentCreated();
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263238]/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#087443]/20 shadow-2xl p-6 sm:p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#263238]/60 hover:text-[#263238] bg-[#F5FAF8] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-[#087443]/10">
          <div className="p-3 bg-[#087443]/10 rounded-2xl text-[#087443]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#263238]">Schedule Specialist Visit</h3>
            <p className="text-xs text-[#087443] font-medium">EXIM Bank Hospital Medical Consultation</p>
          </div>
        </div>

        {successMsg ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#21A366] mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-[#263238]">Appointment Confirmed!</h4>
            <p className="text-xs sm:text-sm text-[#263238]/70 max-w-md mx-auto">
              {successMsg} An instant confirmation SMS and email summary have been routed to your registered details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1">
                  1. Clinical Department
                </label>
                <select
                  value={deptId}
                  onChange={(e) => {
                    setDeptId(e.target.value);
                    setDoctorId('');
                  }}
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl text-[#263238] focus:outline-none focus:border-[#087443]"
                >
                  <option value="">Choose Department...</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1">
                  2. Specialist Physician
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl text-[#263238] focus:outline-none focus:border-[#087443]"
                >
                  <option value="">Any Available Specialist</option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.title})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1">
                  3. Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl text-[#263238] focus:outline-none focus:border-[#087443]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1">
                  4. Consultation Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl text-[#263238] focus:outline-none focus:border-[#087443]"
                >
                  {availableTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-[#087443]/10 space-y-3">
              <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider">
                Patient Contact Information
              </h4>

              <div>
                <label className="block text-[11px] text-[#263238]/70 mb-1">Full Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#263238]/70 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#263238]/70 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#263238]/70 mb-1">Reason for Visit / Symptoms</label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly state your symptoms or required consultation purpose..."
                  className="w-full px-3.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#087443]/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#263238] hover:bg-[#F5FAF8] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#087443] hover:bg-[#065b34] rounded-xl shadow-md shadow-[#087443]/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Confirming Visit...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
