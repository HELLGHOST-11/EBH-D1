import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Building2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('General Inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, department, subject, message })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-[#087443]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087443]/10 text-[#087443] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#21A366]" />
            Direct Hospital Contact & Helpline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238] tracking-tight">
            Get In Touch With EXIM Bank Hospital
          </h2>
          <p className="text-xs sm:text-sm text-[#263238]/75 max-w-2xl mx-auto leading-relaxed">
            Established as a Corporate Social Responsibility (CSR) initiative of EXIM Bank Foundation to provide reliable, affordable, and high-quality medical care to all.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Direct Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F5FAF8] p-6 rounded-3xl border border-[#087443]/10 space-y-6">
              <h3 className="text-lg font-bold text-[#263238] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#087443]" />
                Hospital Location & Helplines
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#263238]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#087443] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">EXIM Bank Hospital Premises</p>
                    <p className="text-[#263238]/80 font-medium text-emerald-800">666-A/1, West Kazipara (Beside Kazipara Metro Rail Station)</p>
                    <p className="text-[#263238]/70">Begum Rokeya Sarani, Mirpur-10, Dhaka-1216</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#21A366] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-[#263238]/60 font-medium">Direct Hotline & Emergency Numbers</p>
                    <p className="font-bold text-[#087443]">+880 1857-903231</p>
                    <p className="font-semibold text-[#263238]">01837-338475, 01963-886798</p>
                    <p className="text-[#263238]/70 text-xs">Telephone: 02-41002909</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#087443] shrink-0" />
                  <div>
                    <p className="text-[11px] text-[#263238]/60 font-medium">Hospital Official Email</p>
                    <p className="font-semibold text-[#263238]">eximbankhospital@yahoo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#087443]/10">
                  <Clock className="w-5 h-5 text-[#21A366] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Operating Hours</p>
                    <p className="text-emerald-700 font-semibold">24 Hours / 7 Days Open</p>
                    <p className="text-[#263238]/70 text-xs">Pathology, Imaging, Pharmacy, Emergency & Admissions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Campus Map View Mock */}
            <div className="bg-[#263238] rounded-3xl p-6 text-white space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#21A366]/20 rounded-full blur-2xl" />
              <p className="text-xs font-semibold text-[#21A366] uppercase tracking-wider">
                On-Site Banking & Transport
              </p>
              <h4 className="text-base font-bold">EXIM Bank ATM & Metro Station Access</h4>
              <p className="text-xs text-gray-300">
                On-site EXIM Bank ATM booth available for patients and visitors. Located right beside Kazipara Metro Rail Station for quick, smooth urban transport access.
              </p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-[#F5FAF8] p-8 rounded-3xl border border-[#087443]/10">
            <h3 className="text-xl font-bold text-[#263238] mb-1">Send a Message</h3>
            <p className="text-xs text-[#263238]/70 mb-6">
              Our medical reception desk will respond within 2 hours during operational hours.
            </p>

            {success ? (
              <div className="p-8 bg-white rounded-2xl border border-[#21A366]/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#21A366] mx-auto" />
                <h4 className="text-lg font-bold text-[#263238]">Message Sent Successfully</h4>
                <p className="text-xs text-[#263238]/70">
                  Thank you. Your inquiry has been routed to our concierge team.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#087443] bg-[#087443]/10 hover:bg-[#087443]/20 rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@example.com"
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] mb-1">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Executive Health">Executive Health</option>
                      <option value="Radiology">Radiology & MRI</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#263238] mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Second opinion request regarding MRI results"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#263238] mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our clinical team assist you today?"
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#087443] hover:bg-[#065b34] rounded-xl shadow-md shadow-[#087443]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#21A366]" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
