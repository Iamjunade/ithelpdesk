import { GoogleGenerativeAI } from '@google/genai';
import { KnowledgeBaseArticle, TicketPriority } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const aiService = {
  async classifyTicket(subject: string, description: string): Promise<{ category: string, priority: TicketPriority }> {
    const prompt = `
      You are an AI IT Helpdesk Assistant. 
      Analyze the following ticket and suggest a category and priority (low, medium, high, urgent).
      
      Subject: ${subject}
      Description: ${description}
      
      Return ONLY a JSON object in this format:
      { "category": "string", "priority": "low" | "medium" | "high" | "urgent" }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
    } catch (error) {
      console.error('AI Classification error:', error);
      return { category: 'Other', priority: 'medium' };
    }
  },

  async suggestReply(ticketContent: string, kbArticles: KnowledgeBaseArticle[]): Promise<string> {
    const context = kbArticles.map(a => `Title: ${a.title}\nContent: ${a.content}`).join('\n\n');
    const prompt = `
      You are an AI Support Agent. 
      Use the following Knowledge Base context to suggest a helpful reply to the customer's ticket.
      If the answer is not in the context, suggest a general professional response and ask for more details.
      
      Knowledge Base Context:
      ${context}
      
      Customer Ticket:
      ${ticketContent}
      
      Suggested Reply:
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Suggestion error:', error);
      return 'I am sorry, I could not generate a suggestion at this time.';
    }
  }
};
