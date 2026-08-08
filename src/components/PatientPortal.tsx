import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, PatientRecord, Appointment } from '../types';
import {
  FileText,
  Activity,
  Calendar,
  Stethoscope,
  Pill,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  Printer,
  ShieldCheck,
  UserCheck,
  HeartPulse,
  Award,
  AlertTriangle,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface PatientPortalProps {
  currentUser: User;
  onOpenBooking: () => void;
  onLogout: () => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  currentUser,
  onOpenBooking,
  onLogout
}) => {
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPatientData = async () => {
    setLoading(true);
    try {
      const [recordsRes, apptsRes] = await Promise.all([
        fetch(`/api/patient/records/${currentUser.id}`),
        fetch(`/api/patient/appointments/${currentUser.id}`)
      ]);

      if (recordsRes.ok) {
        const data = await recordsRes.json();
        setRecords(data);
      }
      if (apptsRes.ok) {
        const data = await apptsRes.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error('Failed to load patient records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [currentUser.id]);

  const recordTypes = ['All', 'Lab Test', 'Diagnostic Scan', 'Prescription', 'Vitals Assessment'];

  const filteredRecords = records.filter((rec) => {
    const matchesFilter = activeFilter === 'All' || rec.recordType === activeFilter;
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.departmentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePrintRecord = (rec: PatientRecord) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>EXIM Bank Hospital Medical Record - ${rec.id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #263238; }
            .header { border-bottom: 2px solid #087443; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; }
            .title { font-size: 24px; color: #087443; font-weight: bold; }
            .section { margin-bottom: 25px; padding: 15px; background: #F5FAF8; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-size: 13px; }
            th { background-color: #087443; color: white; }
            .badge { padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; }
            .footer { margin-top: 50px; font-size: 11px; text-align: center; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">EXIM BANK HOSPITAL</div>
              <p>Electronic Health Record (EHR) Official Document</p>
            </div>
            <div style="text-align: right;">
              <p><strong>Medical ID:</strong> ${currentUser.medicalId || 'VH-89204'}</p>
              <p><strong>Date:</strong> ${rec.date}</p>
            </div>
          </div>

          <h2>${rec.title}</h2>
          <p><strong>Patient Name:</strong> ${currentUser.name} | <strong>Age:</strong> ${currentUser.age || 34} | <strong>Blood Type:</strong> ${currentUser.bloodType || 'A+'}</p>
          <p><strong>Attending Doctor:</strong> ${rec.doctorName} (${rec.departmentName})</p>

          <div class="section">
            <h3>Clinical Summary</h3>
            <p>${rec.summary}</p>
            <p>${rec.details}</p>
          </div>

          ${rec.vitals ? `
            <div class="section">
              <h3>Recorded Vitals</h3>
              <p>BP: ${rec.vitals.bloodPressure || 'N/A'} | Heart Rate: ${rec.vitals.heartRate || 'N/A'} bpm | Glucose: ${rec.vitals.glucose || 'N/A'} mg/dL</p>
            </div>
          ` : ''}

          ${rec.labResults && rec.labResults.length > 0 ? `
            <h3>Laboratory Analysis Values</h3>
            <table>
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th>Observed Value</th>
                  <th>Reference Range</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${rec.labResults.map(item => `
                  <tr>
                    <td>${item.testName}</td>
                    <td><strong>${item.value} ${item.unit}</strong></td>
                    <td>${item.referenceRange}</td>
                    <td>${item.flag || 'Normal'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}

          ${rec.prescriptions && rec.prescriptions.length > 0 ? `
            <h3 style="margin-top: 25px;">Prescribed Medications</h3>
            <table>
              <thead>
                <tr>
                  <th>Medication Name</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                ${rec.prescriptions.map(p => `
                  <tr>
                    <td><strong>${p.medicine}</strong></td>
                    <td>${p.dosage}</td>
                    <td>${p.frequency}</td>
                    <td>${p.instructions}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}

          <div class="footer">
            <p>Confidential Medical Record. Certified by EXIM Bank Hospital Digital Signature. JCI Accredited.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <section className="py-10 bg-[#F5FAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Patient Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#087443]/15 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#087443]/10 pb-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#087443] to-[#21A366] text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-[#087443]/20">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-[#263238]">{currentUser.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#21A366]/10 text-[#087443] border border-[#21A366]/30">
                    Verified Patient
                  </span>
                </div>
                <p className="text-xs text-[#263238]/70 mt-1">
                  Medical ID: <span className="font-mono font-bold text-[#087443]">{currentUser.medicalId || 'VH-89204'}</span> | Email: {currentUser.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchPatientData}
                className="p-2.5 text-[#263238]/70 hover:text-[#087443] bg-[#F5FAF8] rounded-xl border border-[#087443]/10"
                title="Refresh Records"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 bg-[#087443] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#065b34] transition-all shadow-md shadow-[#087443]/20 flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-[#21A366]" />
                <span>Book Doctor Appointment</span>
              </button>
            </div>

          </div>

          {/* Key Vitals & Insurance Banner */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-[#F5FAF8] p-4 rounded-2xl border border-[#087443]/10 text-xs">
            <div>
              <span className="text-[#263238]/60 block font-medium">Blood Group:</span>
              <span className="text-base font-bold text-[#087443]">{currentUser.bloodType || 'A+'}</span>
            </div>
            <div>
              <span className="text-[#263238]/60 block font-medium">Age / Gender:</span>
              <span className="text-sm font-semibold text-[#263238]">{currentUser.age || 34} Yrs / {currentUser.gender || 'Female'}</span>
            </div>
            <div>
              <span className="text-[#263238]/60 block font-medium">Insurance Plan:</span>
              <span className="text-xs font-bold text-[#21A366] line-clamp-1">{currentUser.insuranceProvider || 'Blue Cross Executive'}</span>
            </div>
            <div>
              <span className="text-[#263238]/60 block font-medium">Policy Number:</span>
              <span className="font-mono font-medium text-[#263238]">{currentUser.insurancePolicyNo || 'BCBS-9923841'}</span>
            </div>
            <div>
              <span className="text-[#263238]/60 block font-medium">Emergency Contact:</span>
              <span className="text-xs font-medium text-[#263238] line-clamp-1">{currentUser.emergencyContact || 'Spouse: +1 (555) 234-9988'}</span>
            </div>
          </div>
        </div>

        {/* Section Tabs & Records View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Records List Column */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#087443]/15 shadow-sm space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#087443]" />
                  <h2 className="text-lg font-bold text-[#263238]">Electronic Health Records (EHR)</h2>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#087443] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search lab tests, doctors, scans..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                  />
                </div>
              </div>

              {/* Record Type Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {recordTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                      activeFilter === type
                        ? 'bg-[#087443] text-white shadow-sm'
                        : 'bg-[#F5FAF8] text-[#263238]/70 hover:bg-[#087443]/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Records List */}
              {loading ? (
                <div className="py-12 text-center text-xs text-[#263238]/60 space-y-2">
                  <div className="w-6 h-6 border-2 border-[#087443] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p>Fetching encrypted hospital records...</p>
                </div>
              ) : filteredRecords.length === 0 ? (
                <div className="py-12 text-center bg-[#F5FAF8] rounded-2xl border border-[#087443]/10 space-y-2">
                  <FileText className="w-10 h-10 text-[#087443]/40 mx-auto" />
                  <p className="text-sm font-semibold text-[#263238]">No Medical Records Found</p>
                  <p className="text-xs text-[#263238]/60">There are no records matching your current search or filter.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRecords.map((rec) => (
                    <motion.div
                      key={rec.id}
                      whileHover={{ x: 2 }}
                      onClick={() => setSelectedRecord(rec)}
                      className="p-4 bg-[#F5FAF8] hover:bg-white rounded-2xl border border-[#087443]/10 hover:border-[#087443]/30 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#087443]/10 text-[#087443]">
                            {rec.recordType}
                          </span>
                          <span className="text-[11px] text-[#263238]/60 font-mono">{rec.date}</span>
                        </div>
                        <h3 className="text-sm font-bold text-[#263238] group-hover:text-[#087443] transition-colors">
                          {rec.title}
                        </h3>
                        <p className="text-xs text-[#263238]/70 line-clamp-1">
                          Attending: <span className="font-medium text-[#263238]">{rec.doctorName}</span> ({rec.departmentName})
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrintRecord(rec);
                          }}
                          className="p-2 bg-white hover:bg-[#087443]/10 text-[#087443] rounded-xl border border-[#087443]/20"
                          title="Print Official Report PDF"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-[#263238]/40 group-hover:text-[#087443] transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Right Sidebar - Upcoming Visits */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#087443]/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#087443]/10 pb-3">
                <h3 className="text-base font-bold text-[#263238] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#087443]" />
                  Scheduled Appointments
                </h3>
                <span className="text-xs font-semibold text-[#087443] bg-[#087443]/10 px-2 py-0.5 rounded-full">
                  {appointments.length} Visits
                </span>
              </div>

              {appointments.length === 0 ? (
                <div className="py-8 text-center bg-[#F5FAF8] rounded-2xl p-4 text-xs text-[#263238]/70 space-y-2">
                  <p>No upcoming scheduled appointments.</p>
                  <button
                    onClick={onOpenBooking}
                    className="text-xs font-bold text-[#087443] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-[#21A366]" />
                    <span>Book Doctor Appointment</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-4 bg-[#F5FAF8] rounded-2xl border border-[#087443]/10 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#087443]">{appt.doctorName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#21A366]/10 text-[#087443]">
                          {appt.status}
                        </span>
                      </div>
                      <p className="text-[#263238]/70 font-medium">{appt.departmentName}</p>
                      <div className="flex items-center gap-3 text-[#263238] font-semibold pt-1 border-t border-[#087443]/10">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#21A366]" />
                          {appt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#21A366]" />
                          {appt.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Hotline Card */}
            <div className="bg-[#087443] text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full text-[10px] font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#21A366]" />
                Direct Concierge Line
              </div>
              <h4 className="text-base font-bold">24/7 Medical Hotline</h4>
              <p className="text-xs opacity-90 leading-relaxed">
                Need urgent prescription adjustments or doctor advice? Reach our level 1 concierge care team instantly.
              </p>
              <p className="text-lg font-bold text-emerald-300 font-mono pt-1">
                +1 (800) 555-EXIM
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Record Inspection Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263238]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#087443]/20 shadow-2xl p-6 sm:p-8 relative space-y-6"
            >
              <button
                onClick={() => setSelectedRecord(null)}
                className="absolute top-6 right-6 p-2 text-[#263238]/60 hover:text-[#263238] bg-[#F5FAF8] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-[#087443]/10 pb-4">
                <div className="p-3 bg-[#087443]/10 rounded-2xl text-[#087443]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#087443] bg-[#087443]/10 px-2 py-0.5 rounded">
                    {selectedRecord.recordType}
                  </span>
                  <h3 className="text-xl font-bold text-[#263238] mt-1">{selectedRecord.title}</h3>
                  <p className="text-xs text-[#263238]/70">
                    Date: {selectedRecord.date} | Doctor: {selectedRecord.doctorName}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4 text-xs sm:text-sm text-[#263238]/80">
                <div className="bg-[#F5FAF8] p-4 rounded-2xl border border-[#087443]/10 space-y-1">
                  <p className="font-bold text-[#263238]">Physician Summary:</p>
                  <p className="leading-relaxed">{selectedRecord.summary}</p>
                  {selectedRecord.details && (
                    <p className="text-xs text-[#263238]/70 pt-2 border-t border-[#087443]/10 mt-2">{selectedRecord.details}</p>
                  )}
                </div>

                {/* Vitals breakdown */}
                {selectedRecord.vitals && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider">Recorded Vitals</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs">
                      {selectedRecord.vitals.bloodPressure && (
                        <div className="p-2.5 bg-white border border-[#087443]/10 rounded-xl">
                          <span className="text-[#263238]/60 block text-[10px]">Blood Pressure</span>
                          <span className="font-bold text-[#087443]">{selectedRecord.vitals.bloodPressure}</span>
                        </div>
                      )}
                      {selectedRecord.vitals.heartRate && (
                        <div className="p-2.5 bg-white border border-[#087443]/10 rounded-xl">
                          <span className="text-[#263238]/60 block text-[10px]">Heart Rate</span>
                          <span className="font-bold text-[#21A366]">{selectedRecord.vitals.heartRate} bpm</span>
                        </div>
                      )}
                      {selectedRecord.vitals.glucose && (
                        <div className="p-2.5 bg-white border border-[#087443]/10 rounded-xl">
                          <span className="text-[#263238]/60 block text-[10px]">Blood Glucose</span>
                          <span className="font-bold text-[#263238]">{selectedRecord.vitals.glucose} mg/dL</span>
                        </div>
                      )}
                      {selectedRecord.vitals.oxygenLevel && (
                        <div className="p-2.5 bg-white border border-[#087443]/10 rounded-xl">
                          <span className="text-[#263238]/60 block text-[10px]">Oxygen Level</span>
                          <span className="font-bold text-[#087443]">{selectedRecord.vitals.oxygenLevel}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Lab Results Table */}
                {selectedRecord.labResults && selectedRecord.labResults.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider">Lab Results Parameters</h4>
                    <div className="border border-[#087443]/10 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#087443] text-white font-semibold">
                          <tr>
                            <th className="p-2.5">Test Parameter</th>
                            <th className="p-2.5">Value</th>
                            <th className="p-2.5">Reference Range</th>
                            <th className="p-2.5">Flag</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#087443]/10 bg-white">
                          {selectedRecord.labResults.map((item, idx) => (
                            <tr key={idx}>
                              <td className="p-2.5 font-medium">{item.testName}</td>
                              <td className="p-2.5 font-bold text-[#087443]">{item.value} {item.unit}</td>
                              <td className="p-2.5 text-[#263238]/70">{item.referenceRange}</td>
                              <td className="p-2.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  item.flag === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {item.flag || 'Normal'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Prescriptions */}
                {selectedRecord.prescriptions && selectedRecord.prescriptions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider">Prescribed Medication</h4>
                    <div className="space-y-2">
                      {selectedRecord.prescriptions.map((p, idx) => (
                        <div key={idx} className="p-3 bg-[#F5FAF8] rounded-xl border border-[#087443]/10 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#087443]">{p.medicine}</span>
                            <span className="text-[11px] font-medium text-[#21A366]">{p.dosage}</span>
                          </div>
                          <p className="text-xs text-[#263238]/70">Frequency: {p.frequency} ({p.duration})</p>
                          <p className="text-[11px] text-[#263238]/80 italic">Instructions: {p.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#087443]/10 flex items-center justify-between">
                <button
                  onClick={() => handlePrintRecord(selectedRecord)}
                  className="px-4 py-2 text-xs font-semibold text-[#087443] bg-[#087443]/10 hover:bg-[#087443]/20 rounded-xl flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print PDF Record</span>
                </button>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#087443] hover:bg-[#065b34] rounded-xl"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
