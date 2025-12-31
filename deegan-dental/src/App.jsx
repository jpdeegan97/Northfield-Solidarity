import React from 'react';
import { Sparkles, Calendar, Phone, Clock, MapPin, ChevronRight, CheckCircle2, Star } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-dental-200 selection:text-dental-900">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-dental-500 rounded-lg flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <span className="text-xl font-serif font-bold text-slate-800 tracking-tight">Deegan Dental</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-dental-600 transition-colors">Services</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-dental-600 transition-colors">About Us</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-dental-600 transition-colors">Stories</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-dental-600 transition-colors">Contact</a>
            </div>

            <button className="hidden md:flex bg-dental-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-dental-700 transition-all transform hover:scale-105 shadow-lg shadow-dental-500/30">
              Book Visit
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-dental-50 -z-10 rounded-l-full opacity-60 blur-3xl transform translate-x-32" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dental-100 text-dental-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Star size={12} className="fill-current" />
                Voted #1 in Northfield
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-8">
                Design your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-dental-500 to-dental-700">perfect smile.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                Experience world-class dental care in a calm, modern environment. Dr. Deegan and his team combine advanced technology with a gentle touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-dental-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-dental-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-dental-500/20">
                  <Calendar size={20} />
                  Schedule Consultation
                </button>
                <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Phone size={20} />
                  (555) 123-4567
                </button>
              </div>
              <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`} />
                  ))}
                </div>
                <p>Trusted by 2,000+ patients</p>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-dental-900/10">
                {/* Placeholder for dental image */}
                <div className="aspect-[4/3] bg-slate-200 relative">
                  <img
                    src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=2000"
                    alt="Modern Dental Office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-full h-full bg-dental-100 rounded-3xl -z-10" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-dental-200 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Comprehensive Care</h2>
            <p className="text-slate-600">From routine checkups to complex cosmetic makeovers, we provide a full spectrum of dental services tailored to your needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'General Dentistry', desc: 'Preventative care, cleanings, and exams to keep your smile healthy for life.', icon: CheckCircle2 },
              { title: 'Cosmetic', desc: 'Veneers, whitening, and bonding to give you the confidence you deserve.', icon: Sparkles },
              { title: 'Restorative', desc: 'Implants, crowns, and bridges to restore function and aesthetics.', icon: Clock },
            ].map((service, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-dental-100 hover:shadow-xl hover:shadow-dental-100/50 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-dental-600 mb-6 group-hover:bg-dental-500 group-hover:text-white transition-colors">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <a href="#" className="inline-flex items-center text-sm font-semibold text-dental-600 hover:text-dental-700">
                  Learn more <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info / Location (Footer) */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-dental-500 rounded flex items-center justify-center text-white">
                  <Sparkles size={14} />
                </div>
                <span className="text-lg font-serif font-bold tracking-tight">Deegan Dental</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Elevating the standard of dental care in Northfield and beyond.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6">Office</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-dental-500 shrink-0" />
                  <span>123 Solidarity Ave,<br />Northfield, MN 55057</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-dental-500 shrink-0" />
                  <span>(555) 123-4567</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Hours</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex justify-between"><span>Mon - Thu</span> <span>8am - 5pm</span></li>
                <li className="flex justify-between"><span>Friday</span> <span>8am - 1pm</span></li>
                <li className="flex justify-between"><span>Sat - Sun</span> <span>Closed</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pay Bill Online</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} Deegan Dental. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
