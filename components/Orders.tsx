
import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronRight,
  Clock,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { OrderStatus, Order } from '../types';
import NewOrderModal from './NewOrderModal';

const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    clientId: '1',
    clientName: 'Alexander Hamilton',
    garmentType: 'Bespoke Tuxedo',
    status: OrderStatus.FITTING,
    dueDate: '2024-11-20',
    price: 3200
  },
  {
    id: 'ORD-2024-002',
    clientId: '2',
    clientName: 'Eliza Schuyler',
    garmentType: 'Evening Gown',
    status: OrderStatus.IN_PROGRESS,
    dueDate: '2024-11-25',
    price: 1850
  },
  {
    id: 'ORD-2024-003',
    clientId: '3',
    clientName: 'Aaron Burr',
    garmentType: 'Linen Suit',
    status: OrderStatus.READY,
    dueDate: '2024-11-15',
    price: 1200
  }
];

const statusStyles: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-slate-100 text-slate-700',
  [OrderStatus.MEASURED]: 'bg-blue-50 text-blue-700',
  [OrderStatus.IN_PROGRESS]: 'bg-amber-50 text-amber-700',
  [OrderStatus.FITTING]: 'bg-indigo-50 text-indigo-700',
  [OrderStatus.READY]: 'bg-emerald-50 text-emerald-700',
  [OrderStatus.DELIVERED]: 'bg-slate-50 text-slate-400',
};

const Orders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleCreateOrder = (formData: any) => {
    const newOrder: Order = {
      id: `ORD-2024-${(orders.length + 1).toString().padStart(3, '0')}`,
      clientId: Math.random().toString(),
      clientName: formData.clientName,
      garmentType: formData.garmentType,
      status: OrderStatus.PENDING,
      dueDate: formData.dueDate,
      price: parseFloat(formData.price) || 0
    };
    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold text-slate-900 tracking-tight">Workroom Orders</h2>
          <p className="text-slate-500 mt-2 font-medium">Tracking {orders.length} bespoke garments currently in production.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-widest">
            <Filter size={16} />
            Filters
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-950 transition-all shadow-xl shadow-slate-200 font-bold text-xs uppercase tracking-widest"
          >
            <Plus size={18} />
            New Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'In Production', val: '18', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Awaiting Fitting', val: '5', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Ready for Pickup', val: '3', icon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Revenue (MTD)', val: '$42.4k', icon: Calendar, color: 'text-slate-900', bg: 'bg-slate-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            <h4 className="text-3xl font-bold mt-2 text-slate-900">{stat.val}</h4>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
           <div className="relative max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by client or item..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm transition-all"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Client & Garment</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Timeline</th>
                <th className="px-8 py-5">Investment</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                  <td className="px-8 py-6 font-mono text-xs font-bold text-slate-400">
                    {order.id}
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 text-sm">{order.clientName}</div>
                    <div className="text-xs font-medium text-slate-400 mt-0.5">{order.garmentType}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Clock size={14} className="text-slate-300" />
                      {new Date(order.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-900">${order.price.toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Paid Full</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateOrder}
      />
    </div>
  );
};

export default Orders;
