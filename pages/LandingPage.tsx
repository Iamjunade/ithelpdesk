import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, PlayCircle, TrendingUp, Bot, MessageSquare, BarChart3, Building2, Palette, Shield, CheckCircle, RocketIcon, Star } from 'lucide-react';

export const LandingPage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden antialiased transition-colors duration-300">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f3f0f4] dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-white">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-text-main dark:text-white">HelpDesk Pro</span>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex gap-8 items-center">
                            <a className="text-sm font-medium text-text-main hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors" href="#">Features</a>
                            <a className="text-sm font-medium text-text-main hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors" href="#">Solutions</a>
                            <a className="text-sm font-medium text-text-main hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors" href="#">Pricing</a>
                            <a className="text-sm font-medium text-text-main hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors" href="#">Resources</a>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hidden sm:block text-sm font-medium text-text-main dark:text-white hover:text-primary">
                                Log in
                            </Link>
                            <Link to="/register" className="bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-primary/25">
                                Request Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-b from-primary/5 to-transparent opacity-50 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-gradient-to-t from-primary/10 to-transparent opacity-30 blur-3xl"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                            {/* Hero Content */}
                            <div className="flex-1 max-w-2xl text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    v2.0 Now Available for Enterprise
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-main dark:text-white leading-[1.15] tracking-tight mb-6">
                                    Revolutionize Your <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">IT Support Scale</span>.
                                </h1>

                                <p className="text-lg text-text-muted dark:text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    The enterprise-grade Helpdesk platform built for multi-tenant environments. Reduce ticket resolution time by 40% with AI-driven automation.
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <Link to="/register" className="bg-primary hover:bg-primary-hover text-white text-base font-bold h-12 px-8 rounded-lg transition-all shadow-glow flex items-center gap-2">
                                        Start Free Trial
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <button className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/50 text-text-main dark:text-white text-base font-bold h-12 px-8 rounded-lg transition-all flex items-center gap-2">
                                        <PlayCircle className="w-5 h-5 text-primary" />
                                        Book Demo
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-text-muted">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-gray-300"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-gray-400"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-gray-500"></div>
                                    </div>
                                    <p>Trusted by 500+ IT Teams</p>
                                </div>
                            </div>

                            {/* Hero Visual */}
                            <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
                                <div className="relative group rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden aspect-[4/3]">
                                    {/* Mock UI Header */}
                                    <div className="h-8 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                    </div>

                                    {/* Mock Dashboard Content */}
                                    <div className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5">
                                        <div className="space-y-4">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                            <div className="h-32 bg-white dark:bg-gray-800 rounded-lg p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                                    <div className="h-3 bg-primary/20 rounded w-16"></div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
                                                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-4/6"></div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="h-20 bg-white dark:bg-gray-800 rounded-lg"></div>
                                                <div className="h-20 bg-white dark:bg-gray-800 rounded-lg"></div>
                                                <div className="h-20 bg-white dark:bg-gray-800 rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Card Badge */}
                                    <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-4 animate-bounce duration-[3000ms]">
                                        <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Efficiency Boost</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">+42% this week</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Bar */}
                <section className="py-10 border-y border-gray-100 dark:border-white/5 bg-white dark:bg-white/5">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-sm font-semibold text-text-muted mb-6 uppercase tracking-wider">Powering support for industry leaders</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-500">
                            <span className="text-xl font-bold text-gray-400 dark:text-gray-500">TechCorp</span>
                            <span className="text-xl font-bold text-gray-400 dark:text-gray-500">GlobalBank</span>
                            <span className="text-xl font-bold text-gray-400 dark:text-gray-500">GreenEnergy</span>
                            <span className="text-xl font-bold text-gray-400 dark:text-gray-500">StarStart</span>
                            <span className="text-xl font-bold text-gray-400 dark:text-gray-500">BlueHarbor</span>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-text-main dark:text-white mb-4">Everything you need to manage support</h2>
                            <p className="text-text-muted dark:text-gray-400 text-lg">Built for multi-tenant environments with complete white-label capabilities. Scale your operations without scaling your headcount.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Bot className="w-8 h-8" />}
                                title="Ticket Automation"
                                description="Automate repetitive tasks and route tickets instantly based on content, priority, and agent availability."
                            />
                            <FeatureCard
                                icon={<MessageSquare className="w-8 h-8" />}
                                title="AI Chatbots"
                                description="24/7 support coverage with intelligent conversational AI that solves Level 1 tickets automatically."
                            />
                            <FeatureCard
                                icon={<BarChart3 className="w-8 h-8" />}
                                title="Analytics Dashboard"
                                description="Real-time insights into team performance, SLA compliance, and customer satisfaction scores."
                            />
                            <FeatureCard
                                icon={<Building2 className="w-8 h-8" />}
                                title="Multi-Tenancy"
                                description="Manage multiple clients or departments from a single glass pane with strict data isolation."
                            />
                            <FeatureCard
                                icon={<Palette className="w-8 h-8" />}
                                title="White Labeling"
                                description="Customize the entire interface to match your brand identity, including domains and emails."
                            />
                            <FeatureCard
                                icon={<Shield className="w-8 h-8" />}
                                title="Enterprise Security"
                                description="SSO, 2FA, Audit Logs, and GDPR compliance features built-in to keep your data secure."
                            />
                        </div>
                    </div>
                </section>

                {/* ROI Calculator Section */}
                <section className="py-20 bg-white dark:bg-surface-dark/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl relative">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                            <div className="flex flex-col lg:flex-row">
                                <div className="p-10 lg:p-16 flex-1 text-white z-10">
                                    <h2 className="text-3xl font-bold mb-6">See how much you can save</h2>
                                    <p className="text-primary-light text-lg mb-8 max-w-md">
                                        Our clients reduce operational costs by an average of 40% within the first 3 months. Use our calculator to estimate your potential ROI.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-300" />
                                            <span>Lower cost per ticket</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-300" />
                                            <span>Reduce agent churn rate</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-300" />
                                            <span>Faster onboarding time</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-10 lg:p-16 flex-1 bg-white dark:bg-surface-dark text-text-main dark:text-white z-10 lg:rounded-l-3xl">
                                    <div className="space-y-8">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="font-bold text-sm">Monthly Ticket Volume</label>
                                                <span className="font-bold text-primary">2,500</span>
                                            </div>
                                            <input type="range" min="100" max="10000" defaultValue="2500" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="font-bold text-sm">Current Team Size</label>
                                                <span className="font-bold text-primary">15 Agents</span>
                                            </div>
                                            <input type="range" min="1" max="100" defaultValue="15" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                        </div>
                                        <hr className="border-gray-100 dark:border-gray-700" />
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-sm text-text-muted mb-1">Estimated Monthly Savings</p>
                                                <p className="text-4xl font-black text-primary tracking-tight">$12,450</p>
                                            </div>
                                            <button className="text-sm font-bold text-primary hover:text-primary-hover underline decoration-2 underline-offset-4">
                                                Get Detailed Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-text-main dark:text-white">Loved by support teams worldwide</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <TestimonialCard
                                quote="HelpDesk Pro completely transformed how we handle internal IT requests. The AI automation alone saved us 20 hours a week."
                                author="Sarah Jenkins"
                                role="CTO, TechFlow"
                            />
                            <TestimonialCard
                                quote="The white-label features allowed us to offer a branded support portal to our VIP clients. It looks and feels expensive."
                                author="Michael Chen"
                                role="Director of Support, CloudScale"
                            />
                            <TestimonialCard
                                quote="We migrated from Zendesk in under a week. The onboarding team was fantastic and the data migration was flawless."
                                author="Elena Rodriguez"
                                role="VP of Operations, DataSecure"
                            />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold text-text-main dark:text-white mb-6 tracking-tight">
                            Ready to upgrade your support experience?
                        </h2>
                        <p className="text-lg text-text-muted dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                            Join thousands of high-growth companies that trust HelpDesk Pro to deliver exceptional customer service at scale.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                            <Link to="/register" className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white text-lg font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all flex justify-center items-center gap-2">
                                Get Started Free
                                <RocketIcon className="w-5 h-5" />
                            </Link>
                            <button className="w-full sm:w-auto bg-transparent border border-gray-200 dark:border-gray-700 hover:border-primary text-text-main dark:text-white text-lg font-bold py-3.5 px-8 rounded-lg transition-all">
                                Talk to Sales
                            </button>
                        </div>

                        <p className="mt-6 text-sm text-text-muted">No credit card required • 14-day free trial • Cancel anytime</p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-surface-light dark:bg-surface-dark pt-16 pb-8 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 flex items-center justify-center bg-primary rounded text-white">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-lg text-text-main dark:text-white">HelpDesk Pro</span>
                            </div>
                            <p className="text-text-muted dark:text-gray-400 text-sm mb-6 max-w-xs">
                                Making enterprise support accessible, intelligent, and scalable for modern teams.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-text-main dark:text-white mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-text-muted dark:text-gray-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Changelog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-text-main dark:text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-text-muted dark:text-gray-400">
                                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-text-main dark:text-white mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-text-muted dark:text-gray-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Community</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Status</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-text-muted dark:text-gray-500">© 2024 HelpDesk Pro Inc. All rights reserved.</p>
                        <div className="flex gap-6 text-sm text-text-muted dark:text-gray-500">
                            <a className="hover:text-text-main dark:hover:text-white" href="#">Privacy Policy</a>
                            <a className="hover:text-text-main dark:hover:text-white" href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Feature Card Component
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group p-8 bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-text-main dark:text-white mb-3">{title}</h3>
        <p className="text-text-muted dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
);

// Testimonial Card Component
const TestimonialCard: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
    <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative">
        <div className="absolute top-4 right-4 text-primary/20 text-6xl">"</div>
        <div className="flex text-amber-400 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
            ))}
        </div>
        <p className="text-text-main dark:text-gray-300 mb-6 relative z-10">{quote}</p>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
                <p className="font-bold text-sm text-text-main dark:text-white">{author}</p>
                <p className="text-xs text-text-muted">{role}</p>
            </div>
        </div>
    </div>
);
