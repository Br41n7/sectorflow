
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Scissors, 
  Sparkles,
  Menu,
  X,
  Bell,
  Search,
  Eye,
  Settings
} from 'lucide-react';
import { ViewType } from './types';
import Dashboard from './components/Dashboard';
import Bookings from './components/Bookings';
import Clients from './components/Clients';
import Orders from './components/Orders';
import AiAdvisor from './components/AiAdvisor';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' as ViewType },
    { name: 'Bookings', icon: Calendar, id: 'bookings' as ViewType },
    { name: 'Clients', icon: Users, id: 'clients' as ViewType },
    { name: 'Orders', icon: Scissors, id: 'orders' as ViewType },
    { name: 'AI Style Advisor', icon: Sparkles, id: 'ai-advisor' as ViewType },
  ];

  if (activeView === 'landing') {
    return <LandingPage onBackToAdmin={() => setActiveView('dashboard')} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard onNavigate={setActiveView} />;
      case 'bookings': return <Bookings />;
      case 'clients': return <Clients />;
      case 'orders': return <Orders />;
      case 'ai-advisor': return <AiAdvisor />;
      default: return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 selection:bg-indigo-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-8">
            <h1 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <Scissors size={18} />
              </div>
              SartorialFlow
            </h1>
          </div>

          <nav className="flex-1 px-4 space-y-1.5">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all
                  ${activeView === item.id 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}
                `}
              >
                <item.icon size={20} className={activeView === item.id ? 'text-white' : 'text-slate-400'} />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 space-y-3">
            <button 
              onClick={() => setActiveView('landing')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white hover:border-indigo-200 transition-all uppercase tracking-widest"
            >
              <Eye size={16} /> Client View
            </button>
            <div className="p-4 bg-slate-900 rounded-2xl text-white relative overflow-hidden group">
               <div className="relative z-10">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                 <p className="text-xs font-bold">Studio Online</p>
               </div>
               <Settings size={32} className="absolute -bottom-2 -right-2 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 w-80 group focus-within:border-indigo-500 focus-within:bg-white transition-all">
              <Search size={18} className="text-slate-400 group-focus-within:text-indigo-500" />
              <input 
                type="text" 
                placeholder="Search orders, clients..." 
                className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <p className="text-xs font-bold text-slate-900">Alessandro Sartori</p>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Master Studio</p>
            </div>
            <button className="relative p-2.5 bg-slate-50 border border-slate-200 text-slate-500 hover:text-indigo-600 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-slate-200"></div>
            <button className="h-10 w-10 rounded-xl overflow-hidden border-2 border-white shadow-md">
              <img src="https://picsum.photos/seed/tailor/100/100" alt="User" className="w-full h-full object-cover" />
            </button>
          </div>
        </header>

        {/* View Container */}
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
