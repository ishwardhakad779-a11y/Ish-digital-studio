import {
  Globe, Bot, Mic, UtensilsCrossed, Stethoscope, Dumbbell,
  Workflow, LayoutDashboard, Server, TrendingUp, Wrench
} from 'lucide-react'

export const services = [
  { icon: Globe, title: 'Premium Business Websites', desc: 'High-converting, blazing-fast websites built for Indian businesses that want to look world-class.' },
  { icon: Bot, title: 'AI Chatbots', desc: 'Custom AI chatbots trained on your business to handle queries, leads and support 24/7.' },
  { icon: Mic, title: 'AI Voice Assistants', desc: 'Voice-powered assistants for bookings, support and hands-free customer interaction.' },
  { icon: UtensilsCrossed, title: 'Restaurant Websites', desc: 'Menu showcases, online ordering and reservation systems built to convert hungry visitors.' },
  { icon: Stethoscope, title: 'Clinic Websites', desc: 'Trust-building websites for clinics with appointment booking and patient information.' },
  { icon: Dumbbell, title: 'Gym Websites', desc: 'High-energy gym and fitness studio sites with membership and class booking flows.' },
  { icon: Workflow, title: 'Business Automation', desc: 'Automate repetitive workflows so your team focuses on growth, not manual tasks.' },
  { icon: LayoutDashboard, title: 'Dashboard Development', desc: 'Custom admin and analytics dashboards to run your business from one screen.' },
  { icon: Server, title: 'FastAPI Development', desc: 'Robust, scalable Python backends powering your web and AI products.' },
  { icon: TrendingUp, title: 'SEO Optimization', desc: 'Get found on Google with technical SEO built into every project from day one.' },
  { icon: Wrench, title: 'Website Maintenance', desc: 'Ongoing updates, monitoring and support so your site never falls behind.' },
]

export const portfolio = [
  {
    title: 'Premium Medical Clinic',
    desc: 'A trust-first clinic website with doctor profiles, appointment booking and patient-friendly design.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    stack: ['React', 'Tailwind CSS', 'FastAPI', 'Framer Motion'],
    live: 'https://premium-medical-clinic-seven.vercel.app',
    github: 'https://github.com/ishwardhakad779-a11y',
  },
  {
    title: 'Luxury Gym',
    desc: 'High-energy fitness brand site with class scheduling, trainer profiles and membership plans.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    stack: ['React', 'Vite', 'Tailwind CSS'],
    live: 'https://luxury-gym-website-eta.vercel.app',
    github: 'https://github.com/ishwardhakad779-a11y',
  },
  {
    title: 'Luxury Indian Restaurant',
    desc: 'An immersive digital menu experience with reservations and a rich visual identity.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    live: '#',
    github: 'https://github.com/ishwardhakad779-a11y',
  },
  {
    title: 'Coaching Institute',
    desc: 'A conversion-focused site for a coaching institute with course listings and enrollment forms.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    stack: ['React', 'FastAPI', 'PostgreSQL'],
    live: '#',
    github: 'https://github.com/ishwardhakad779-a11y',
  },
  {
    title: 'Luxe & Vine — Premium Cafe',
    desc: 'An artisanal cafe and restaurant website with a gold-and-ivory brand identity, table reservations and a story-driven menu experience.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    live: 'https://premium-cofe-website.vercel.app/',
    github: 'https://github.com/ishwardhakad779-a11y',
  },
]

export const stats = [
  { label: 'Projects Delivered', value: 40, suffix: '+' },
  { label: 'Happy Clients', value: 35, suffix: '+' },
  { label: 'Avg. Load Time', value: 0.9, suffix: 's' },
  { label: 'Client Rating', value: 4.9, suffix: '/5' },
]

export const whyChooseUs = [
  { title: 'Premium Design Standard', desc: 'Every project is built to a design bar most agencies never reach.' },
  { title: 'AI-First Approach', desc: 'We build with automation and intelligence baked in, not bolted on.' },
  { title: 'Built For Indian Businesses', desc: 'We understand local business needs, language and customer behaviour.' },
  { title: 'Direct Founder Access', desc: 'You work directly with Ishwar, not a rotating account manager.' },
]

export const process = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your business, goals and target customers.' },
  { step: '02', title: 'Design & Architecture', desc: 'We design the experience and plan the technical architecture.' },
  { step: '03', title: 'Build & Automate', desc: 'We develop the website and connect AI/automation systems.' },
  { step: '04', title: 'Launch & Scale', desc: 'We deploy, optimize and support your growth long-term.' },
]

export const pricing = [
  {
    name: 'Starter',
    price: '₹4,999',
    desc: 'For small businesses that need a professional online presence.',
    features: ['5-Page Website', 'Mobile Responsive', 'Basic SEO Setup', 'Contact Form', '1 Round of Revisions'],
    highlighted: true,
  },
  {
    name: 'Growth',
    price: '8,499',
    desc: 'For businesses ready to convert visitors with automation.',
    features: ['Everything in Starter', 'AI Chatbot Integration', 'Booking/Appointment System', 'Advanced SEO', 'Admin Dashboard'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '15,499',
    desc: 'Full-scale AI and automation systems for serious growth.',
    features: ['Everything in Growth', 'Custom AI Voice Assistant', 'Full Backend + Database', 'Business Automation', 'Priority Support'],
    highlighted: true,
  },
]

export const testimonials = [
  { name: 'Rohit Sharma', role: 'Owner, FitZone Gym', quote: 'ISH Digital Studio gave our gym a website that actually feels premium. Bookings went up within weeks.' },
  { name: 'Dr. Ananya Verma', role: 'Founder, Verma Clinic', quote: 'Patients constantly compliment our website. The booking system alone saved us hours every week.' },
  { name: 'Vikram Singh', role: 'Owner, Spice Route Restaurant', quote: 'The design feels like it belongs to a global brand, not a local restaurant. Exceptional work.' },
]

export const faqs = [
  { q: 'How long does a project take?', a: 'Most business websites are delivered within 7-14 days depending on scope. Custom AI and automation systems may take longer.' },
  { q: 'Do you work with businesses outside Indore?', a: 'Yes, we work with clients across India remotely, with calls and updates over WhatsApp and email.' },
  { q: 'Can you integrate AI chatbots into an existing website?', a: 'Yes, we can integrate AI chatbots and voice assistants into most existing websites and platforms.' },
  { q: 'Do you provide ongoing support after launch?', a: 'Yes, we offer maintenance and support plans to keep your website updated, secure and fast.' },
  { q: 'What is included in the free consultation?', a: 'A 20-30 minute call to understand your business and recommend the right website or automation solution.' },
]

export const contactInfo = {
  founder: 'Ishwar Dhakad',
  email: 'ishwardhakad779@gmail.com',
  phone: '+91 8085781850',
  whatsapp: '918085781850',
  github: 'https://github.com/ishwardhakad779-a11y',
  location: 'Indore, Madhya Pradesh',
}

export const teamContacts = [
  { name: 'Ishwar Dhakad', phone: '+91 8085781850' },
  { name: 'Naman Dhakad', phone: '+91 9406601697' },


]

export const calculatorFeatures = [
  { id: 'website', name: 'Base Website (5 pages)', price: 3999, base: true },
  { id: 'extraPage', name: 'Extra Page', price: 300 },
  { id: 'chatbot', name: 'AI Chatbot Integration', price: 1500 },
  { id: 'booking', name: 'Booking/Appointment System', price: 1200 },
  { id: 'dashboard', name: 'Admin Dashboard', price: 1200 },
  { id: 'seo', name: 'Advanced SEO', price: 800 },
  { id: 'voice', name: 'AI Voice Assistant', price: 2500 },
  { id: 'automation', name: 'Business Automation', price: 2000 },
]
