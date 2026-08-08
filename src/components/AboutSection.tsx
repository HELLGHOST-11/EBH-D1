import React from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  ShieldCheck,
  Heart,
  Sparkles,
  CheckCircle2,
  Award,
  Stethoscope,
  Users,
  Target,
  Compass,
  FileCheck2,
  MapPin,
  Phone,
  Quote
} from 'lucide-react';

interface AboutSectionProps {
  onOpenAuth: () => void;
  onOpenBookingWithSelection: (deptId?: string, docId?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenAuth,
  onOpenBookingWithSelection
}) => {
  const coreValues = [
    {
      icon: <Target className="w-6 h-6 text-[#087443]" />,
      title: 'Institutional Commitment',
      description: 'Driven by social welfare rather than commercial profit. We prioritize patient wellbeing and family affordability over revenue targets.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#21A366]" />,
      title: 'Ethical Medical Practice',
      description: 'Zero unnecessary diagnostic mandates or hidden charges. Clear, transparent billing and honest clinical advice from senior board doctors.'
    },
    {
      icon: <Heart className="w-6 h-6 text-[#087443]" />,
      title: 'Compassionate Patient Care',
      description: 'Dignified, respectful, and empathetic attention for every patient, backed by modern clean facilities and attentive nursing care.'
    },
    {
      icon: <Compass className="w-6 h-6 text-[#21A366]" />,
      title: 'Diagnostic Excellence',
      description: 'Modern 3D CT, silent MRI, 4D Ultrasonography, and Japan-imported diagnostic equipment guaranteeing high-precision clinical accuracy.'
    }
  ];

  const impactStats = [
    { value: '10+', label: 'Years Serving Community', subtext: 'Established in Kazipara, Mirpur' },
    { value: '150k+', label: 'Patients Treated', subtext: 'Diagnostic & clinical care' },
    { value: '50+', label: 'Senior Specialists', subtext: 'Across all medical disciplines' },
    { value: '100%', label: 'Non-Profit Ethos', subtext: 'EXIM Bank Foundation initiative' }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F5FAF8] border-t border-[#087443]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087443]/10 text-[#087443] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#21A366]" />
            About EXIM Bank Hospital
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238] tracking-tight">
            Our Mission & Foundation
          </h2>
          <p className="text-base sm:text-lg text-[#087443] font-extrabold tracking-wide">
            "দায়বদ্ধতায় প্রাতিষ্ঠানিক, মুনাফাতে নয়"
          </p>
          <p className="text-xs sm:text-sm text-[#263238]/75 max-w-2xl mx-auto leading-relaxed">
            EXIM Bank Hospital was established under the philanthropic vision of the EXIM Bank Foundation to provide world-class, ethical, and affordable healthcare to the community in Mirpur and across Dhaka.
          </p>
        </div>

        {/* Impact Numbers Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {impactStats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="bg-white p-6 rounded-2xl border border-[#087443]/10 shadow-xs space-y-1 text-center"
            >
              <p className="text-3xl sm:text-4xl font-black text-[#087443]">{stat.value}</p>
              <p className="text-xs sm:text-sm font-bold text-[#263238]">{stat.label}</p>
              <p className="text-[11px] text-[#263238]/60">{stat.subtext}</p>
            </motion.div>
          ))}
        </div>

        {/* Origin Story & Vision Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#087443]/10 shadow-sm">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#21A366] bg-[#21A366]/10 px-3 py-1 rounded-full">
                Healthcare with Integrity
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#263238] leading-tight">
                Combining Human Compassion with Advanced Medical Tech
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#263238]/80 leading-relaxed">
              Founded as a corporate social responsibility project by EXIM Bank Bangladesh, our hospital addresses the critical need for transparent, non-commercialized medical care. We ensure that every patient receives accurate diagnostics, experienced doctor consultations, and continuous care without financial exploitation.
            </p>

            <div className="space-y-3 pt-1">
              {[
                'Full transparency in treatment plans, diagnostic costs, and hospital fees',
                'Senior medical specialists and female-led ultrasonography care',
                'Round-the-clock emergency, trauma care, ambulance, and blood bank',
                'Digital patient health record portal for easy lab access'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#263238] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#21A366] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBookingWithSelection()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#087443] hover:bg-[#065b34] rounded-xl transition-all shadow-md shadow-[#087443]/20 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-[#21A366]" />
                <span>Book Doctor Appointment</span>
              </button>
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#087443] bg-[#087443]/10 hover:bg-[#087443]/20 rounded-xl transition-all cursor-pointer"
              >
                Patient Portal Access
              </button>
            </div>
          </div>

          {/* Leadership Statement Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#263238] to-[#1a2327] text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden border border-white/10">
              <Quote className="w-12 h-12 text-[#21A366]/30 absolute top-6 right-6" />
              
              <div className="space-y-2 relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#21A366]">
                  Institutional Pledge
                </span>
                <h4 className="text-xl font-bold">A Message from Hospital Leadership</h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed relative z-10">
                "Our fundamental objective is to eliminate the anxiety associated with medical emergencies and diagnostic costs. Every decision at EXIM Bank Hospital is guided by moral responsibility, ensuring our community has access to honorable, high-standard healthcare."
              </p>

              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white text-sm">EXIM Bank Hospital Board</p>
                  <p className="text-slate-400 text-[11px]">Kazipara, Mirpur, Dhaka</p>
                </div>
                <Award className="w-8 h-8 text-[#21A366]" />
              </div>
            </div>

            <div className="p-5 bg-[#F5FAF8] rounded-2xl border border-[#087443]/15 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#087443] shrink-0 mt-0.5" />
              <div className="text-xs text-[#263238]/80 space-y-0.5">
                <p className="font-bold text-[#263238]">Hospital Location</p>
                <p>666-A/1, West Kazipara, Rokeya Soroni, Mirpur, Dhaka-216</p>
                <p className="text-[#087443] font-medium pt-1">Hotline: 01857-903231, 01963-886798</p>
              </div>
            </div>
          </div>

        </div>

        {/* Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087443]/10 text-[#087443] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#21A366]" />
              Core Institutional Pillars
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight">Our Guiding Healthcare Values</h3>
            <p className="text-xs sm:text-sm text-[#263238]/75 max-w-2xl mx-auto leading-relaxed">The principles that guide our everyday clinical, diagnostic, and administrative standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 bg-white rounded-2xl border border-[#087443]/10 shadow-xs space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#087443]/10 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-[#263238]">{pillar.title}</h4>
                <p className="text-xs text-[#263238]/70 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


