
export enum OrderStatus {
  PENDING = 'Pending',
  MEASURED = 'Measured',
  IN_PROGRESS = 'In Progress',
  FITTING = 'Fitting',
  READY = 'Ready',
  DELIVERED = 'Delivered'
}

export interface Measurement {
  label: string;
  value: string;
  unit: 'cm' | 'inch';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  measurements: Measurement[];
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  garmentType: string;
  status: OrderStatus;
  dueDate: string;
  price: number;
}

export type CalendarProvider = 'google' | 'outlook' | 'apple' | 'internal';

export interface Appointment {
  id: string;
  clientId?: string;
  clientName: string;
  date: string;
  time: string;
  type: string;
  provider: CalendarProvider;
  isSynced: boolean;
}

export interface ConnectedAccount {
  provider: CalendarProvider;
  email: string;
  lastSync: string;
  isActive: boolean;
}

export type ViewType = 'dashboard' | 'bookings' | 'clients' | 'orders' | 'ai-advisor' | 'landing';
