import { Job, JobCategory } from '../types/job';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'zim-001',
    title: 'Shop Assistant',
    employer: 'Samora Grocery & Provisions',
    location: 'Harare CBD',
    category: 'Part-time',
    pay: 'US$180/month',
    payCurrency: 'USD',
    deadline: '2026-11-10',
    applyLink: 'https://wa.me/263772110022?text=Hi,%20I%20am%20applying%20for%20the%20Shop%20Assistant%20position%20in%20Harare%20CBD',
    applyType: 'whatsapp',
    applyContactValue: '+263 77 211 0022',
    verified: true,
    featured: true,
    postedDate: '2026-10-15',
    description: 'Energetic retail shop assistant required for an active convenience and household grocery mart in Harare CBD. You will assist customers, pack shelves, restock daily inventory, and operate basic till point.',
    responsibilities: [
      'Greet and assist walk-in customers with merchandise',
      'Maintain shelf stock, pricing labels, and inventory displays',
      'Receive deliveries and verify order manifests',
      'Assist cashier during peak rush hours',
      'Keep store aisles tidy, clean, and well organized'
    ],
    requirements: [
      'At least 5 O-Levels including English and Mathematics',
      'Friendly customer service attitude and trustworthiness',
      'Harare resident with easy access to CBD transit'
    ]
  },
  {
    id: 'zim-002',
    title: 'Social Media Assistant',
    employer: 'ZimBrand Digital Marketing',
    location: 'Remote',
    category: 'Remote',
    pay: 'US$220 - US$300/month',
    payCurrency: 'USD',
    deadline: '2026-11-05',
    applyLink: 'https://wa.me/263719884433?text=Hello,%20I%20am%20interested%20in%20the%20Social%20Media%20Assistant%20gig',
    applyType: 'whatsapp',
    applyContactValue: '+263 71 988 4433',
    verified: true,
    featured: true,
    postedDate: '2026-10-16',
    description: 'Fast-growing digital agency seeks a creative remote assistant to schedule posts, create short WhatsApp status flyers on Canva, and engage with community comments on Facebook, TikTok, and Instagram.',
    responsibilities: [
      'Draft weekly content schedules and quick promotion flyers in Canva',
      'Respond to user comments and direct inquiries within 1 hour',
      'Schedule posts on Meta Business Suite and track basic engagement metrics',
      'Report weekly follower growth and viral post trends'
    ],
    requirements: [
      'Reliable smartphone or laptop with stable internet connection',
      'Experience using Canva and active on TikTok/Facebook/Instagram',
      'Strong written English and conversational Shona or Ndebele',
      'Self-motivated with good communication skills'
    ]
  },
  {
    id: 'zim-003',
    title: 'Motorcycle Delivery Courier',
    employer: 'SwiftDrop Zim Logistics',
    location: 'Harare & Chitungwiza',
    category: 'Small gigs',
    pay: 'US$15 - US$25/day + Fuel',
    payCurrency: 'USD',
    deadline: '2026-11-20',
    applyLink: 'https://wa.me/263773400500?text=Hi%20SwiftDrop,%20I%20have%20a%20Class%203%20license%20and%20want%20to%20do%20deliveries',
    applyType: 'whatsapp',
    applyContactValue: '+263 77 340 0500',
    verified: true,
    featured: false,
    postedDate: '2026-10-14',
    description: 'On-demand parcel and food delivery courier for express runs across Harare, Eastlea, Borrowdale, and Chitungwiza. Daily payouts available based on completed deliveries.',
    responsibilities: [
      'Pick up orders from partner restaurants and pharmacies',
      'Navigate Harare suburbs safely and deliver packages on time',
      'Verify recipient signatures or one-time delivery confirmation codes',
      'Maintain motorcycle cleanliness and report maintenance needs'
    ],
    requirements: [
      'Valid Zimbabwe Class 3 Driver’s License (Motorcycle)',
      'Clean riding record and good road safety knowledge',
      'Smartphone with WhatsApp and Google Maps capability'
    ]
  },
  {
    id: 'zim-004',
    title: 'Till Operator & POS Agent',
    employer: 'Matopos Fresh Supermarket',
    location: 'Bulawayo',
    category: 'Full-time',
    pay: 'US$260/month',
    payCurrency: 'USD',
    deadline: '2026-11-12',
    applyLink: 'mailto:careers@matoposfresh.co.zw?subject=Till%20Operator%20Application%20-%20Bulawayo',
    applyType: 'email',
    applyContactValue: 'careers@matoposfresh.co.zw',
    verified: true,
    featured: true,
    postedDate: '2026-10-17',
    description: 'Matopos Fresh is recruiting full-time till operators and point-of-sale agents in Bulawayo Central. Fast-paced supermarket environment with steady benefits and shift allowance.',
    responsibilities: [
      'Accurately scan groceries and process multi-currency payments (USD, ZiG, Swipe, EcoCash)',
      'Reconcile end-of-shift till drawer and register receipts',
      'Provide warm, courteous service to all shoppers',
      'Assist with packing bags and price verification'
    ],
    requirements: [
      'O-Level certificate with passes in Maths and English',
      'Prior experience with POS systems, EcoCash merchant lines, or cash handling',
      'Strong arithmetic skills and integrity (police clearance required upon offer)'
    ]
  },
  {
    id: 'zim-005',
    title: 'Solar PV Installation Assistant',
    employer: 'SunPower Solutions Zim',
    location: 'Mutare',
    category: 'Small gigs',
    pay: 'US$30/day (Project-based)',
    payCurrency: 'USD',
    deadline: '2026-11-25',
    applyLink: 'https://wa.me/263784112233?text=Hi%20SunPower,%20I%20am%20available%20for%20Solar%20Installation%20gigs%20in%20Mutare',
    applyType: 'whatsapp',
    applyContactValue: '+263 78 411 2233',
    verified: true,
    featured: false,
    postedDate: '2026-10-15',
    description: 'Assist our lead solar electricians with rooftop mounting, inverter cable routing, lithium battery setup, and site cleanup for residential and farm solar installations in Manicaland.',
    responsibilities: [
      'Mount solar brackets and panels on residential and commercial roofs safely',
      'Drill cable conduits and assist electrical connections under supervision',
      'Unload solar equipment, lithium batteries, and racking materials',
      'Test solar string voltages alongside technician'
    ],
    requirements: [
      'Basic electrical knowledge or National Certificate / Trade test advantageous',
      'Comfortable working at heights on ladders and roofs',
      'Physical stamina and personal safety gear (work boots)'
    ]
  },
  {
    id: 'zim-006',
    title: 'Primary School Weekend Tutor (Maths & English)',
    employer: 'Avondale Private Family',
    location: 'Harare',
    category: 'Part-time',
    pay: 'US$12/hour (6 hrs/wk)',
    payCurrency: 'USD',
    deadline: '2026-11-08',
    applyLink: 'https://wa.me/263775667788?text=Hello,%20I%20am%20applying%20for%20the%20Primary%20Tutor%20role%20in%20Avondale',
    applyType: 'whatsapp',
    applyContactValue: '+263 77 566 7788',
    verified: true,
    featured: false,
    postedDate: '2026-10-16',
    description: 'Looking for a patient, dedicated private tutor for two primary school learners (Grade 5 and Grade 7 ZIMSEC & Cambridge prep) on Saturday mornings and Wednesday afternoons.',
    responsibilities: [
      'Help learners grasp fundamental mathematics, fractions, and word problems',
      'Guide comprehension, composition writing, and grammar exercises',
      'Prepare learners for Grade 7 national examination mock tests',
      'Provide monthly progress feedback to parents'
    ],
    requirements: [
      'Teaching diploma, university degree, or A-Level with outstanding grades',
      'Previous tutoring experience or teaching background',
      'Patient, encouraging demeanor with children'
    ]
  },
  {
    id: 'zim-007',
    title: 'Horticulture & Greenhouse Supervisor',
    employer: 'Valley Green Produce',
    location: 'Mazowe',
    category: 'Full-time',
    pay: 'US$380 - US$450/month + Housing',
    payCurrency: 'USD',
    deadline: '2026-11-18',
    applyLink: 'mailto:jobs@valleygreenproduce.co.zw?subject=Greenhouse%20Supervisor%20Mazowe',
    applyType: 'email',
    applyContactValue: 'jobs@valleygreenproduce.co.zw',
    verified: true,
    featured: false,
    postedDate: '2026-10-13',
    description: 'Oversee drip irrigation, tomato and pepper greenhouse tunnels, pest monitoring, and harvesting teams on a commercial export farm in Mazowe.',
    responsibilities: [
      'Monitor daily drip fertigation schedules and pH balance',
      'Supervise a team of 12 greenhouse pickers and packers',
      'Implement integrated pest management (IPM) protocols',
      'Maintain daily harvest logs and cold storage transfer sheets'
    ],
    requirements: [
      'Diploma in Agriculture, Horticulture, or Crop Science (Chibero, Gwebi, or equivalent)',
      'At least 2 years commercial farm experience',
      'Willingness to reside on-site in Mazowe'
    ]
  },
  {
    id: 'zim-008',
    title: 'Industrial Attachment — Accounts & Finance',
    employer: 'Apex Hardware & Building Supplies',
    location: 'Harare',
    category: 'Attachment / Internship',
    pay: 'US$150/month (Stipend)',
    payCurrency: 'USD',
    deadline: '2026-11-30',
    applyLink: 'mailto:hr@apexhardware.co.zw?subject=Industrial%20Attachment%20Application%202026/2027',
    applyType: 'email',
    applyContactValue: 'hr@apexhardware.co.zw',
    verified: true,
    featured: false,
    postedDate: '2026-10-17',
    description: 'Opportunity for 3rd-year university or polytechnic students seeking a 12-month industrial attachment placement in corporate financial accounting and ledger management.',
    responsibilities: [
      'Enter supplier invoices and purchase orders into Sage Pastel / QuickBooks',
      'Assist with monthly bank and merchant reconciliations',
      'File tax receipts and assist during ZIMRA filing periods',
      'Perform monthly physical stocktaking with warehouse team'
    ],
    requirements: [
      'Currently studying BCom Accounting, Banking & Finance, or HND Accounting',
      'Recommendation letter from university/polytechnic industrial liaison office',
      'Proficiency in Microsoft Excel'
    ]
  },
  {
    id: 'zim-009',
    title: 'Salon Braider & Hair Stylist',
    employer: 'Glamour Crown Hair Studio',
    location: 'Gweru',
    category: 'Small gigs',
    pay: 'US$15 - US$40/client (Commission)',
    payCurrency: 'USD',
    deadline: '2026-11-15',
    applyLink: 'https://wa.me/263774889900?text=Hi,%20I%20am%20a%20skilled%20braider%20in%20Gweru%20looking%20for%20a%20chair',
    applyType: 'whatsapp',
    applyContactValue: '+263 77 488 9900',
    verified: true,
    featured: false,
    postedDate: '2026-10-16',
    description: 'Busy hair salon in Gweru downtown has booth space and client overflow for experienced knotless braiders, dreadlock locticians, and weave stylists.',
    responsibilities: [
      'Provide clean, painless knotless braids, twists, and dreadlock re-twisting',
      'Consult with clients regarding hair care and styling preferences',
      'Maintain workstation hygiene and sanitize styling tools',
      'Promote salon retail hair care oils and treatments'
    ],
    requirements: [
      'Proven styling portfolio (photos of past client braiding)',
      'Speed and neatness in braiding',
      'Polite and courteous client communication'
    ]
  }
];

export const INITIAL_CHECKLIST = [
  {
    id: 'chk-1',
    label: 'The website opens on an Android phone',
    description: 'Ensure layout, fonts, and buttons are responsive without horizontal scroll on phone screens.',
    completed: true
  },
  {
    id: 'chk-2',
    label: 'Each job has a real employer and source',
    description: 'Only publish vacancies verified from real businesses, schools, or verified individuals.',
    completed: true
  },
  {
    id: 'chk-3',
    label: 'Application links open the correct page or WhatsApp',
    description: 'Test that direct WhatsApp, email, or web links route job seekers directly to employer.',
    completed: true
  },
  {
    id: 'chk-4',
    label: 'Expired vacancies are removed or marked closed',
    description: 'Regularly audit deadlines so users never waste airtime applying for filled positions.',
    completed: false
  },
  {
    id: 'chk-5',
    label: 'Contact details and the About page work',
    description: 'Users and employers should easily reach you to submit listings or report suspicious posts.',
    completed: true
  },
  {
    id: 'chk-6',
    label: 'A friend can find a vacancy without your help',
    description: 'Have a friend test searching and applying on their phone to verify straightforward navigation.',
    completed: false
  }
];

export const ZIMBABWE_LOCATIONS = [
  'All Zimbabwe',
  'Harare',
  'Bulawayo',
  'Chitungwiza',
  'Mutare',
  'Gweru',
  'Kwekwe',
  'Masvingo',
  'Victoria Falls',
  'Mazowe',
  'Remote'
];

export const JOB_CATEGORIES: JobCategory[] = [
  'Full-time',
  'Part-time',
  'Small gigs',
  'Remote',
  'Attachment / Internship'
];
