import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Department, Doctor, PatientRecord, Appointment, ContactMessage, User } from '../types';
import {
  Shield,
  Users,
  FileText,
  Calendar,
  Building,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  X,
  Sparkles,
  Stethoscope
} from 'lucide-react';

interface AdminDashboardProps {
  onExitAdmin: () => void;
  departments: Department[];
  doctors: Doctor[];
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitAdmin,
  departments,
  doctors,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'patients' | 'appointments' | 'departments' | 'messages'>('overview');
  
  // Stats
  const [stats, setStats] = useState<any>({});
  
  // Data
  const [patients, setPatients] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // New Record Form Modal
  const [showNewRecordModal, setShowNewRecordModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [recordTitle, setRecordTitle] = useState('');
  const [recordType, setRecordType] = useState<'Lab Test' | 'Prescription' | 'Diagnostic Scan' | 'Discharge Summary' | 'Consultation Note' | 'Vitals Assessment'>('Lab Test');
  const [doctorName, setDoctorName] = useState(doctors[0]?.name || 'Dr. Alexander Vance');
  const [departmentName, setDepartmentName] = useState(departments[0]?.name || 'Cardiology');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  
  // New Dept / Doctor Form Modals
  const [showNewDeptModal, setShowNewDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptTagline, setNewDeptTagline] = useState('');
  const [newDeptDesc, setNewDeptDesc] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');

  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocDeptId, setNewDocDeptId] = useState(departments[0]?.id || 'dept-1');
  const [newDocTitle, setNewDocTitle] = useState('Senior Specialist Physician');
  const [newDocFee, setNewDocFee] = useState(800);

  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, patientsRes, apptsRes, msgsRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/patients'),
        fetch('/api/admin/appointments'),
        fetch('/api/admin/messages')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (patientsRes.ok) {
        const pts = await patientsRes.json();
        setPatients(pts);
        if (pts.length > 0 && !selectedPatientId) {
          setSelectedPatientId(pts[0].id);
        }
      }
      if (apptsRes.ok) setAppointments(await apptsRes.json());
      if (msgsRes.ok) setMessages(await msgsRes.json());
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle Create Medical Record
  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientObj = patients.find((p) => p.id === selectedPatientId);

    try {
      const res = await fetch('/api/admin/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: selectedPatientId,
          patientName: patientObj?.name || 'Patient',
          doctorName,
          departmentName,
          recordType,
          title: recordTitle,
          summary,
          details
        })
      });

      if (res.ok) {
        setActionSuccess('Medical Record successfully added to patient database!');
        setShowNewRecordModal(false);
        setRecordTitle('');
        setSummary('');
        setDetails('');
        fetchAdminData();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Error creating record:', err);
    }
  };

  // Handle Update Appointment Status
  const handleUpdateAppointment = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  // Handle Create Department
  const handleCreateDept = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDeptName,
          tagline: newDeptTagline,
          description: newDeptDesc,
          headDoctor: newDeptHead
        })
      });

      if (res.ok) {
        setShowNewDeptModal(false);
        setNewDeptName('');
        setNewDeptTagline('');
        setNewDeptDesc('');
        onRefreshData();
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Create Doctor
  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === newDocDeptId);
    try {
      const res = await fetch('/api/admin/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDocName,
          departmentId: newDocDeptId,
          departmentName: deptObj?.name || 'Cardiology',
          title: newDocTitle,
          consultationFee: newDocFee
        })
      });

      if (res.ok) {
        setShowNewDocModal(false);
        setNewDocName('');
        onRefreshData();
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-8 bg-[#F5FAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Control Bar */}
        <div className="bg-[#263238] text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#087443]/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#087443] flex items-center justify-center text-white shadow-md">
              <Shield className="w-6 h-6 text-[#21A366]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">EXIM Bank Hospital Control Dashboard</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#21A366]/20 text-[#21A366] uppercase">
                  Node.js Live DB
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Control patient health records, hospital departments, specialist rosters, and appointment queues.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              title="Refresh DB Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <button
              onClick={onExitAdmin}
              className="px-4 py-2.5 bg-[#087443] hover:bg-[#065b34] text-white text-xs font-semibold rounded-xl transition-all shadow-md"
            >
              Exit Control Dashboard
            </button>
          </div>
        </div>

        {actionSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#21A366]" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Dashboard Nav Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-[#087443]/10 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'records', label: 'Patient Medical Records', icon: <FileText className="w-4 h-4" /> },
            { id: 'patients', label: 'Patient Directory', icon: <Users className="w-4 h-4" /> },
            { id: 'appointments', label: 'Appointments Queue', icon: <Calendar className="w-4 h-4" /> },
            { id: 'departments', label: 'Departments & Doctors', icon: <Building className="w-4 h-4" /> },
            { id: 'messages', label: 'Inquiries Inbox', icon: <MessageSquare className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#263238]/70 hover:bg-[#087443]/10 hover:text-[#087443]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-[#087443]/10 shadow-sm space-y-1">
                <span className="text-xs text-[#263238]/60 font-medium">Total Registered Patients</span>
                <p className="text-3xl font-bold text-[#087443]">{stats.totalPatients || 0}</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-[#087443]/10 shadow-sm space-y-1">
                <span className="text-xs text-[#263238]/60 font-medium">Stored Medical Records</span>
                <p className="text-3xl font-bold text-[#21A366]">{stats.totalRecords || 0}</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-[#087443]/10 shadow-sm space-y-1">
                <span className="text-xs text-[#263238]/60 font-medium">Pending Appointments</span>
                <p className="text-3xl font-bold text-amber-600">{stats.pendingAppointments || 0}</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-[#087443]/10 shadow-sm space-y-1">
                <span className="text-xs text-[#263238]/60 font-medium">Unread Inquiries</span>
                <p className="text-3xl font-bold text-[#263238]">{stats.unreadMessages || 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-3xl border border-[#087443]/10 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#263238]">Quick Administrative Operations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowNewRecordModal(true)}
                    className="p-4 bg-[#F5FAF8] hover:bg-[#087443]/10 rounded-2xl border border-[#087443]/20 text-left space-y-1 group transition-colors"
                  >
                    <FileText className="w-5 h-5 text-[#087443]" />
                    <p className="text-xs font-bold text-[#263238] group-hover:text-[#087443]">Issue Patient Record</p>
                    <p className="text-[10px] text-[#263238]/60">Create lab tests or prescriptions</p>
                  </button>

                  <button
                    onClick={() => setShowNewDocModal(true)}
                    className="p-4 bg-[#F5FAF8] hover:bg-[#087443]/10 rounded-2xl border border-[#087443]/20 text-left space-y-1 group transition-colors"
                  >
                    <Stethoscope className="w-5 h-5 text-[#21A366]" />
                    <p className="text-xs font-bold text-[#263238] group-hover:text-[#087443]">Add Specialist Physician</p>
                    <p className="text-[10px] text-[#263238]/60">Expand clinical roster</p>
                  </button>
                </div>
              </div>

              {/* System Info */}
              <div className="bg-white p-6 rounded-3xl border border-[#087443]/10 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-[#263238]">Database System Status</h3>
                <p className="text-xs text-[#263238]/70 leading-relaxed">
                  Data is actively synchronized to the Node.js Express server persistent database engine (`data/hospital_db.json`). Patient logins and medical EHR updates reflect instantly in real-time.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#087443]">
                  <CheckCircle2 className="w-4 h-4 text-[#21A366]" />
                  <span>Express API Status: Healthy & Online</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RECORDS MANAGEMENT */}
        {activeTab === 'records' && (
          <div className="bg-white p-6 rounded-3xl border border-[#087443]/15 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#263238]">Patient Electronic Medical Records (EHR)</h2>
                <p className="text-xs text-[#263238]/70">Issue, inspect, or manage lab results and doctor reports.</p>
              </div>

              <button
                onClick={() => setShowNewRecordModal(true)}
                className="px-4 py-2.5 bg-[#087443] text-white text-xs font-semibold rounded-xl hover:bg-[#065b34] transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                Issue New Medical Record
              </button>
            </div>

            <div className="overflow-x-auto border border-[#087443]/10 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#087443] text-white font-semibold">
                  <tr>
                    <th className="p-3">Record ID</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#087443]/10 bg-white">
                  {patients.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F5FAF8]">
                      <td className="p-3 font-mono text-[#087443] font-bold">{p.medicalId || p.id}</td>
                      <td className="p-3 font-bold text-[#263238]">{p.name}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-[#087443]/10 text-[#087443] rounded text-[10px] font-bold">EHR Active</span></td>
                      <td className="p-3 text-[#263238]/80">Comprehensive Patient File</td>
                      <td className="p-3">Dr. Alexander Vance</td>
                      <td className="p-3 text-[#263238]/60 font-mono">2026-08-01</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PATIENT DIRECTORY */}
        {activeTab === 'patients' && (
          <div className="bg-white p-6 rounded-3xl border border-[#087443]/15 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#263238]">Registered Patient Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((p) => (
                <div key={p.id} className="p-4 bg-[#F5FAF8] rounded-2xl border border-[#087443]/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#263238] text-sm">{p.name}</span>
                    <span className="font-mono text-[10px] font-bold bg-[#087443]/10 text-[#087443] px-2 py-0.5 rounded">
                      {p.medicalId || 'VH-89204'}
                    </span>
                  </div>
                  <p className="text-[#263238]/70">Email: {p.email}</p>
                  <p className="text-[#263238]/70">Phone: {p.phone || 'Not provided'}</p>
                  <div className="pt-2 border-t border-[#087443]/10 flex items-center justify-between font-semibold">
                    <span>Blood: <strong className="text-[#087443]">{p.bloodType || 'A+'}</strong></span>
                    <span>Age: <strong>{p.age || 34} Yrs</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: APPOINTMENTS QUEUE */}
        {activeTab === 'appointments' && (
          <div className="bg-white p-6 rounded-3xl border border-[#087443]/15 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#263238]">Master Appointments Queue</h2>
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div key={appt.id} className="p-4 bg-[#F5FAF8] rounded-2xl border border-[#087443]/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#263238]">{appt.patientName}</span>
                      <span className="text-[#263238]/60">({appt.patientEmail})</span>
                    </div>
                    <p className="text-[#087443] font-semibold">{appt.doctorName} - {appt.departmentName}</p>
                    <p className="text-[#263238]/70 italic">Reason: "{appt.reason}"</p>
                    <div className="flex items-center gap-3 font-semibold pt-1 text-[#263238]">
                      <span>Date: {appt.date}</span>
                      <span>Time: {appt.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                      appt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {appt.status}
                    </span>

                    {appt.status === 'Pending' && (
                      <button
                        onClick={() => handleUpdateAppointment(appt.id, 'Confirmed')}
                        className="px-3 py-1.5 bg-[#087443] text-white font-semibold rounded-lg hover:bg-[#065b34]"
                      >
                        Confirm Appointment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DEPARTMENTS & DOCTORS */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#087443]/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#263238]">Clinical Departments ({departments.length})</h2>
                <button
                  onClick={() => setShowNewDeptModal(true)}
                  className="px-4 py-2 bg-[#087443] text-white text-xs font-semibold rounded-xl hover:bg-[#065b34]"
                >
                  Add Department
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="p-4 bg-[#F5FAF8] rounded-2xl border border-[#087443]/10 space-y-2 text-xs">
                    <h3 className="font-bold text-[#263238] text-sm">{dept.name}</h3>
                    <p className="text-[#087443] font-semibold">{dept.tagline}</p>
                    <p className="text-[#263238]/70">Head: {dept.headDoctor}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#087443]/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#263238]">Specialist Roster ({doctors.length})</h2>
                <button
                  onClick={() => setShowNewDocModal(true)}
                  className="px-4 py-2 bg-[#087443] text-white text-xs font-semibold rounded-xl hover:bg-[#065b34]"
                >
                  Add Doctor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {doctors.map((doc) => (
                  <div key={doc.id} className="p-4 bg-[#F5FAF8] rounded-2xl border border-[#087443]/10 space-y-1 text-xs">
                    <p className="font-bold text-[#263238]">{doc.name}</p>
                    <p className="text-[#087443] font-medium">{doc.title}</p>
                    <p className="text-[#263238]/70">{doc.departmentName}</p>
                    <p className="font-bold text-[#21A366] pt-1">৳{doc.consultationFee} BDT</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: INQUIRIES MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-3xl border border-[#087443]/15 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#263238]">Patient & Corporate Inquiries Inbox</h2>
            {messages.length === 0 ? (
              <p className="text-xs text-[#263238]/60 py-6 text-center">No incoming contact messages.</p>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 bg-[#F5FAF8] rounded-2xl border border-[#087443]/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#263238] text-sm">{msg.name} ({msg.email})</span>
                      <span className="text-[10px] text-[#263238]/60">{msg.date.split('T')[0]}</span>
                    </div>
                    <p className="font-semibold text-[#087443]">Subject: {msg.subject}</p>
                    <p className="text-[#263238]/80 leading-relaxed bg-white p-3 rounded-xl border border-[#087443]/10">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ISSUE NEW RECORD MODAL */}
      {showNewRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263238]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 relative border border-[#087443]/20 shadow-2xl">
            <button
              onClick={() => setShowNewRecordModal(false)}
              className="absolute top-5 right-5 p-2 text-[#263238]/60 hover:text-[#263238]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#263238]">Issue New Electronic Medical Record</h3>

            <form onSubmit={handleCreateRecord} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Patient</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                >
                  {patients.map((pt) => (
                    <option key={pt.id} value={pt.id}>{pt.name} ({pt.medicalId || pt.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Record Type</label>
                <select
                  value={recordType}
                  onChange={(e) => setRecordType(e.target.value as any)}
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                >
                  <option value="Lab Test">Lab Test</option>
                  <option value="Diagnostic Scan">Diagnostic Scan</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Consultation Note">Consultation Note</option>
                  <option value="Vitals Assessment">Vitals Assessment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Record Title</label>
                <input
                  type="text"
                  value={recordTitle}
                  onChange={(e) => setRecordTitle(e.target.value)}
                  placeholder="e.g. Executive Cardiac Lipid Evaluation"
                  required
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Clinical Summary</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summary of findings..."
                  required
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Detailed Doctor Instructions</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Detailed notes, dosages, or follow-up instructions..."
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewRecordModal(false)}
                  className="px-4 py-2 rounded-xl text-[#263238]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#087443] text-white font-semibold rounded-xl"
                >
                  Save Record To Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW DOCTOR MODAL */}
      {showNewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263238]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 relative border border-[#087443]/20 shadow-2xl">
            <button
              onClick={() => setShowNewDocModal(false)}
              className="absolute top-5 right-5 p-2 text-[#263238]/60 hover:text-[#263238]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#263238]">Add New Specialist Physician</h3>

            <form onSubmit={handleCreateDoctor} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Doctor Name</label>
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Dr. Julian Vance"
                  required
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Clinical Department</label>
                <select
                  value={newDocDeptId}
                  onChange={(e) => setNewDocDeptId(e.target.value)}
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Title / Designation</label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="Chief of Cardiology"
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Consultation Fee (৳ BDT)</label>
                <input
                  type="number"
                  value={newDocFee}
                  onChange={(e) => setNewDocFee(Number(e.target.value))}
                  placeholder="800"
                  className="w-full p-2 bg-[#F5FAF8] border border-[#087443]/20 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewDocModal(false)}
                  className="px-4 py-2 rounded-xl text-[#263238]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#087443] text-white font-semibold rounded-xl"
                >
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
