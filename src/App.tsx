import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Stethoscope } from 'lucide-react';
import { User, Department, Doctor } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { DepartmentsSection } from './components/DepartmentsSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { AppointmentModal } from './components/AppointmentModal';
import { AuthModal } from './components/AuthModal';
import { PatientPortal } from './components/PatientPortal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Modals
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [showQuickBookFloating, setShowQuickBookFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowQuickBookFloating(true);
      } else {
        setShowQuickBookFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Booking initial selections
  const [selectedDeptIdForBooking, setSelectedDeptIdForBooking] = useState<string>('');
  const [selectedDocIdForBooking, setSelectedDocIdForBooking] = useState<string>('');

  const fetchPublicData = async () => {
    setDataLoading(true);
    try {
      const [deptRes, docRes] = await Promise.all([
        fetch('/api/departments'),
        fetch('/api/doctors')
      ]);

      if (deptRes.ok) setDepartments(await deptRes.json());
      if (docRes.ok) setDoctors(await docRes.json());
    } catch (err) {
      console.error('Failed to fetch public hospital data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicData();
    // Check local session
    const savedUser = localStorage.getItem('exim_hospital_user') || localStorage.getItem('voodoo_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        setCurrentUser(u);
      } catch (e) {
        // invalid
      }
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('exim_hospital_user', JSON.stringify(user));
    if (user.role === 'admin') {
      setIsAdminView(true);
    } else {
      setActiveTab('portal');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('exim_hospital_user');
    localStorage.removeItem('voodoo_user');
    setIsAdminView(false);
    setActiveTab('home');
  };

  const handleOpenBookingWithSelection = (deptId: string = '', docId: string = '') => {
    setSelectedDeptIdForBooking(deptId);
    setSelectedDocIdForBooking(docId);
    setBookingModalOpen(true);
  };

  const handleToggleAdmin = () => {
    if (currentUser?.role === 'admin') {
      setIsAdminView(!isAdminView);
    } else {
      // Prompt auth modal with quick admin fill
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5FAF8] text-[#263238] font-sans">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setIsAdminView(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenBooking={() => handleOpenBookingWithSelection()}
        onToggleAdmin={handleToggleAdmin}
        isAdminView={isAdminView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdminView ? (
          <AdminDashboard
            onExitAdmin={() => setIsAdminView(false)}
            departments={departments}
            doctors={doctors}
            onRefreshData={fetchPublicData}
          />
        ) : activeTab === 'portal' && currentUser ? (
          <PatientPortal
            currentUser={currentUser}
            onOpenBooking={() => handleOpenBookingWithSelection()}
            onLogout={handleLogout}
          />
        ) : (
          <>
            {/* Home or Hero view */}
            {activeTab === 'home' && (
              <Hero
                departments={departments}
                doctors={doctors}
                onOpenBookingWithSelection={handleOpenBookingWithSelection}
                onOpenAuth={() => setAuthModalOpen(true)}
                setActiveTab={setActiveTab}
              />
            )}

            {/* Dedicated About Us Page View */}
            {(activeTab === 'home' || activeTab === 'about') && (
              <AboutSection
                onOpenAuth={() => setAuthModalOpen(true)}
                onOpenBookingWithSelection={handleOpenBookingWithSelection}
              />
            )}

            {(activeTab === 'home' || activeTab === 'departments') && (
              <DepartmentsSection
                departments={departments}
                onOpenBookingWithSelection={handleOpenBookingWithSelection}
              />
            )}

            {(activeTab === 'home' || activeTab === 'doctors') && (
              <DoctorsSection
                doctors={doctors}
                departments={departments}
                onOpenBookingWithSelection={handleOpenBookingWithSelection}
              />
            )}

            {(activeTab === 'home' || activeTab === 'contact') && (
              <ContactSection />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      {!isAdminView && (
        <Footer
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenBooking={() => handleOpenBookingWithSelection()}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
      )}

      {/* Booking Appointment Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        departments={departments}
        doctors={doctors}
        initialDeptId={selectedDeptIdForBooking}
        initialDocId={selectedDocIdForBooking}
        currentUser={currentUser}
        onAppointmentCreated={fetchPublicData}
      />

      {/* Patient Auth / Login / Register Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Quick Book Button - Shown only when scrolled past Hero form to avoid UI collision */}
      <AnimatePresence>
        {!isAdminView && showQuickBookFloating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpenBookingWithSelection()}
              className="bg-white/95 backdrop-blur-md hover:bg-[#087443] text-[#087443] hover:text-white px-3.5 py-2.5 rounded-full flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider shadow-2xl shadow-[#087443]/20 border border-[#087443]/30 hover:border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#21A366] focus:ring-offset-2 focus:ring-offset-white group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#087443] text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#087443] shadow-xs group-hover:rotate-12 transition-all duration-300">
                <Stethoscope className="w-4 h-4 text-white group-hover:text-[#087443] transition-colors" />
              </div>
              <span className="pr-1.5 text-xs font-black tracking-wide">Quick Booking</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
