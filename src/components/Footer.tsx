import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Award, Stethoscope } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking, onOpenAuth }) => {
  return (
    <footer className="bg-[#263238] text-white pt-12 pb-10 border-t border-[#087443]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Logo className="brightness-125" />
            <p className="text-xs text-gray-300 leading-relaxed pt-1">
              A Corporate Social Responsibility (CSR) initiative of EXIM Bank Foundation (Est. May 8, 2010). Dedicated to serving with care and rational manner.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-[#21A366]">
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#21A366]" />
                <span>24/7 Open</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                <Award className="w-3.5 h-3.5 text-[#21A366]" />
                <span>On-Site EXIM ATM</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#21A366] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('departments')} className="hover:text-white transition-colors">
                  Departments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('doctors')} className="hover:text-white transition-colors">
                  Doctors
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Patient Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#21A366] mb-4">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={onOpenAuth} className="hover:text-white transition-colors">
                  Patient Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                  <Stethoscope className="w-3.5 h-3.5 text-[#21A366]" />
                  <span>Book Doctor Appointment</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('departments')} className="hover:text-white transition-colors">
                  24 Hours Pharmacy & Emergency
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('departments')} className="hover:text-white transition-colors">
                  24/7 Blood Bank
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Emergency */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#21A366] mb-4">
              Hospital Contact
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                <span>666-A/1, West Kazipara (Beside Kazipara Metro Station), Rokeya Sarani, Mirpur-10, Dhaka-1216</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">01857-903231, 01837-338475</p>
                  <p className="text-gray-400">Tel: 02-41002909, 01963-886798</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#21A366] shrink-0" />
                <span>eximbankhospital@yahoo.com</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-400 font-semibold">Open 24 Hours / 7 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} EXIM Bank Hospital. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Patient Rights</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
