
import React, { useState } from 'react';
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Ruler, History } from 'lucide-react';
import { Client, Measurement } from '../types';
import MeasurementsModal from './MeasurementsModal';

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Robert Fox',
    email: 'robert@example.com',
    phone: '(555) 123-4567',
    lastVisit: 'Oct 24, 2024',
    measurements: [{ label: 'Chest', value: '42', unit: 'inch' }, { label: 'Sleeve', value: '25.5', unit: 'inch' }]
  },
  {
    id: '2',
    name: 'Jane Cooper',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    lastVisit: 'Nov 02, 2024',
    measurements: []
  },
  {
    id: '3',
    name: 'Wade Warren',
    email: 'wade@example.com',
    phone: '(555) 444-5555',
    lastVisit: 'Nov 12, 2024',
    measurements: []
  }
];

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMeasModalOpen, setIsMeasModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleOpenMeasurements = (client: Client) => {
    setSelectedClient(client);
    setIsMeasModalOpen(true);
  };

  const handleUpdateMeasurements = (clientId: string, measurements: Measurement[]) => {
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, measurements } : c
    ));
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Client Directory</h2>
          <p className="text-slate-500">Manage your bespoke clients and their anatomical profiles.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-indigo-950 transition-all shadow-xl shadow-slate-200 font-bold text-xs uppercase tracking-widest">
          <UserPlus size={18} />
          Add New Client
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-widest bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none">
              <option>All Clients</option>
              <option>Regulars</option>
              <option>VIP Portfolio</option>
              <option>New this month</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Client Profile</th>
                <th className="px-8 py-5">Contact Hub</th>
                <th className="px-8 py-5">Activity Tracking</th>
                <th className="px-8 py-5">Workshop Assets</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-display font-bold text-lg shadow-sm">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm tracking-tight">{client.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: SART-{client.id}042</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Mail size={14} className="text-slate-300" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Phone size={14} className="text-slate-300" />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-xs font-bold text-slate-800">{client.lastVisit}</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">Last Item: Bespoke Three-piece</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenMeasurements(client)}
                        className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-600 hover:text-white transition-all group/btn shadow-sm"
                      >
                        <Ruler size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <History size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Log</span>
                      </button>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div>Displaying {filteredClients.length} of {clients.length} Master Clients</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50">Prev</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50">2</button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      <MeasurementsModal 
        isOpen={isMeasModalOpen}
        onClose={() => setIsMeasModalOpen(false)}
        client={selectedClient}
        onUpdate={handleUpdateMeasurements}
      />
    </div>
  );
};

export default Clients;
