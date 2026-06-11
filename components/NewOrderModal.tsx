
import React, { useState } from 'react';
import { X, User, Scissors, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { OrderStatus } from '../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: any) => void;
}

const NewOrderModal: React.FC<NewOrderModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    clientName: '',
    garmentType: 'Suit',
    status: OrderStatus.PENDING,
    dueDate: '',
    price: '',
    notes: ''
  });

  const garmentTypes = ['Suit', 'Shirt', 'Tuxedo', 'Overcoat', 'Trousers', 'Waistcoat'];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900">Create New Order</h3>
            <p className="text-xs text-slate-500 font-medium">Bespoke Production Workflow</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-200">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form className="flex-1 overflow-y-auto p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User size={12} /> Client Selection
            </label>
            <input 
              type="text" 
              placeholder="Search or enter client name..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm transition-all"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Scissors size={12} /> Garment Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {garmentTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, garmentType: type})}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    formData.garmentType === type 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> Due Date
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm transition-all"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <DollarSign size={12} /> Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm transition-all"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              Special Instructions
            </label>
            <textarea 
              rows={3}
              placeholder="e.g. Peak lapels, functional buttonholes, silk lining..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm transition-all resize-none"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="bg-indigo-50 p-4 rounded-2xl flex items-start gap-3 border border-indigo-100">
            <CheckCircle2 className="text-indigo-600 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-xs font-bold text-indigo-900">Automatic Sync</p>
              <p className="text-[10px] text-indigo-700/80 leading-relaxed mt-1">
                Creating this order will automatically schedule an initial measurement fitting in your calendar.
              </p>
            </div>
          </div>
        </form>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            Cancel
          </button>
          <button 
            type="submit"
            onClick={() => onSubmit(formData)}
            className="flex-[2] bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-indigo-950 transition-all font-bold text-sm shadow-xl shadow-slate-200"
          >
            Confirm & Initialize Craft
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderModal;
