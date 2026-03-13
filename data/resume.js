/* ==========================================================================
   data/resume.js — All resume content as structured data
   Terminal Portfolio — Sachin Verma
   Edit this file to update portfolio content.
   ========================================================================== */

const RESUME = {

  /* ── Personal ─────────────────────────────────────────────────────────── */
  personal: {
    name:     'SACHIN VERMA',
    title:    'Senior Software Engineer',
    location: 'Dubai, United Arab Emirates 🇦🇪',
    email:    'sac95verma@gmail.com',
    phone:    '+971 529095664',
    linkedin: 'linkedin.com/in/sac95verma',
    linkedinUrl: 'https://linkedin.com/in/sac95verma',
    status:   'available',
    domains:  ['FinTech', 'Healthcare', 'E-Commerce'],
    whatsapp:    '+971 529095664',
    whatsappUrl: 'https://wa.me/971529095664',
  },

  /* ── Summary ──────────────────────────────────────────────────────────── */
  summary: `Senior Software Engineer with <strong>8+ years</strong> of experience architecting scalable solutions in FinTech, E-commerce, and Healthcare domains. Demonstrated expertise in building payment infrastructure processing <strong>$50M+ monthly volume</strong> and AI-powered healthcare solutions. Strong track record of leading cross-functional teams and delivering high-impact products using modern tech stacks including <strong>TypeScript, Python</strong>, and cloud services.`,

  /* ── Stats ────────────────────────────────────────────────────────────── */
  stats: [
    { num: '8+',    label: 'Years Exp' },
    { num: '$100M', label: 'Txn Vol/Mo' },
    { num: '5',     label: 'Companies' },
    { num: '99.99', label: '% Uptime' },
  ],

  /* ── Experience ───────────────────────────────────────────────────────── */
  experience: [
    {
      title:   'Full Stack Engineer (ICE-4)',
      company: 'Stitch Money',
      note:    null,
      start:   'Apr 2024',
      end:     'Present',
      bullets: [
        'Architected and launched <strong>Direct Debits</strong> product suite — payment system processing <strong>$100M+ monthly</strong>, driving 10% growth in transaction volume across <strong>1M+ transactions/month</strong>',
        'Engineered multi-channel payment infrastructure supporting <strong>crypto, manual EFTs, and cash deposits</strong>, resulting in 30% increase in payment options for merchants',
        'Designed fault-tolerant system architecture with <strong>99.99% uptime</strong> using TypeScript, Postgres & Azure, reducing deployment failures by 30%',
      ],
      stack: ['TypeScript', 'Postgres', 'Azure', 'Kafka', 'Bull-MQ', 'Redis', 'React'],
    },
    {
      title:   'Senior Software Engineer I',
      company: 'LocAI Ltd',
      note:    null,
      start:   'Jan 2024',
      end:     'Apr 2024',
      bullets: [
        'Spearheaded AI-powered healthcare platform serving <strong>100+ doctors</strong>, reducing patient diagnosis time by <strong>40%</strong> using Python & LLMs (OpenAI, Falcon)',
        'Engineered real-time medical dictation system processing <strong>1,000+ hours</strong> of conversations monthly, improving documentation efficiency by 60%',
        'Built scalable backend using AWS & Redis, handling <strong>10,000+ daily transactions</strong> at 99.99% uptime',
      ],
      stack: ['TypeScript', 'NestJS', 'Python', 'AWS', 'Redis', 'OpenAI', 'Postgres', 'NextJS'],
    },
    {
      title:   'Software Development Engineer 3',
      company: 'PayStack',
      note:    'Acquired by Stripe',
      start:   'Mar 2022',
      end:     'Nov 2023',
      bullets: [
        'Led architecture of payment infrastructure for South African market, enabling <strong>800+ merchants</strong> to process local & international payments',
        'Optimized payment processing pipeline — reduced transaction time by <strong>50%</strong>, increased success rate to <strong>96%</strong>',
        'Established integration partnerships with <strong>5 major banks</strong>, expanding market reach by 300% using NodeJS & AWS',
      ],
      stack: ['NodeJS', 'SailsJS', 'PHP 7', 'MySQL', 'MongoDB', 'AWS', 'Redis', 'Kafka'],
    },
    {
      title:   'Software Development Engineer 3',
      company: 'Noon.com',
      note:    null,
      start:   'Dec 2019',
      end:     'Mar 2022',
      bullets: [
        'Architected fraud detection system that reduced fraudulent transactions by <strong>40%</strong>, protecting <strong>$1M+</strong> in annual revenue',
        'Developed seller analytics platform serving <strong>10,000+ merchants</strong>, increasing marketplace efficiency by 35% through automated review & return processes',
        'Engineered mission-critical SFTP microservice handling <strong>10M+ daily import/export operations</strong>, reducing processing time by 60%',
        'Optimized real-time pricing engine for <strong>1M+ SKUs</strong> at 99.9% uptime with 200ms average response time',
      ],
      stack: ['Python', 'MySQL', 'Redis', 'GCP', 'BigQuery', 'Google Pub-Sub', 'Google Spanner'],
    },
    {
      title:   'Software Engineer',
      company: 'PT Tokopedia',
      note:    'Now GoTo, Acquired by TikTok',
      start:   'Apr 2019',
      end:     'Dec 2019',
      bullets: [
        'Architected recommendation engine reaching <strong>20M+ users</strong>, increasing click-through rates by 45% and customer engagement by 30%',
        'Collaborated with data science team to implement ML models improving purchase conversion rates by <strong>25%</strong>',
        'Designed distributed system handling <strong>100,000+ req/sec</strong> with sub-100ms latency using Cassandra, Redis & Kafka',
      ],
      stack: ['Golang', 'Postgres', 'Cassandra', 'Redis', 'AWS', 'Alibaba Cloud', 'Kafka', 'SQS'],
    },
    {
      title:   'Associate Software Developer',
      company: 'Droom Technology',
      note:    null,
      start:   'Jun 2017',
      end:     'Apr 2019',
      bullets: [
        'Built end-to-end order management system processing <strong>50,000+ monthly transactions</strong>, reducing operational overhead by 60%',
        'Engineered automated dispute resolution system — decreased resolution time from <strong>72 hours → 4 hours</strong>, improving customer satisfaction by 40%',
        'Developed scalable billing & refund modules handling <strong>$5M+ monthly volume</strong> with 99.99% accuracy',
      ],
      stack: ['PHP', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'RabbitMQ'],
    },
  ],

  /* ── Skills ───────────────────────────────────────────────────────────── */
  skills: [
    {
      group: 'Languages',
      items: [
        { name: 'TypeScript', pct: 95 },
        { name: 'Python',     pct: 88 },
        { name: 'NodeJS',     pct: 90 },
        { name: 'Golang',     pct: 75 },
        { name: 'PHP',        pct: 70 },
      ],
    },
    {
      group: 'Databases',
      items: [
        { name: 'PostgreSQL', pct: 92 },
        { name: 'MongoDB',    pct: 85 },
        { name: 'Redis',      pct: 90 },
        { name: 'MySQL',      pct: 82 },
        { name: 'Cassandra',  pct: 72 },
      ],
    },
    {
      group: 'Cloud & Infra',
      items: [
        { name: 'AWS',        pct: 92 },
        { name: 'Azure',      pct: 80 },
        { name: 'GCP',        pct: 78 },
        { name: 'Docker',     pct: 85 },
        { name: 'Kubernetes', pct: 72 },
      ],
    },
    {
      group: 'Messaging & Tools',
      items: [
        { name: 'Kafka',      pct: 88 },
        { name: 'RabbitMQ',   pct: 80 },
        { name: 'Bull-MQ',    pct: 85 },
        { name: 'Datadog',    pct: 78 },
        { name: 'OpenAI/LLMs',pct: 82 },
      ],
    },
  ],

  /* ── Domain Tags ──────────────────────────────────────────────────────── */
  domains: [
    '💳 Payment Infrastructure',
    '🤖 AI / LLM Integration',
    '🏗️ System Architecture',
    '📈 High-Scale Systems',
    '🛡️ Fraud Detection',
    '🏥 Healthcare Tech',
    '🛒 E-Commerce',
    '🔄 Microservices',
  ],

  /* ── Education ────────────────────────────────────────────────────────── */
  education: [
    {
      degree:  'B.Tech — Computer Science',
      school:  'Delhi Technological University (formerly DCE)',
      note:    'Major in Computer Science',
      start:   'Aug 2013',
      end:     'Jun 2017',
    },
    {
      degree:  'Senior Secondary — CBSE Board',
      school:  'Rainbow Senior Secondary School',
      note:    null,
      start:   'Apr 2012',
      end:     'Mar 2013',
    },
  ],

};

// Export for use in other modules
if (typeof module !== 'undefined') module.exports = RESUME;