// Temporary stub file - Ticket operations will be migrated to Firebase/Firestore
// This file is created to prevent build errors during the migration process

import { Ticket, TicketComment } from '../types';

export const getTickets = async (tenantId: string): Promise<Ticket[]> => {
  console.warn('Ticket system not yet migrated to Firebase');
  return [];
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  console.warn('Ticket system not yet migrated to Firebase');
  return null;
};

export const createTicket = async (ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>): Promise<Ticket> => {
  throw new Error('Ticket system not yet migrated to Firebase');
};

export const updateTicket = async (id: string, updates: Partial<Ticket>): Promise<void> => {
  throw new Error('Ticket system not yet migrated to Firebase');
};

export const deleteTicket = async (id: string): Promise<void> => {
  throw new Error('Ticket system not yet migrated to Firebase');
};

export const addComment = async (ticketId: string, comment: Omit<TicketComment, 'id' | 'created_at'>): Promise<TicketComment> => {
  throw new Error('Ticket system not yet migrated to Firebase');
};

export const getSLAs = async (tenantId: string): Promise<any[]> => {
  console.warn('SLA system not yet migrated to Firebase');
  return [];
};
