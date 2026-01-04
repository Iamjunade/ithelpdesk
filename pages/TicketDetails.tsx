import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ticketService } from '../services/tickets';
import { useAuth } from '../services/auth';
import { Ticket, TicketComment, TicketStatus, TicketPriority, Profile } from '../types';
import { supabase } from '../services/supabase';
import { 
  ArrowLeft, 
  Send, 
  User, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Lock,
  Tag,
  AlertTriangle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { clsx } from 'clsx';
import { aiService } from '../services/ai';

export const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile, tenant } = useAuth();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [sending, setSending] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [agents, setAgents] = useState<Profile[]>([]);

  // ... (rest of the component)

  const handleAiSuggest = async () => {
    if (!ticket) return;
    setIsSuggesting(true);
    try {
      const articles = await ticketService.getKbArticles();
      const suggestion = await aiService.suggestReply(ticket.description, articles);
      setCommentText(suggestion);
    } catch (error) {
      console.error('AI suggestion failed:', error);
    } finally {
      setIsSuggesting(false);
    }
  };

  const commentsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      loadTicketData();
      loadAgents();
    }
  }, [id]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const loadTicketData = async () => {
    if (!id) return;
    try {
      const { data: ticketData } = await supabase
        .from('tickets')
        .select('*, creator:profiles!tickets_creator_id_fkey(*), assignee:profiles!tickets_assignee_id_fkey(*)')
        .eq('id', id)
        .single();
      
      setTicket(ticketData as Ticket);
      
      const commentData = await ticketService.getTicketComments(id);
      setComments(commentData as TicketComment[]);
    } catch (error) {
      console.error('Error loading ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAgents = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .in('role_id', ['support_agent', 'it_manager', 'company_admin']);
      setAgents(data as Profile[]);
    } catch (error) {
      console.error('Error loading agents:', error);
    }
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!id) return;
    try {
      await ticketService.updateTicket(id, { status: newStatus });
      setTicket(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAssigneeChange = async (assigneeId: string) => {
    if (!id) return;
    try {
      await ticketService.updateTicket(id, { assignee_id: assigneeId });
      loadTicketData();
    } catch (error) {
      console.error('Error updating assignee:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !profile || !commentText.trim()) return;

    setSending(true);
    try {
      await ticketService.addComment(id, profile.id, commentText, isInternal);
      setCommentText('');
      setIsInternal(false);
      const updatedComments = await ticketService.getTicketComments(id);
      setComments(updatedComments as TicketComment[]);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  if (!ticket) return <div className="p-12 text-center">Ticket not found</div>;

  const canManage = profile && ['company_admin', 'it_manager', 'support_agent'].includes(profile.role_id);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
            <p className="text-sm text-gray-500">Ticket #{ticket.id.slice(0, 8)} • Created {new Date(ticket.created_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
            className={clsx(
              "px-3 py-1.5 rounded-md text-sm font-medium border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600",
              ticket.status === 'open' ? 'bg-blue-50 text-blue-700' : 
              ticket.status === 'in_progress' ? 'bg-yellow-50 text-yellow-700' :
              'bg-green-50 text-green-700'
            )}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex space-x-6 min-h-0">
        {/* Main Content: Comments */}
        <div className="flex-1 flex flex-col bg-white shadow rounded-lg overflow-hidden min-w-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                  {ticket.creator?.full_name?.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{ticket.creator?.full_name}</span>
                  <span className="text-xs text-gray-500 ml-2">Original Request</span>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
            </div>

            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className={clsx(
                  "p-4 rounded-lg border",
                  comment.is_internal ? "bg-yellow-50 border-yellow-200" : "bg-white border-gray-200"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">
                      {comment.author?.full_name?.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">{comment.author?.full_name}</span>
                      {comment.is_internal && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"><Lock className="h-3 w-3 mr-1" /> Internal Note</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))}
            <div ref={commentsEndRef} />
          </div>

          {/* Reply Box */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleAddComment} className="space-y-3">
              <div className="flex items-center space-x-4 mb-2">
                <button 
                  type="button" 
                  onClick={() => setIsInternal(false)}
                  className={clsx("text-sm font-medium px-2 py-1 rounded", !isInternal ? "bg-blue-100 text-blue-700" : "text-gray-500")}
                >
                  Public Reply
                </button>
                {canManage && (
                  <>
                    <button 
                      type="button" 
                      onClick={() => setIsInternal(true)}
                      className={clsx("text-sm font-medium px-2 py-1 rounded", isInternal ? "bg-yellow-100 text-yellow-700" : "text-gray-500")}
                    >
                      Internal Note
                    </button>
                    <button 
                      type="button" 
                      onClick={handleAiSuggest}
                      disabled={isSuggesting}
                      className="ml-auto flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                    >
                      {isSuggesting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Sparkles className="h-4 w-4 mr-1" />}
                      AI Suggest Reply
                    </button>
                  </>
                )}
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={isInternal ? "Type an internal note..." : "Type your reply to the customer..."}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sending || !commentText.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {sending ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  {isInternal ? 'Post Note' : 'Send Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar: Metadata */}
        <div className="w-80 space-y-6">
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Assignment</h3>
              <div className="flex flex-col space-y-3">
                <label className="text-xs text-gray-400">Assignee</label>
                <select
                  disabled={!canManage}
                  value={ticket.assignee_id || ''}
                  onChange={(e) => handleAssigneeChange(e.target.value)}
                  className="block w-full rounded-md border-gray-300 py-1.5 text-sm focus:ring-blue-600 disabled:bg-gray-50"
                >
                  <option value="">Unassigned</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.full_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Ticket Info</h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Tag className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-500 mr-2">Priority:</span>
                  <span className={clsx(
                    "font-medium",
                    ticket.priority === 'urgent' ? 'text-red-600' : 
                    ticket.priority === 'high' ? 'text-orange-600' : 'text-gray-900'
                  )}>{ticket.priority.toUpperCase()}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-500 mr-2">Created:</span>
                  <span className="text-gray-900">{new Date(ticket.created_at).toLocaleDateString()}</span>
                </div>
                {ticket.sla_deadline && (
                  <div className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-orange-400 mr-2" />
                    <span className="text-gray-500 mr-2">SLA:</span>
                    <span className="text-gray-900">{new Date(ticket.sla_deadline).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Requester</h3>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold mr-3">
                  {ticket.creator?.full_name?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{ticket.creator?.full_name}</p>
                  <p className="text-xs text-gray-500 truncate">Employee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
