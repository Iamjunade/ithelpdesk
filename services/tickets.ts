import { supabase } from './supabase';
import { Ticket, TicketStatus, TicketPriority } from '../types';

export const ticketService = {
  async getTickets() {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        creator:profiles!tickets_creator_id_fkey(*),
        assignee:profiles!tickets_assignee_id_fkey(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Ticket[];
  },

  async createTicket(ticket: Partial<Ticket>) {
    // 1. Fetch tenant SLAs
    const { data: slas } = await supabase
      .from('slas')
      .select('*')
      .eq('tenant_id', ticket.tenant_id);

    // 2. Calculate deadline if SLA exists for this priority
    let sla_deadline = null;
    const prioritySla = slas?.find(s => s.priority === ticket.priority);
    if (prioritySla) {
      const deadline = new Date();
      deadline.setHours(deadline.getHours() + prioritySla.resolution_time_hours);
      sla_deadline = deadline.toISOString();
    }

    const { data, error } = await supabase
      .from('tickets')
      .insert([{ ...ticket, sla_deadline }])
      .select()
      .single();

    if (error) throw error;
    return data as Ticket;
  },

  async getSlas(tenantId: string) {
    const { data, error } = await supabase
      .from('slas')
      .select('*')
      .eq('tenant_id', tenantId);
    if (error) throw error;
    return data as SLA[];
  },

  async updateSla(id: string, updates: Partial<SLA>) {
    const { data, error } = await supabase
      .from('slas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async createSla(sla: Partial<SLA>) {
    const { data, error } = await supabase
      .from('slas')
      .insert([sla])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Knowledge Base
  async getKbArticles() {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*, author:profiles(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as KnowledgeBaseArticle[];
  },

  async createKbArticle(article: Partial<KnowledgeBaseArticle>) {
    const { data, error } = await supabase
      .from('knowledge_base')
      .insert([article])
      .select()
      .single();
    if (error) throw error;
    return data as KnowledgeBaseArticle;
  },

  async updateKbArticle(id: string, updates: Partial<KnowledgeBaseArticle>) {
    const { data, error } = await supabase
      .from('knowledge_base')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as KnowledgeBaseArticle;
  },

  async updateTicket(id: string, updates: Partial<Ticket>) {
    const { data, error } = await supabase
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Ticket;
  },

  async getTicketComments(ticketId: string) {
    const { data, error } = await supabase
      .from('ticket_comments')
      .select(`
        *,
        author:profiles(*)
      `)
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  async addComment(ticketId: string, authorId: string, content: string, isInternal: boolean = false) {
    const { data, error } = await supabase
      .from('ticket_comments')
      .insert([{ ticket_id: ticketId, author_id: authorId, content, is_internal: isInternal }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
