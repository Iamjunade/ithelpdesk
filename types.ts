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

export interface Ticket {
  id: string;
  tenant_id: string;
  creator_id: string;
  assignee_id?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category?: string;
  sla_deadline?: string;
  created_at: string;
  updated_at: string;
  creator?: Profile;
  assignee?: Profile;
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
