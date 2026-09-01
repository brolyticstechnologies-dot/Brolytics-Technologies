
export interface SubDetail {
  title: string;
  description: string;
  features?: string[];
  benefits?: string[];
  whyChooseUs?: string[];
}
export interface ServiceDetail {
  slug: string;
  title:string;
  icon?: string;
  description: string;
  backgroundImage: string;
  subDetails?: SubDetail[];
}

export interface HeroSlide {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    hint: string;
  };
}

export interface ServiceHero {
  slides: HeroSlide[];
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  hero?: ServiceHero;
  details: ServiceDetail[];
}

export const services: Service[] = [
  {
    slug: 'it-services',
    title: "IT Services",
    description: "From custom software to stunning websites, we provide comprehensive IT services to build and enhance your digital presence.",
    hero: {
      slides: [
        {
          title: "Custom Web Development",
          description: "We craft responsive, high-performance websites and complex web applications that drive user engagement and deliver business results.",
          image: {
            src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2RlfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Code on a screen",
            hint: "web code"
          }
        },
        {
          title: "Modern Mobile Applications",
          description: "Engage your customers on the go with our intuitive, high-performance native and hybrid mobile apps for both iOS and Android.",
          image: {
            src: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NDg0MDM2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Mobile application development interface on a screen",
            hint: "mobile development"
          }
        },
        {
          title: "Effective Digital Marketing",
          description: "Expand your reach and generate qualified leads with our data-driven digital marketing, SEO, and content strategies.",
          image: {
            src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhbmFseXRpY3N8ZW58MHx8fHwxNzQ4NDAzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Digital marketing analytics on a dashboard",
            hint: "marketing analytics"
          }
        },
        {
          title: "Creative Graphics Designing",
          description: "Our creative team translates your brand's essence into compelling visual identities, from logos to polished UI/UX designs.",
          image: {
            src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWdufGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Abstract graphic design elements",
            hint: "graphic design"
          }
        }
      ]
    },
    details: [
      {
        slug: "website-development",
        title: "Website Development",
        icon: "website-development",
        description: "We build modern, responsive, and user-friendly websites that perfectly represent your brand identity. Our expert developers use the latest technologies to ensure your website is fast, secure, and search engine optimized.",
        backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHdlYnNpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        subDetails: [
          { title: "Key Features", description: "Our solutions feature fully responsive designs for mobile, tablet, and desktop, fast loading speeds through code optimization and image compression, SEO-friendly architecture, intuitive user interfaces for easy navigation, and enhanced security features including SSL certificates and secure coding practices. We also integrate user-friendly Content Management Systems (CMS) for easy content updates." },
          { title: "Technologies We Use", description: "Our expertise spans across multiple technologies. For the frontend, we use HTML5, CSS3, JavaScript, React, Next.js, and Angular. On the backend, we work with PHP, Node.js, Python, and .NET. Our database solutions include MySQL, PostgreSQL, and MongoDB. We are also proficient with various CMS platforms like WordPress, Drupal, and can build custom solutions." },
          { title: "Our Process", description: "Our structured development process begins with Planning & Analysis, where we gather requirements and define the project scope. We then move to Design & Wireframing for user experience design and visual mockups. The Development phase involves clean coding and responsive implementation. This is followed by rigorous cross-browser Testing and quality assurance, and finally, we handle the website Launch & provide ongoing Support." }
        ]
      },
      {
        slug: "mobile-application-development",
        title: "Mobile App Development",
        icon: "mobile-application-development",
        description: "With a mobile-first approach, we develop innovative and engaging mobile applications. Whether you are a startup or an established business, our mobile apps provide your customers with an exceptional experience.",
        backgroundImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        subDetails: [
          { title: "Platform Expertise", description: "We specialize in Native iOS development using Swift and Objective-C, and Native Android development with Kotlin and Java. We also build Cross-Platform applications using React Native and Flutter, as well as Progressive Web Apps (PWA) that offer an app-like experience using web technologies." },
          { title: "App Categories", description: "We have experience building a wide range of applications, including E-commerce, Business & Productivity, Educational, Healthcare, Social Networking, Food & Restaurant, Travel & Tourism, and Gaming apps." },
          { title: "Development Features", description: "Our apps are built with a focus on user-centric design (intuitive UI/UX), performance optimization for speed and smoothness, robust security implementation with data encryption and secure authentication, seamless API integration with third-party services and payment gateways, push notifications for real-time user engagement, and powerful analytics integration for tracking user behavior and insights." },
          { title: "Development Process", description: "Our comprehensive process starts with Concept & Strategy, including idea validation and market research. This is followed by UI/UX Design with wireframes and prototypes. We use an Agile methodology for development, conduct rigorous functional and performance Testing, manage App Store submission and approval, and provide continuous Maintenance and support." }
        ]
      },
      {
        slug: "digital-marketing",
        title: "Digital Marketing",
        icon: "digital-marketing",
        description: "We implement result-driven digital marketing strategies to increase your business's online visibility. From boosting organic traffic to conversion optimization, our team helps you achieve your marketing goals.",
        backgroundImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        subDetails: [
          { title: "SEO Services", description: "We offer On-Page SEO (content optimization, meta tags, internal linking), Off-Page SEO (link building, directory submissions, guest posting), Technical SEO (website speed, mobile-friendliness), Local SEO (Google My Business), E-commerce SEO (product page optimization), and comprehensive SEO Audits." },
          { title: "Digital Marketing Services", description: "Our services include Search Engine Marketing (SEM) with Google Ads and Bing Ads management, Social Media Marketing on platforms like Facebook, Instagram, and LinkedIn, Content Marketing including blog writing and video content, Email Marketing campaigns, targeted Pay-Per-Click (PPC) advertising, and Online Reputation Management." },
          { title: "Our Approach", description: "Our data-driven approach involves detailed Market Research, creating a customized Strategy, hands-on Implementation of campaigns, continuous Monitoring of performance, providing regular progress Reports with insights, and ongoing Optimization to refine our strategies for the best results." },
          { title: "Key Benefits", description: "Partnering with us leads to increased organic traffic and higher search engine rankings, better conversion rates and ROI, enhanced brand visibility and awareness, improved customer engagement and retention, and valuable data-driven insights for decision making." }
        ]
      },
      {
        slug: "graphics-designing",
        title: "Graphics Designing",
        icon: "graphics-designing",
        description: "We provide professional graphic design services that make your brand visually appealing and memorable. From creative concepts to final execution, our designers convert your vision into reality.",
        backgroundImage: "https://images.unsplash.com/photo-1572044162444-24c95621ec34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzQ4NDAzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        subDetails: [
          { title: "Design Services", description: "We provide a wide range of design services including unique Logo Design, complete Brand Identity packages with style guides, Print Design for brochures and business cards, Web Design (UI/UX), Social Media Graphics, Packaging Design, and other Marketing Materials like advertisements and presentations." },
          { title: "Logo Design Process", description: "Our logo design process includes a detailed Brief & Research phase to understand your brand, Concept Development where we create multiple logo concepts, a Refinement stage for incorporating client feedback, and Finalization with delivery in various formats and comprehensive Brand Guidelines." },
          { title: "Design Expertise", description: "Our team is proficient in the Adobe Creative Suite (Photoshop, Illustrator, InDesign), modern UI/UX tools like Figma and Sketch, Print Production, Brand Strategy, Typography, and Color Theory to create a cohesive and effective visual identity." },
          { title: "Deliverables", description: "We provide final designs in multiple formats including vector files and high-resolution images. You'll receive Print-Ready Files, Web-Optimized Graphics, comprehensive Brand Guidelines detailing logo usage and color codes, and the editable Source Files for future use." }
        ]
      }
    ]
  },
  {
    slug: 'healthcare-services',
    title: "Health Services",
    description: "Our health services are designed to prioritize your well-being, offering a seamless blend of preventive care, diagnostics, and financial protection. In collaboration with trusted partners Curelo and HealthInde, we provide comprehensive health checkups, advanced radiology and pathology tests, and tailored health insurance plans to ensure you and your family stay healthy and secure.",
    hero: {
      slides: [
        {
          title: "Empowering Modern Healthcare",
          description: "We provide the essential backbone for healthcare services, ensuring efficiency, compliance, and quality patient care.",
          image: {
            src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NDg0MDM2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Medical technology and equipment",
            hint: "medical technology"
          }
        }
      ]
    },
    details: [
      {
        slug: "health-checkups",
        title: "Health Checkups",
        icon: "health-services",
        description: "Regular health checkups are the cornerstone of preventive healthcare. Our health checkup packages are curated to detect potential health issues early, empowering you to take control of your wellness.",
        backgroundImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=doctor%20patient%20consultation",
        subDetails: [
          {
            title: 'Comprehensive Health Checkup Packages',
            description: "Full-body checkups covering vital parameters like blood pressure, cholesterol, sugar levels, and organ function. Specialized packages for men, women, senior citizens, and children. Customizable options based on age, lifestyle, and medical history.",
            benefits: [
              'Early detection of health risks such as diabetes, hypertension, and heart conditions',
              'Personalized health reports with actionable insights',
              'Access to expert consultations for follow-up care'
            ],
            whyChooseUs: [
              'State-of-the-art diagnostic centers with advanced technology',
              'Quick and accurate results delivered within 24-48 hours',
              'Affordable pricing with packages starting at INR 999'
            ]
          }
        ]
      },
      {
        slug: "radiology-pathology",
        title: "Radiology and Pathology Tests",
        icon: "health-services",
        description: "Our diagnostic services, powered by partnerships with Curelo and HealthInde, offer precise and reliable radiology and pathology tests to support accurate diagnoses and effective treatment plans.",
        backgroundImage: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=medical%20lab",
        subDetails: [
          {
            title: 'Radiology Services',
            description: 'X-rays, CT scans, MRIs, and ultrasounds conducted by certified radiologists. Advanced imaging technology for clear and detailed results. Specialized tests like mammography, bone density scans, and Doppler studies.',
          },
          {
            title: 'Pathology Services',
            description: 'Blood tests (CBC, lipid profile, thyroid function, etc.). Urine and stool analysis for comprehensive health insights. Advanced tests for cancer markers, hormonal imbalances, and infectious diseases.',
          },
          {
            title: 'Key Features',
            description: 'Home sample collection for convenience. Reports accessible online through secure portals. Collaboration with Curelo ensures a wide network of accredited labs. HealthInde integration for seamless booking and result tracking.',
            whyChooseUs: [
              '15,000+ network diagnostic centers across India',
              'Fast turnaround time with same-day results for select tests',
              'Affordable pricing with discounts on bundled test packages'
            ]
          }
        ]
      },
      {
        slug: "health-insurance",
        title: "Health Insurance",
        icon: "health-services",
        description: "In partnership with Curelo and HealthInde, we offer health insurance plans that provide financial security and access to quality healthcare. Our plans are designed to cover a wide range of medical needs, ensuring peace of mind for you and your loved ones.",
        backgroundImage: "https://images.unsplash.com/photo-1560931868-b39f6cdc964d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=health%20insurance%20form",
        subDetails: [
          {
            title: 'Key Coverage Features',
            description: 'Cashless hospitalization at over 10,000+ network hospitals. Pre- and post-hospitalization expenses (up to 60 days before and 90 days after). Coverage for day-care procedures, ambulance charges, and preventive health checkups. Optional add-ons like maternity cover, critical illness cover, and personal accident cover.',
          },
          {
            title: 'Unique Benefits',
            description: 'Tax benefits under Section 80D of the Income Tax Act. No-claim bonus for claim-free years, increasing your coverage without extra cost. Plans starting at just INR 26/day for INR 10 lakh coverage.',
          },
          {
            title: 'Collaboration with Curelo and HealthInde',
            description: 'Curelo: Streamlined insurance claim processing and access to a vast network of healthcare providers. HealthInde: Digital platform for easy policy management, premium payments, and claim tracking.',
            whyChooseUs: [
              'Comprehensive plans for individuals, families, and senior citizens',
              'Flexible sum insured options from INR 3 lakh to INR 2 crore',
              'Lifetime renewability with no age restrictions',
              'Dedicated customer support for hassle-free claim settlements'
            ]
          }
        ]
      }
    ]
  },
  {
    slug: 'credit-card-sales',
    title: "Credit Card Sales",
    description: "We offer a range of credit card solutions in collaboration with leading banks—HDFC Bank, AU Bank, IndusInd Bank, and SBI Bank—designed to meet your financial needs. Paired with attractive loan options, our credit card services provide convenience, rewards, and flexibility.",
    hero: {
      slides: [
        {
          title: "Connecting Customers with Financial Freedom",
          description: "Our expert teams drive secure and convenient payment solutions for today's dynamic market.",
          image: {
            src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjcmVkaXQlMjBjYXJkcyUyMHBheW1lbnR8ZW58MHx8fHwxNzQ4NDAzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Abstract image of credit card and payment terminal",
            hint: "credit card payment"
          }
        }
      ]
    },
    details: [
      {
        slug: "credit-card-offerings",
        title: "Credit Card Offerings",
        icon: "credit-card-sales",
        description: "Our credit card portfolio caters to diverse lifestyles, from travel enthusiasts to shopping lovers, with exclusive benefits and rewards.",
        backgroundImage: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=credit%20card",
        subDetails: [
          {
            title: 'HDFC Bank Credit Cards',
            description: 'Regalia Card: Premium card with travel benefits, lounge access, and reward points on dining and shopping. MoneyBack Card: Ideal for beginners with cashback on online spends and fuel purchases. Key Features: High reward points, low foreign currency markup fees, and contactless payments.'
          },
          {
            title: 'AU Bank Credit Cards',
            description: 'Zenith Card: Offers luxury benefits like golf privileges and accelerated reward points. Altura Card: Affordable card with cashback on everyday spends. Key Features: Flexible reward redemption and low annual fees.'
          },
          {
            title: 'IndusInd Bank Credit Cards',
            description: 'Legend Card: Premium card with travel insurance and concierge services. Platinum Card: No annual fee card with fuel surcharge waivers. Key Features: High credit limits and exclusive lifestyle offers.'
          },
          {
            title: 'SBI Bank Credit Cards',
            description: 'ELITE Card: Premium card with milestone rewards and lounge access. SimplySAVE Card: Budget-friendly card with rewards on dining and groceries. Key Features: Low interest rates and easy EMI conversion.',
            whyChooseUs: [
              'Seamless application process with instant approvals',
              'Exclusive offers like 5-10% cashback on partner merchants',
              'Dedicated support for credit card queries and dispute resolution'
            ]
          }
        ]
      },
      {
        slug: "loans",
        title: "Loans",
        icon: "credit-card-sales",
        description: "Our loan offerings, in collaboration with HDFC Bank, AU Bank, IndusInd Bank, and SBI Bank, provide quick and flexible financing solutions for personal and business needs.",
        backgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059ee353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=loan%20application",
        subDetails: [
          {
            title: 'Personal Loans',
            description: 'Loan amounts from INR 50,000 to INR 40 lakh. Interest rates starting at 10.5% p.a. Flexible tenures from 12 to 60 months. Instant disbursal within 24 hours for eligible customers.'
          },
          {
            title: 'Business Loans',
            description: 'Funding up to INR 75 lakh for small and medium enterprises. Competitive interest rates and minimal documentation. Special schemes for women entrepreneurs and startups.'
          },
          {
            title: 'Loan Against Credit Card',
            description: 'Convert high-value purchases into affordable EMIs. Available on select credit cards from partner banks.',
            whyChooseUs: [
              'Online application process with minimal paperwork',
              'Pre-approved loan offers for existing credit card holders',
              'Transparent terms with no hidden charges'
            ]
          }
        ]
      }
    ]
  },
  {
    slug: 'insurance-sales',
    title: "Insurance Services",
    description: "Our insurance services, in collaboration with leading providers, offer a holistic approach to financial security, combining credit card sales, loans, life insurance, and term plans to safeguard your future.",
     hero: {
      slides: [
        {
          title: "Protecting Your Future with Confidence",
          description: "We offer comprehensive, tailored insurance plans that provide lasting security and peace of mind.",
          image: {
            src: "https://images.unsplash.com/photo-1560931868-b39f6cdc964d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBwcm90ZWN0aW9ufGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Illustration of a shield protecting assets",
            hint: "insurance protection"
          }
        }
      ]
    },
    details: [
      {
        slug: "life-insurance",
        title: "Life Insurance",
        icon: "insurance-services",
        description: "Our life insurance plans provide financial protection for your family in case of unforeseen events, ensuring their well-being and security.",
        backgroundImage: "https://images.unsplash.com/photo-1542840410-24106263548a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=family%20security",
        subDetails: [
          {
            title: 'Key Features',
            description: 'Coverage for death, disability, and critical illnesses. Flexible premium payment options (monthly, quarterly, or annually). Add-ons like accidental death benefit and waiver of premium.'
          },
          {
            title: 'Popular Plans',
            description: 'Whole Life Plan: Lifelong coverage with savings benefits. Endowment Plan: Combines insurance with investment growth. Money-Back Plan: Periodic payouts during the policy term.',
            whyChooseUs: [
              'High claim settlement ratio of 98%+ across partner insurers',
              'Tax benefits under Section 80C and 10(10D) of the Income Tax Act',
              'Customizable plans to suit your financial goals'
            ]
          }
        ]
      },
      {
        slug: "term-plans",
        title: "Term Plans",
        icon: "insurance-services",
        description: "Our term insurance plans offer high coverage at affordable premiums, providing a safety net for your loved ones.",
        backgroundImage: "https://images.unsplash.com/photo-1611095965923-893a9557a344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=financial%20planning",
        subDetails: [
          {
            title: 'Key Features',
            description: 'Sum assured from INR 25 lakh to INR 5 crore. Policy terms from 10 to 40 years. Optional riders for critical illness, accidental death, and permanent disability.'
          },
          {
            title: 'Unique Benefits',
            description: 'Return of premium option if you survive the policy term. Coverage for 64 critical illnesses with lump-sum payouts. Online purchase with instant policy issuance.',
            whyChooseUs: [
              'Affordable premiums starting at INR 500/month for INR 1 crore coverage',
              'Collaboration with HDFC Bank, SBI Bank, and others for seamless policy management',
              'Dedicated claim assistance for quick settlements'
            ]
          }
        ]
      },
      {
        slug: "integration",
        title: "Integration with Credit Card Sales and Loans",
        icon: "insurance-services",
        description: "Bundled Benefits: Use credit cards from HDFC Bank, AU Bank, IndusInd Bank, or SBI Bank to pay insurance premiums and earn rewards. Avail pre-approved loans to fund insurance premiums for high-value plans. Exclusive discounts on insurance plans for credit card holders.",
        backgroundImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=banking%20technology",
        subDetails: [
          {
            title: 'Why Choose Us?',
            description: 'One-stop solution for insurance and financial services. Digital platform for managing policies, loans, and credit card transactions. 24/7 customer support for all services.'
          }
        ]
      }
    ]
  },
  {
    slug: 'ai-services',
    title: "AI Services",
    description: "Harnessing the power of Artificial Intelligence to automate processes, derive insights, and drive innovation.",
    hero: {
      slides: [
        {
          title: "Intelligent Automation & Insights",
          description: "Leverage our cutting-edge AI solutions to unlock data-driven strategies and boost operational efficiency.",
          image: {
            src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Abstract artificial intelligence concept with robotics",
            hint: "artificial intelligence"
          }
        },
        {
          title: "Unlock the Power of Your Data",
          description: "Our data analysis services transform complex datasets into clear, actionable insights that drive business growth.",
          image: {
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXN8ZW58MHx8fHwxNzQ4NDAzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Data analysis dashboards on a screen",
            hint: "data analysis"
          }
        }
      ]
    },
    details: [
      {
        slug: "ai-automation",
        icon: "ai-automation",
        title: "AI-Powered Automation",
        description: "We develop custom AI models to automate repetitive tasks, streamline workflows, and increase operational efficiency across your business.",
        backgroundImage: "https://images.unsplash.com/photo-1593349480503-64c3bbb68b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080&ai-hint=robotic%20arm",
      },
      {
        slug: "data-analysis",
        icon: "data-analysis",
        title: "Data Analysis & Insights",
        description: "Leveraging machine learning to analyze complex datasets, identify trends, and provide actionable insights that inform strategic business decisions.",
        backgroundImage: "https://images.unsplash.com/photo-1543286386-713bdd548da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsZWFkJTIwZ2VuZXJhdGlvbiUyMGFuYWx5dGljc3xlbnwwfHx8fDE3NDg0MDM2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        slug: "custom-ai",
        icon: "custom-ai",
        title: "Custom AI Solutions",
        description: "From natural language processing (NLP) for chatbots to computer vision for image analysis, we build bespoke AI solutions to solve your unique challenges.",
        backgroundImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjbnN1bSUyMGFpJTIwc29sdXRpb25zfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
      }
    ]
  },
  {
    slug: 'resource-outsource',
    title: "Resource Outsource",
    description: "Providing skilled professionals and flexible staffing solutions to augment your team and scale your operations.",
    hero: {
      slides: [
        {
          title: "Augment Your Team with Expert Talent",
          description: "Scale your operations seamlessly with our flexible staffing and expert talent outsourcing solutions.",
          image: {
            src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyZXNvdXJjZSUyMG1hbmFnZW1lbnR8ZW58MHx8fHwxNzQ4NDAzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "Abstract image of resource and talent management",
            hint: "resource management"
          }
        },
        {
          title: "Streamline Your Recruitment Process",
          description: "Our Recruitment Process Outsourcing (RPO) finds the best talent while you focus on your core business.",
          image: {
            src: "https://images.unsplash.com/photo-1552960562-bab847650a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyZWNydWl0bWVudCUyMHN0cmF0ZWd5fGVufDB8fHx8fDE3NDg0MDM2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
            alt: "A strategic diagram for recruitment",
            hint: "recruitment strategy"
          }
        }
      ]
    },
    details: [
      {
        slug: "it-staffing",
        title: "IT Staff Augmentation",
        description: "Access our pool of vetted IT professionals, including developers, designers, and project managers, to supplement your existing team for short-term or long-term projects.",
        backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHdlYnNpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        slug: "bpo-services",
        title: "BPO Services",
        description: "Outsource your business processes to us. We offer reliable and cost-effective solutions for customer support, data entry, and back-office operations.",
        backgroundImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyZXNvdXJjZSUyMG1hbmFnZW1lbnR8ZW58MHx8fHwxNzQ4NDAzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        slug: "rpo-services",
        title: "Recruitment Process Outsourcing (RPO)",
        description: "We manage your entire recruitment lifecycle, from sourcing and screening to onboarding, allowing you to focus on your core business while we find the best talent for you.",
        backgroundImage: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyZWNydWl0bWVudHxlbnwwfHx8fDE3NDg0MDM2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      }
    ]
  }
];
