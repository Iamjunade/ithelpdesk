# IT Help Desk

A centralized support ticketing system built for managing IT support requests across organizations. This platform brings together ticket creation, assignment, tracking, and resolution into one unified interface.

## What's This About?

Got tired of juggling multiple support platforms and losing track of tickets? Yeah, me too. This system consolidates everything into one place - whether tickets come from web, mobile, or chatbot interactions. It's designed to handle multi-tenant scenarios, so different companies can use the same platform while keeping their data completely separate.

## Key Features

- **Multi-tenant Architecture** - Each organization gets their own isolated workspace with custom branding
- **Role-based Access Control** - Platform admins, company admins, IT managers, support agents, and employees all have appropriate permissions
- **Ticket Management** - Create, assign, track, and resolve tickets with status updates and priority levels
- **SLA Tracking** - Set response and resolution time targets based on ticket priority
- **Knowledge Base** - Build a searchable repository of solutions and documentation
- **User Management** - Invite and manage users across different roles
- **AI Integration** - Powered by Google's Gemini for smart assistance (because why not make support smarter?)

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

You'll need Node.js installed on your machine. That's pretty much it.

### Installation

1. Clone this repo:
```bash
git clone https://github.com/Iamjunade/ithelpdesk.git
cd ithelpdesk
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:

Create a `.env.local` file in the root directory and add:
```
GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

The app should now be running at `http://localhost:5173`

## Project Structure

```
├── components/          # Reusable UI components
├── pages/              # Page components and views
│   ├── LoginPage.tsx
│   ├── TicketList.tsx
│   ├── TicketDetails.tsx
│   ├── KbPage.tsx
│   ├── SlaPage.tsx
│   ├── UsersPage.tsx
│   └── ...
├── services/           # API and business logic
├── types.ts            # TypeScript type definitions
└── App.tsx             # Main application component
```

## User Roles

The system supports five distinct roles:

- **Platform Admin** - Full control over the entire platform
- **Company Admin** - Manages their organization's settings and users
- **IT Manager** - Oversees ticket assignments and SLAs
- **Support Agent** - Handles and resolves tickets
- **Employee** - Creates tickets and views their own submissions

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Contributing

Found a bug? Have a feature idea? Feel free to open an issue or submit a pull request. 

## License

This project is private and proprietary.

---

Built with ☕ and a healthy dose of frustration with existing ticketing systems.
