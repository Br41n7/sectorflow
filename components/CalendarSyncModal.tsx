
import React from 'react';
import { X, Check, Globe, Shield, RefreshCw } from 'lucide-react';
import { CalendarProvider, ConnectedAccount } from '../types';

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: ConnectedAccount[];
  onToggleAccount: (provider: CalendarProvider) => void;
}

const CalendarSyncModal: React.FC<CalendarSyncModalProps> = ({ isOpen, onClose, accounts, onToggleAccount }) => {
  if (!isOpen) return null;

  const providers = [
    { 
      id: 'google' as CalendarProvider, 
      name: 'Google Calendar', 
      icon: 'https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png',
      description: 'Sync with Google Workspace and Gmail'
    },
    { 
      id: 'outlook' as CalendarProvider, 
      name: 'Outlook / Office 365', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg',
      description: 'Professional sync for Microsoft users'
    },
    { 
      id: 'apple' as CalendarProvider, 
      name: 'Apple iCal', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Apple_Calendar_icon.svg/1024px-Apple_Calendar_icon.svg.png',
      description: 'Native sync with iCloud and iPhone'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Calendar Integrations</h3>
            <p className="text-sm text-slate-500">Automate your scheduling across platforms.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-indigo-50 p-4 rounded-2xl flex gap-3">
            <Shield className="text-indigo-600 shrink-0" size={20} />
            <p className="text-xs text-indigo-900 leading-relaxed">
              We use 256-bit encryption to secure your calendar data. SartorialFlow only accesses events marked as "Busy" or "Tailoring" by default.
            </p>
          </div>

          <div className="space-y-3">
            {providers.map((p) => {
              const connected = accounts.find(a => a.provider === p.id && a.isActive);
              return (
                <div key={p.id} className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all">
                  <img src={p.icon} alt={p.name} className="w-10 h-10 object-contain" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                    <p className="text-xs text-slate-500">{connected ? `Connected: ${connected.email}` : p.description}</p>
                  </div>
                  <button 
                    onClick={() => onToggleAccount(p.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      connected 
                        ? 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                    }`}
                  >
                    {connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1">
              <RefreshCw size={12} className="animate-spin-slow" />
              Two-way sync active
            </div>
            <div className="flex items-center gap-1">
              <Globe size={12} />
              Region: Global/US
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarSyncModal;
