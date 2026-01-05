export type RoleId = 'platform_admin' | 'company_admin' | 'it_manager' | 'support_agent' | 'employee';

export interface Tenant {
  id: string;
  name: string;
  subdomain?: string;
  custom_domain?: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  settings: Record<string, any>;
  created_at: string;
}

export interface Profile {
  id: string;
  tenant_id: string;
  role_id: RoleId;
  full_name: string;
  avatar_url?: string;
  tenant?: Tenant;
}

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'hardware' | 'software' | 'network' | 'security' | 'access' | 'other';

// Helper arrays for iterating over enums in UI
export const TICKET_STATUSES: TicketStatus[] = ['open', 'in_progress', 'resolved', 'closed'];
export const TICKET_PRIORITIES: TicketPriority[] = ['low', 'medium', 'high', 'urgent'];
export const TICKET_CATEGORIES: TicketCategory[] = ['hardware', 'software', 'network', 'security', 'access', 'other'];

export interface TicketAttachment {
  id: string;
  ticket_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  uploaded_at: string;
}

export interface Ticket {
  id: string;
  tenant_id: string;
  creator_id: string;
  assignee_id?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  sla_deadline?: string;
  sla_response_deadline?: string;
  first_response_at?: string;
  created_at: string;
  updated_at: string;
  creator?: Profile;
  assignee?: Profile;
  attachments?: TicketAttachment[];
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  author_id: string;
  content: string;
  is_internal: boolean;
  created_at: string;
  author?: Profile;
}

export interface KnowledgeBaseArticle {
  id: string;
  tenant_id: string;
  author_id: string;
  title: string;
  content: string;
  category?: string;
  is_published: boolean;
  created_at: string;
}

export interface SLA {
  id: string;
  tenant_id: string;
  name: string;
  priority: TicketPriority;
  response_time_hours: number;
  resolution_time_hours: number;
}
