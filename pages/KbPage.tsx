import React, { useEffect, useState } from 'react';
import { ticketService } from '../services/tickets';
import { useAuth } from '../services/auth';
import { KnowledgeBaseArticle } from '../types';
import { 
  Plus, 
  Book, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  Loader2,
  ChevronRight,
  User,
  Calendar
} from 'lucide-react';
import { clsx } from 'clsx';

export const KbPage: React.FC = () => {
  const { profile, tenant } = useAuth();
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingArticle, setViewingArticle] = useState<KnowledgeBaseArticle | null>(null);
  const [editingArticle, setEditingArticle] = useState<KnowledgeBaseArticle | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    is_published: true
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await ticketService.getKbArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !tenant) return;

    try {
      if (editingArticle) {
        await ticketService.updateKbArticle(editingArticle.id, formData);
      } else {
        await ticketService.createKbArticle({
          ...formData,
          tenant_id: tenant.id,
          author_id: profile.id
        });
      }
      setIsModalOpen(false);
      setEditingArticle(null);
      setFormData({ title: '', content: '', category: '', is_published: true });
      loadArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleEdit = (article: KnowledgeBaseArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category || '',
      is_published: article.is_published
    });
    setViewingArticle(null);
    setIsModalOpen(true);
  };

  const canManage = profile && ['company_admin', 'it_manager', 'support_agent'].includes(profile.role_id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-500">Help articles and documentation for your team</p>
        </div>
        {canManage && (
          <button
            onClick={() => {
              setEditingArticle(null);
              setFormData({ title: '', content: '', category: '', is_published: true });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Article List */}
        <div className="flex-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {loading ? (
              <div className="p-12 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>
            ) : articles.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No articles found.</div>
            ) : (
              articles.map((article) => (
                <div 
                  key={article.id} 
                  className={clsx(
                    "p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between",
                    viewingArticle?.id === article.id && "bg-blue-50"
                  )}
                  onClick={() => setViewingArticle(article)}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Book className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{article.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{article.category || 'General'}</span>
                        <span>•</span>
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Article Viewer */}
        <div className="flex-1">
          {viewingArticle ? (
            <div className="bg-white shadow rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{viewingArticle.title}</h2>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {viewingArticle.author?.full_name}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(viewingArticle.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {canManage && (
                  <button 
                    onClick={() => handleEdit(viewingArticle)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-blue-600"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                )}
              </div>
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {viewingArticle.content}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500">
              Select an article to view its content
            </div>
          )}
        </div>
      </div>

      {/* New/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">{editingArticle ? 'Edit Article' : 'New Article'}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    placeholder="e.g. Network, Software, HR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    rows={12}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm font-mono"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Published</label>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:col-start-2 sm:text-sm">
                    {editingArticle ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
