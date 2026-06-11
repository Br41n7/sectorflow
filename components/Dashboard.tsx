
import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  // Fix: Added Sparkles to the imported icons
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { ViewType } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewType) => void;
}

const statsData = [
  { label: 'Active Orders', value: '24', icon: ShoppingBag, change: '+12%', positive: true },
  { label: 'New Clients', value: '156', icon: Users, change: '+5%', positive: true },
  { label: 'Monthly Revenue', value: '$12,450', icon: TrendingUp, change: '-2%', positive: false },
  { label: 'Avg. Turnaround', value: '14 days', icon: Clock, change: '-1 day', positive: true },
];

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 4500 },
  { name: 'Fri', revenue: 6000 },
  { name: 'Sat', revenue: 7500 },
  { name: 'Sun', revenue: 2000 },
];

const DEFAULT_APPOINTMENTS = [
  { id: '1', name: 'John Doe', type: 'Initial Fitting', time: '10:00 AM', date: 'Today' },
  { id: '2', name: 'Sarah Miller', type: 'Final Adjustments', time: '11:30 AM', date: 'Today' },
  { id: '3', name: 'Michael Ross', type: 'New Order', time: '02:00 PM', date: 'Today' },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [appointments, setAppointments] = React.useState<any[]>(DEFAULT_APPOINTMENTS);

  React.useEffect(() => {
    const existingStr = localStorage.getItem('sartorial_appointments');
    if (existingStr) {
      const localBookings = JSON.parse(existingStr);
      const mappedLocal = localBookings.map((b: any) => ({
        id: b.id,
        name: b.clientName,
        type: b.type,
        time: b.time || '11:00 AM',
        date: b.date || 'Today'
      }));
      setAppointments(prev => {
        const filteredPrev = DEFAULT_APPOINTMENTS.filter(p => !mappedLocal.some((l: any) => l.id === p.id));
        return [...filteredPrev, ...mappedLocal];
      });
    }
  }, []);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Bienvenido, Alessandro</h2>
          <p className="text-slate-500">Here is what's happening with your studio today.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('bookings')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Manage Schedule
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold mb-6">Weekly Revenue Growth</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-lg font-bold mb-4">Orders by Category</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Suits', val: 12 },
                    { name: 'Shirts', val: 18 },
                    { name: 'Pants', val: 8 },
                    { name: 'Coats', val: 5 },
                  ]}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="val" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center text-center">
              <div className="mx-auto w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <Sparkles size={32} />
              </div>
              <h4 className="text-lg font-bold">Try AI Style Advisor</h4>
              <p className="text-sm text-slate-500 mt-2 mb-4">Let our AI help you recommend perfect fabrics and styles to your clients.</p>
              <button 
                onClick={() => onNavigate('ai-advisor')}
                className="w-full py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Launch Advisor
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Schedule */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold">Today's Appointments</h4>
              <button className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">View All</button>
            </div>
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex flex-col items-center justify-center min-w-[60px] p-2 bg-slate-50 rounded-lg text-slate-600">
                    <span className="text-xs font-bold">{appt.time.split(' ')[1]}</span>
                    <span className="text-lg font-bold leading-tight">{appt.time.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-slate-900">{appt.name}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{appt.type}</p>
                    <div className="mt-2 flex gap-2">
                      <button className="text-[10px] px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full font-bold">MEASURE</button>
                      <button className="text-[10px] px-2 py-1 bg-slate-100 text-slate-700 rounded-full font-bold">DETAILS</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Activity</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                  <div>
                    <p className="text-xs text-slate-900"><strong>Suit #452</strong> marked as Delivered</p>
                    <span className="text-[10px] text-slate-400">2 hours ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5"></div>
                  <div>
                    <p className="text-xs text-slate-900">New Client <strong>Emma Wilson</strong> added</p>
                    <span className="text-[10px] text-slate-400">4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
