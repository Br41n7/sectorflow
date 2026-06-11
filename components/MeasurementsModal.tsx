
import React, { useState } from 'react';
import { X, Ruler, Plus, Save, Trash2, Info } from 'lucide-react';
import { Client, Measurement } from '../types';

interface MeasurementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onUpdate: (clientId: string, measurements: Measurement[]) => void;
}

const MeasurementsModal: React.FC<MeasurementsModalProps> = ({ isOpen, onClose, client, onUpdate }) => {
  if (!isOpen || !client) return null;

  const [measurements, setMeasurements] = useState<Measurement[]>(client.measurements || []);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newUnit, setNewUnit] = useState<'cm' | 'inch'>('inch');

  const handleAdd = () => {
    if (!newLabel || !newValue) return;
    const updated = [...measurements, { label: newLabel, value: newValue, unit: newUnit }];
    setMeasurements(updated);
    setNewLabel('');
    setNewValue('');
  };

  const handleRemove = (index: number) => {
    const updated = measurements.filter((_, i) => i !== index);
    setMeasurements(updated);
  };

  const handleSave = () => {
    onUpdate(client.id, measurements);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900">Anatomical Profile</h3>
            <p className="text-xs text-slate-500 font-medium">Bespoke Measurements for {client.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-200">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {measurements.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto text-indigo-600">
                <Ruler size={40} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">No Measurements Recorded</h4>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Start your bespoke process by recording the client's specific silhouette dimensions.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Dimensions</h4>
              <div className="grid grid-cols-1 gap-3">
                {measurements.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-indigo-200 hover:bg-white transition-all">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{m.label}</p>
                      <p className="text-xl font-display font-bold text-slate-900">{m.value} <span className="text-xs font-sans text-slate-500 font-normal uppercase">{m.unit}</span></p>
                    </div>
                    <button 
                      onClick={() => handleRemove(idx)}
                      className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Add Form */}
          <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Plus size={12} className="text-indigo-600" /> New Dimension
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <input 
                  type="text" 
                  placeholder="Label (e.g. Sleeve Length)" 
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </div>
              <input 
                type="text" 
                placeholder="Value" 
                className="px-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <select 
                className="px-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value as 'cm' | 'inch')}
              >
                <option value="inch">Inch</option>
                <option value="cm">CM</option>
              </select>
            </div>
            <button 
              onClick={handleAdd}
              disabled={!newLabel || !newValue}
              className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/10"
            >
              Add Dimension
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <Info size={18} className="text-amber-600 shrink-0" />
            <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
              These measurements are synchronized with the AI Style Advisor to provide personalized fabric drape and fit recommendations.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            Discard Changes
          </button>
          <button 
            onClick={handleSave}
            className="flex-[2] bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-indigo-950 transition-all font-bold text-sm shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsModal;
