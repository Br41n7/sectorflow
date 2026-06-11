
import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Scissors, 
  Sparkles, 
  RefreshCw, 
  Settings,
  ExternalLink,
  CheckCircle2,
  X
} from 'lucide-react';
import CalendarSyncModal from './CalendarSyncModal';
import { Appointment, CalendarProvider, ConnectedAccount } from '../types';

const Bookings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  
  // New Booking Form State
  const [newClientName, setNewClientName] = useState('');
  const [newType, setNewType] = useState('Initial Fitting');
  const [newDate, setNewDate] = useState('2024-11-15');
  const [newTime, setNewTime] = useState('11:00 AM');

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([
    { provider: 'google', email: 'alessandro.sartori@gmail.com', lastSync: '2 mins ago', isActive: true },
    { provider: 'outlook', email: '', lastSync: '-', isActive: false },
    { provider: 'apple', email: '', lastSync: '-', isActive: false },
  ]);

  const defaultAppointments: Appointment[] = [
    { id: '1', clientName: 'John Doe', type: 'Initial Fitting', time: '10:00 AM', date: '2024-11-15', provider: 'internal', isSynced: true },
    { id: '2', clientName: 'Google Calendar Event', type: 'Personal (External)', time: '12:30 PM', date: '2024-11-12', provider: 'google', isSynced: true },
    { id: '3', clientName: 'Jane Smith', type: 'Wedding Suit', time: '02:30 PM', date: '2024-11-10', provider: 'internal', isSynced: true },
    { id: '4', clientName: 'Outlook Meeting', type: 'Materials Sourcing', time: '04:00 PM', date: '2024-11-12', provider: 'outlook', isSynced: true },
  ];

  const [appointments, setAppointments] = useState<Appointment[]>(defaultAppointments);

  // Sync state with localStorage to include client fittings
  useEffect(() => {
    const existingStr = localStorage.getItem('sartorial_appointments');
    if (existingStr) {
      const localBookings = JSON.parse(existingStr);
      setAppointments(prev => {
        const filteredPrev = defaultAppointments.filter(p => !localBookings.some((l: any) => l.id === p.id));
        return [...filteredPrev, ...localBookings];
      });
    }
  }, [isNewBookingOpen]);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;

    const newAppt: Appointment = {
      id: `SART-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: newClientName,
      type: newType,
      date: newDate,
      time: newTime,
      provider: 'internal',
      isSynced: false
    };

    const existingStr = localStorage.getItem('sartorial_appointments');
    const existing = existingStr ? JSON.parse(existingStr) : [];
    existing.push(newAppt);
    localStorage.setItem('sartorial_appointments', JSON.stringify(existing));

    setIsNewBookingOpen(false);
    setNewClientName('');
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const toggleAccount = (provider: CalendarProvider) => {
    setConnectedAccounts(prev => prev.map(acc => 
      acc.provider === provider 
        ? { ...acc, isActive: !acc.isActive, email: !acc.isActive ? `alessandro@${provider}.com` : '', lastSync: !acc.isActive ? 'Just now' : '-' } 
        : acc
    ));
  };

  const getProviderIcon = (provider: CalendarProvider) => {
    switch (provider) {
      case 'google': return 'https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png';
      case 'outlook': return 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg';
      case 'apple': return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Apple_Calendar_icon.svg/1024px-Apple_Calendar_icon.svg.png';
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Studio Calendar</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-500">Manage your fittings and external schedules.</p>
            {connectedAccounts.some(a => a.isActive) && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                <CheckCircle2 size={10} /> Live Sync Active
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="p-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
            <span className="hidden md:inline">{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Settings size={18} />
            <span className="hidden md:inline">Calendar Settings</span>
          </button>
          <button 
            onClick={() => setIsNewBookingOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 font-bold text-sm"
          >
            <Plus size={18} />
            New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-slate-100">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <CalendarIcon className="text-indigo-600" />
              November 2024
            </h3>
            <div className="flex items-center gap-4">
               <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 border-b border-slate-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-50 last:border-0">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNum = i - 3;
              const isToday = dayNum === 15;
              const dayAppointments = appointments.filter(a => {
                 if (!a.date) return false;
                 const d = a.date.includes('-') 
                   ? parseInt(a.date.split('-')[2], 10) 
                   : new Date(a.date).getDate();
                 return d === dayNum && (a.date.includes('2024-11') || new Date(a.date).getMonth() === 10);
              });

              return (
                <div key={i} className={`min-h-[140px] p-2 border-r border-b border-slate-50 last:border-r-0 hover:bg-slate-50/50 transition-colors group relative ${dayNum < 1 || dayNum > 30 ? 'bg-slate-50/30 opacity-50' : ''}`}>
                  {dayNum > 0 && dayNum <= 30 && (
                    <>
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className={`inline-flex items-center justify-center w-7 h-7 text-xs font-bold rounded-lg ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}>
                          {dayNum}
                        </span>
                        {dayAppointments.length > 0 && (
                          <div className="flex -space-x-1">
                            {Array.from(new Set(dayAppointments.map(a => a.provider))).map(p => (
                              p !== 'internal' && (
                                <img key={p} src={getProviderIcon(p as CalendarProvider)!} className="w-4 h-4 rounded-full border border-white bg-white" alt={p} />
                              )
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.map(appt => (
                          <div 
                            key={appt.id} 
                            className={`px-2 py-1 text-[9px] rounded-lg font-bold truncate flex items-center gap-1 border shadow-sm ${
                              appt.provider === 'internal' 
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                                : 'bg-white text-slate-600 border-slate-100'
                            }`}
                          >
                            {appt.provider !== 'internal' && <ExternalLink size={8} className="shrink-0" />}
                            {appt.clientName}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-slate-800">Next Up</h4>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase">Today</span>
            </div>
            <div className="space-y-4">
              {appointments.filter(a => a.date === '2024-11-15').length === 0 && (
                 <div className="text-center py-8">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-300">
                     <CalendarIcon size={24} />
                   </div>
                   <p className="text-sm text-slate-400 font-medium">No appointments today</p>
                 </div>
              )}
              {appointments.slice(0, 3).map(event => (
                <div key={event.id} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.time}</span>
                    {event.provider !== 'internal' && (
                      <div className="flex items-center gap-1">
                         <img src={getProviderIcon(event.provider)!} className="w-3 h-3" alt={event.provider} />
                         <span className="text-[10px] font-bold text-slate-500 uppercase">Synced</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-4 rounded-2xl border transition-all ${
                    event.provider === 'internal' 
                      ? 'bg-slate-50 border-slate-100 group-hover:border-indigo-200 group-hover:bg-indigo-50/30' 
                      : 'bg-white border-dashed border-slate-200 group-hover:border-slate-300'
                  }`}>
                    <h5 className="font-bold text-slate-900 text-sm">{event.clientName}</h5>
                    <div className="mt-3 flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" /> 45 min
                      </div>
                      <div className="flex items-center gap-1">
                        <Scissors size={12} className="text-slate-400" /> {event.type}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-display text-xl font-bold mb-2">Booking Insights</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">External sync has identified 3 potential schedule conflicts with your Outlook personal calendar.</p>
              <button className="w-full text-sm font-bold bg-white text-slate-900 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                <RefreshCw size={16} /> Resolve Conflicts
              </button>
            </div>
            <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
             <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-3">Sync Status</h5>
             <div className="space-y-3">
               {connectedAccounts.filter(a => a.isActive).map(acc => (
                 <div key={acc.provider} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <img src={getProviderIcon(acc.provider)!} className="w-4 h-4" alt={acc.provider} />
                     <span className="text-xs font-medium text-indigo-800 capitalize">{acc.provider}</span>
                   </div>
                   <span className="text-[10px] font-bold text-indigo-400 uppercase">{acc.lastSync}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      <CalendarSyncModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        accounts={connectedAccounts}
        onToggleAccount={toggleAccount}
      />

      {isNewBookingOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-250"
            onClick={() => setIsNewBookingOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in zoom-in-95 duration-250 z-10">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold text-slate-900 font-display">Schedule New Fitting</h4>
                <p className="text-xs text-slate-500">Add an appointment to the atelier calendar.</p>
              </div>
              <button 
                onClick={() => setIsNewBookingOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-800 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Client Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="E.g., Charles Finch"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fitting Type</label>
                <select 
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all cursor-pointer"
                >
                  <option value="Initial Fitting">Initial Fitting & Silhouette</option>
                  <option value="Bespoke Fitting">Bespoke Fitting</option>
                  <option value="Anatomical Measurement">Anatomical Measurement</option>
                  <option value="Design Discovery">Design Discovery Session</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Date</label>
                  <input 
                    type="date" 
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-all cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Time</label>
                  <select 
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
