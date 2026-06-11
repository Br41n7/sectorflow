
import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Ruler, 
  Sparkles, 
  ChevronRight, 
  Star, 
  Globe, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  ArrowRight,
  CheckCircle2,
  X,
  Menu,
  Calendar as CalendarIcon,
  ChevronDown,
  Sparkle
} from 'lucide-react';

interface LandingPageProps {
  onBackToAdmin?: () => void;
}

interface FittingBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  type: string;
  date: string;
  time: string;
  notes?: string;
  provider: 'internal';
  isSynced: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onBackToAdmin }) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Booking Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formType, setFormType] = useState('Anatomical Measurement');
  const [selectedDate, setSelectedDate] = useState('2024-11-15'); // matching system calendar
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [formNotes, setFormNotes] = useState('');
  const [lastBookingId, setLastBookingId] = useState('');

  const collections = [
    {
      id: 'suit-01',
      name: 'The Midnight Tuxedo',
      description: 'Hand-canvassed Italian wool with silk satin lapels.',
      price: 'From $2,800',
      image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'suit-02',
      name: 'Sahara Linen Suite',
      description: 'Unstructured summer elegance in premium Irish linen.',
      price: 'From $1,500',
      image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'suit-03',
      name: 'Heritage Tweed Coat',
      description: 'Double-breasted classic in Harris Tweed.',
      price: 'From $3,200',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleOpenGeneralBooking = () => {
    setFormNotes('');
    setIsBookingOpen(true);
  };

  const handleBookStyle = (name: string) => {
    setFormNotes(`Interested in Collection design: ${name}`);
    setFormType('Bespoke Fitting');
    setIsBookingOpen(true);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) {
      alert('Please fill out all contact information.');
      return;
    }

    const bookingId = `SF-FIT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: FittingBooking = {
      id: bookingId,
      clientName: formName,
      clientEmail: formEmail,
      clientPhone: formPhone,
      type: formType,
      date: selectedDate,
      time: selectedTime,
      notes: formNotes,
      provider: 'internal',
      isSynced: false
    };

    // Save to localstorage so admin portal has access
    const existingStr = localStorage.getItem('sartorial_appointments');
    const existing: FittingBooking[] = existingStr ? JSON.parse(existingStr) : [];
    existing.push(newBooking);
    localStorage.setItem('sartorial_appointments', JSON.stringify(existing));

    setLastBookingId(bookingId);
    setIsBookingOpen(false);
    setIsBookingSuccess(true);
  };

  // Mock list of available slots for bespoke aesthetic representation
  const dateSlots = [
    { label: 'Nov 12, 2024', val: '2024-11-12', day: 'Tue' },
    { label: 'Nov 13, 2024', val: '2024-11-13', day: 'Wed' },
    { label: 'Nov 14, 2024', val: '2024-11-14', day: 'Thu' },
    { label: 'Nov 15, 2024', val: '2024-11-15', day: 'Fri (Today)' },
    { label: 'Nov 18, 2024', val: '2024-11-18', day: 'Mon' },
    { label: 'Nov 19, 2024', val: '2024-11-19', day: 'Tue' },
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:00 AM',
    '01:30 PM',
    '02:30 PM',
    '04:00 PM'
  ];

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a] font-sans selection:bg-[#c5a059]/20 selection:text-[#8a6d3b] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100 h-24 px-4 sm:px-6 lg:px-16 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-stone-900 flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white">
            <Scissors size={18} strokeWidth={1.5} className="sm:w-5 sm:h-5 w-4 h-4" />
          </div>
          SartorialFlow
        </h1>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12 text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em]">
          <a href="#about" className="hover:text-[#c5a059] transition-colors">The House</a>
          <a href="#services" className="hover:text-[#c5a059] transition-colors">Services</a>
          <a href="#collection" className="hover:text-[#c5a059] transition-colors">Bespoke Collection</a>
          <a href="#location" className="hover:text-[#c5a059] transition-colors">Ateliers</a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {onBackToAdmin && (
            <button 
              onClick={onBackToAdmin} 
              className="text-[10px] sm:text-xs font-bold text-stone-500 hover:text-stone-900 uppercase tracking-widest transition-colors"
            >
              Tailor Portal
            </button>
          )}
          <button 
            onClick={handleOpenGeneralBooking}
            className="hidden xs:block bg-[#1a1a1a] text-white px-5 sm:px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all shadow-xl shadow-stone-200"
          >
            Book Fitting
          </button>
          
          {/* Hamburger button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 hover:text-[#c5a059] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 pb-12 px-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6 pt-8 text-center">
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-display font-medium text-stone-800 hover:text-[#c5a059] transition-colors"
            >
              The House
            </a>
            <a 
              href="#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-display font-medium text-stone-800 hover:text-[#c5a059] transition-colors"
            >
              Services
            </a>
            <a 
              href="#collection" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-display font-medium text-stone-800 hover:text-[#c5a059] transition-colors"
            >
              Bespoke Collection
            </a>
            <a 
              href="#location" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-display font-medium text-stone-800 hover:text-[#c5a059] transition-colors"
            >
              Ateliers
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenGeneralBooking();
              }}
              className="w-full bg-[#1a1a1a] text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#c5a059] transition-all text-center"
            >
              Book Fitting
            </button>
            {onBackToAdmin && (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBackToAdmin();
                }}
                className="w-full bg-stone-100 text-stone-700 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-all text-center"
              >
                Access Master Tailor Portal
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="about" className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 lg:pb-32 px-4 sm:px-6 lg:px-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 text-stone-600 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em]">
              <Sparkles size={14} className="text-[#c5a059]" /> Savile Row Standard
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[110px] font-display font-bold leading-[1.05] tracking-tight text-stone-900">
              The Art of <br />
              <span className="text-[#c5a059] italic pr-4">Personal</span> <br />
              Elegance.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-stone-500 font-sans leading-relaxed max-w-xl font-light">
              Crafting distinct silhouettes for the world's most discerning individuals. Where heritage tailoring tradition meets dynamic sartorial workflow design.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-4">
              <button 
                onClick={handleOpenGeneralBooking}
                className="bg-[#1a1a1a] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all group flex items-center justify-center gap-3 shadow-2xl shadow-stone-300"
              >
                Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center justify-center gap-4 text-stone-400 py-2 sm:py-0">
                <div className="w-10 sm:w-12 h-px bg-stone-200"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Est. 1984</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="aspect-[4/5] sm:aspect-[3/4] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-[0_45px_100px_-25px_rgba(0,0,0,0.18)] animate-in fade-in zoom-in-95 duration-1000 delay-300">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2000ms]" 
                alt="The Master Tailor" 
              />
            </div>
            {/* Responsive floating review card */}
            <div className="relative sm:absolute mt-6 sm:mt-0 sm:-bottom-10 sm:-left-10 bg-white p-6 sm:p-10 rounded-3xl sm:rounded-[3rem] shadow-xl sm:shadow-2xl border border-stone-50 max-w-full sm:max-w-xs animate-in slide-in-from-bottom-12 duration-1000 delay-500">
              <div className="flex gap-1 text-[#c5a059] mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-stone-800 font-display text-base sm:text-lg leading-snug mb-3 italic">"An architectural masterpiece for the human body."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold text-[10px]">GQ</div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Style Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 sm:py-24 border-y border-stone-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
          {[
            { label: 'Hours of Craft', val: '60+' },
            { label: 'Master Stitchers', val: '12' },
            { label: 'Fabric Options', val: '5k+' },
            { label: 'Bespoke Patterns', val: '42' }
          ].map((m, i) => (
            <div key={i} className="group">
              <p className="text-3xl sm:text-4xl font-display font-bold text-stone-900 mb-1 group-hover:text-[#c5a059] transition-colors">{m.val}</p>
              <p className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-16 max-w-[1600px] mx-auto">
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <h3 className="text-[10px] sm:text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-3">The Discipline</h3>
            <h4 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 leading-tight">Meticulous Methods. <br />Exceptional Results.</h4>
          </div>
          <p className="text-stone-500 max-w-sm font-light leading-relaxed text-sm sm:text-base">
            Our multi-generational craft is focused on the pursuit of the perfect drape, combining centuries-old handwork with modern laser-guided cutting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16">
          {[
            { 
              icon: Ruler, 
              title: "Anatomical Measurement", 
              desc: "We capture 42 unique points of your physiology to create a blueprint that is yours alone." 
            },
            { 
              icon: Globe, 
              title: "Global Sourcing", 
              desc: "Exclusive access to the most prestigious mills in Biella, Huddersfield, and Kyoto." 
            },
            { 
              icon: Scissors, 
              title: "Hand-Canvassed Finish", 
              desc: "Unlike ready-to-wear, our suits breathe and mold to your body over time, lasting a lifetime." 
            }
          ].map((service, i) => (
            <div key={i} className="group space-y-6">
              <div className="w-16 h-16 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-center text-stone-900 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all duration-500 shadow-sm">
                <service.icon size={26} strokeWidth={1.5} />
              </div>
              <h5 className="text-xl sm:text-2xl font-display font-bold text-stone-900">{service.title}</h5>
              <p className="text-stone-500 text-sm font-light leading-relaxed">{service.desc}</p>
              <button 
                onClick={() => {
                  setFormType(service.title);
                  setFormNotes(`Interested in ${service.title} service.`);
                  setIsBookingOpen(true);
                }}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c5a059] group-hover:translate-x-2 transition-transform"
              >
                Schedule Fitting <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-20 sm:py-32 bg-[#1a1a1a] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h3 className="text-[10px] sm:text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-3">The Collection</h3>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">Bespoke Blueprints</h4>
            </div>
            <button 
              onClick={handleOpenGeneralBooking}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors flex items-center gap-2"
            >
              Request Custom Build <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {collections.map((item) => (
              <div key={item.id} className="group flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative bg-stone-800">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      alt={item.name} 
                    />
                    {/* Hover state for desktop & active state for mobile touch environments */}
                    <div className="absolute inset-0 bg-black/50 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                      <button 
                        onClick={() => handleBookStyle(item.name)}
                        className="bg-white text-stone-900 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#c5a059] hover:text-white transition-all transform md:translate-y-4 md:group-hover:translate-y-0 duration-300 shadow-xl"
                      >
                        Book This Design
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-xl sm:text-2xl font-display font-bold text-stone-100">{item.name}</h5>
                    <p className="text-[#c5a059] font-bold text-sm tracking-widest mt-1.5">{item.price}</p>
                  </div>
                  <p className="text-stone-400 text-sm font-light max-w-sm mb-6">{item.description}</p>
                </div>
                {/* On mobile trigger book fitting directly to avoid hover trap */}
                <div className="md:hidden">
                  <button 
                    onClick={() => handleBookStyle(item.name)}
                    className="w-full bg-stone-800 hover:bg-[#c5a059] border border-stone-700 hover:border-[#c5a059] text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-center mb-8"
                  >
                    Select Details & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ateliers / Location */}
      <section id="location" className="py-20 sm:py-32 bg-stone-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-[10px] sm:text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-3">The Atelier</h3>
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900">Visit Our Studio.</h4>
              </div>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4 sm:gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c5a059] shadow-sm shrink-0 border border-stone-100">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h6 className="text-base sm:text-lg font-bold text-stone-900 mb-1">London Flagship</h6>
                    <p className="text-stone-500 font-light text-sm sm:text-base">12 Savile Row, Mayfair <br />London W1S 3PQ, UK</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c5a059] shadow-sm shrink-0 border border-stone-100">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h6 className="text-base sm:text-lg font-bold text-stone-900 mb-1">Opening Hours</h6>
                    <p className="text-stone-500 font-light text-sm sm:text-base">Mon — Fri: 09:00 - 19:00 <br />Sat: 10:00 - 17:00 (By Appointment Only)</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c5a059] shadow-sm shrink-0 border border-stone-100">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h6 className="text-base sm:text-lg font-bold text-stone-900 mb-1">Contact Details</h6>
                    <p className="text-stone-500 font-light text-sm sm:text-base">+44 20 7123 4567 <br />atelier@sartorialflow.com</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleOpenGeneralBooking}
                className="bg-stone-900 text-white px-8 sm:px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-all flex items-center justify-center sm:justify-start gap-3 shadow-lg"
              >
                Arrange Atelier Visit <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="h-[300px] sm:h-[450px] lg:h-[600px] bg-stone-200 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-inner grayscale relative group">
              <img 
                src="https://images.unsplash.com/photo-1541819665-99c1598f86f7?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
                alt="The Atelier Interior" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 text-white">
                <p className="font-display text-xl sm:text-2xl font-bold">The Mayfair Cutting Room</p>
                <p className="text-stone-300 text-xs sm:text-sm font-light mt-1">Where the bespoke process unfolds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c0c0c] text-stone-500 py-20 sm:py-32 border-t border-stone-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            <div className="space-y-6 sm:space-y-10">
              <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white flex items-center gap-3">
                SartorialFlow
              </h1>
              <p className="text-xs sm:text-sm font-light leading-relaxed max-w-xs">
                A modern legacy in bespoke tailoring, redefining the intersection of heritage craftsmanship and technical innovation.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-stone-850 flex items-center justify-center text-white hover:bg-[#c5a059] hover:border-[#c5a059] transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-stone-850 flex items-center justify-center text-white hover:bg-[#c5a059] hover:border-[#c5a059] transition-all">
                  <Globe size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-stone-850 flex items-center justify-center text-white hover:bg-[#c5a059] hover:border-[#c5a059] transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h5 className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.3em]">The House</h5>
              <ul className="space-y-3 text-xs sm:text-sm font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Heritage</li>
                <li className="hover:text-white cursor-pointer transition-colors">Master Tailors</li>
                <li className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
                <li className="hover:text-white cursor-pointer transition-colors">Press & Media</li>
              </ul>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h5 className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.3em]">Services</h5>
              <ul className="space-y-3 text-xs sm:text-sm font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Bespoke Fitting</li>
                <li className="hover:text-white cursor-pointer transition-colors">Corporate Wardrobe</li>
                <li className="hover:text-white cursor-pointer transition-colors">Wedding Packages</li>
                <li className="hover:text-white cursor-pointer transition-colors">Alteration & Repair</li>
              </ul>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h5 className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.3em]">Newsletter</h5>
              <p className="text-xs sm:text-sm font-light leading-relaxed">Receive seasonal lookbooks and atelier updates.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-stone-900 border-none rounded-full px-6 py-4 text-xs sm:text-sm text-white focus:ring-1 focus:ring-[#c5a059] outline-none transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-[#c5a059] hover:text-white transition-all">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-32 pt-10 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-center">© 2026 SartorialFlow Heritage. All Rights Reserved.</p>
            <div className="flex gap-6 sm:gap-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* EXCLUSIVELY DESIGNED BESPOKE APPOINTMENT SCHEDULER DIALOG */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsBookingOpen(false)}
          ></div>
          
          <div className="relative bg-white w-full max-w-xl p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-2xl space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-50 hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition-all border border-stone-100"
              aria-label="Close scheduler"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2 mt-4 sm:mt-0">
              <div className="w-12 h-12 bg-stone-50 text-[#c5a059] rounded-2xl flex items-center justify-center mx-auto border border-stone-100">
                <CalendarIcon size={24} />
              </div>
              <h4 className="text-2xl sm:text-3xl font-display font-medium text-stone-950">Atelier Appointment</h4>
              <p className="text-stone-500 font-light text-sm">Select dates and preferences to schedule your custom fitting.</p>
            </div>

            <form onSubmit={submitBooking} className="space-y-5 sm:space-y-6">
              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">FullName</label>
                  <input 
                    type="text" 
                    required
                    placeholder="E.g., Charles Finch" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-stone-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Phone Connection</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="E.g., +44 7700 900077" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-stone-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="E.g., charles.finch@email.com" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-stone-300"
                />
              </div>

              {/* Service Type Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Arrangement Scope</label>
                  <div className="relative">
                    <select 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-xl px-4 py-3 text-sm outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Initial Fitting">Initial Fitting & Silhouette</option>
                      <option value="Bespoke Fitting">Bespoke Fitting</option>
                      <option value="Anatomical Measurement">Anatomical Measurement</option>
                      <option value="Design Discovery">Design Discovery Session</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Atelier Notes</label>
                  <input 
                    type="text" 
                    placeholder="E.g., Double breasted cut, silk lining preference" 
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-stone-300"
                  />
                </div>
              </div>

              {/* Calendar Date Choice */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Select Date Slot (November 2024)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {dateSlots.map((d) => (
                    <button
                      key={d.val}
                      type="button"
                      onClick={() => setSelectedDate(d.val)}
                      className={`py-2 px-1 text-center border rounded-xl transition-all flex flex-col items-center justify-center ${
                        selectedDate === d.val 
                          ? 'bg-stone-950 border-[#c5a059] text-white shadow-md' 
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="text-[9px] uppercase font-bold text-stone-400 group-hover:text-stone-200">{d.day}</span>
                      <span className="text-xs font-bold leading-tight">{d.label.split(',')[0].split(' ')[1]}</span>
                      <span className="text-[8px] font-medium leading-tight opacity-80">{d.label.split(',')[0].split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ateliers Time Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Select Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-1 text-center border rounded-xl text-xs font-semibold transition-all ${
                        selectedTime === t 
                          ? 'bg-[#c5a059] border-[#c5a059] text-white' 
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-4.5 bg-stone-950 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all shadow-xl shadow-stone-200 flex items-center justify-center gap-2"
                >
                  Confirm Fitting Request <Sparkle size={14} className="text-[#c5a059]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION STATE POPUP */}
      {isBookingSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsBookingSuccess(false)}
          ></div>
          
          <div className="relative bg-white w-full max-w-md p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#c5a059] rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-[#c5a059]/30">
              <CheckCircle2 size={36} className="sm:w-10 sm:h-10 w-8 h-8" />
            </div>
            
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.3em] font-mono">{lastBookingId}</span>
              <h4 className="text-3xl sm:text-4xl font-display font-bold text-stone-950 leading-tight">Request Received.</h4>
              
              <div className="bg-stone-50 p-5 rounded-2xl text-left border border-stone-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400 font-medium">Guest:</span>
                  <span className="text-stone-900 font-semibold">{formName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400 font-medium">Service:</span>
                  <span className="text-stone-900 font-semibold">{formType}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400 font-medium">Preferred Slot:</span>
                  <span className="text-[#c5a059] font-bold">{selectedDate} @ {selectedTime}</span>
                </div>
              </div>

              <p className="text-stone-500 font-light text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                Our bespoke concierge will contact you within 2 hours to finalize details for your VIP fitting in our Mayfair atelier.
              </p>
            </div>
            
            <button 
              onClick={() => setIsBookingSuccess(false)}
              className="w-full py-4.5 bg-stone-950 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-all shadow-md"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
