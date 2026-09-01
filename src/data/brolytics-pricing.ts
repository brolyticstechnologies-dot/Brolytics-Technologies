// ============================================================
// BROLYTICS TECHNOLOGIES — COMPLETE PRICING DATA
// Source: Founder's official pricing document
// Rule: This data is displayed ONLY on /pricing — never on service pages
// ============================================================

export interface PricingRow {
  item: string;
  price: string;
  note?: string;
}

export interface PricingSection {
  id: string;
  title: string;
  subtitle?: string;
  tables: PricingTable[];
  lists?: PricingList[];
}

export interface PricingTable {
  heading?: string;
  note?: string;
  rows: PricingRow[];
}

export interface PricingList {
  heading?: string;
  items: string[];
}

// ── Category tabs ──────────────────────────────────────────
export interface PricingCategory {
  id: string;
  label: string;
  icon: string;
  sections: PricingSection[];
}

export const pricingCategories: PricingCategory[] = [

  // ── 1. WEBSITE DEVELOPMENT ──────────────────────────────
  {
    id: "website",
    label: "Website Development",
    icon: "Globe",
    sections: [
      {
        id: "static-website",
        title: "Static Website",
        subtitle: "Suitable for startups, company profiles, portfolios, consultants, small businesses, professionals and landing pages.",
        tables: [
          {
            heading: "Pricing",
            rows: [
              { item: "1 Page Landing Page", price: "₹8,000" },
              { item: "3 Pages", price: "₹12,000" },
              { item: "5 Pages", price: "₹15,000" },
              { item: "7 Pages", price: "₹20,000" },
              { item: "10 Pages", price: "₹25,000" },
              { item: "Additional Page", price: "₹2,000/page" },
            ],
          },
        ],
        lists: [
          {
            heading: "Includes",
            items: [
              "Responsive design",
              "Mobile compatibility",
              "Contact form",
              "WhatsApp integration",
              "Google Maps",
              "Social media links",
              "Basic SEO",
              "SSL configuration",
              "Deployment",
            ],
          },
        ],
      },
      {
        id: "dynamic-cms-website",
        title: "Dynamic / CMS Website",
        subtitle: "Suitable for companies that want to manage their website through an admin panel.",
        tables: [
          {
            heading: "Pricing",
            rows: [
              { item: "Basic Dynamic Website", price: "₹30,000" },
              { item: "Standard Business Website", price: "₹40,000" },
              { item: "Advanced Business Website", price: "₹60,000" },
              { item: "Premium Corporate Website", price: "₹80,000+" },
              { item: "Additional Dynamic Page", price: "₹3,000/page" },
            ],
          },
        ],
        lists: [
          {
            heading: "Possible Features",
            items: [
              "Admin panel", "Database", "Dynamic pages", "Blog", "News",
              "Gallery", "Team management", "Enquiry management", "Banner management",
              "Forms", "User management", "SEO management", "Content management",
            ],
          },
        ],
      },
      {
        id: "page-wise",
        title: "Page-wise Development",
        subtitle: "Note: Complex functionality, APIs, database operations and business logic are quoted separately.",
        tables: [
          {
            rows: [
              { item: "Home", price: "₹5,000" },
              { item: "About", price: "₹2,000" },
              { item: "Services", price: "₹2,000" },
              { item: "Product", price: "₹2,500" },
              { item: "Contact", price: "₹2,000" },
              { item: "Portfolio", price: "₹3,000" },
              { item: "Gallery", price: "₹3,000" },
              { item: "Blog Listing", price: "₹3,000" },
              { item: "Blog Details", price: "₹2,000" },
              { item: "Team", price: "₹2,000" },
              { item: "FAQ", price: "₹1,500" },
              { item: "Career", price: "₹3,000" },
              { item: "Pricing", price: "₹2,000" },
              { item: "Login / Register", price: "₹4,000" },
              { item: "User Dashboard", price: "₹8,000+" },
              { item: "Admin Dashboard", price: "₹10,000+" },
            ],
          },
        ],
      },
    ],
  },

  // ── 2. E-COMMERCE ───────────────────────────────────────
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "ShoppingCart",
    sections: [
      {
        id: "ecommerce-basic",
        title: "Basic E-Commerce",
        tables: [
          {
            heading: "Starting ₹60,000",
            rows: [],
          },
        ],
        lists: [
          {
            heading: "Includes",
            items: [
              "Products", "Categories", "Product details", "Search", "Cart",
              "Wishlist", "Customer account", "Checkout", "Orders",
              "Payment gateway", "Coupon", "Admin panel",
            ],
          },
        ],
      },
      {
        id: "ecommerce-advanced",
        title: "Advanced E-Commerce",
        tables: [
          {
            heading: "₹1,00,000 – ₹2,50,000+",
            rows: [],
          },
        ],
        lists: [
          {
            heading: "Additional possibilities",
            items: [
              "Inventory", "Product variations", "GST invoice", "Shipping API",
              "Returns / refunds", "Reviews", "Multiple payment methods",
              "Advanced reports", "Customer wallet",
            ],
          },
        ],
      },
      {
        id: "ecommerce-marketplace",
        title: "Marketplace",
        tables: [
          {
            heading: "₹2,00,000 – ₹6,00,000+",
            rows: [],
          },
        ],
        lists: [
          {
            heading: "Includes",
            items: [
              "Customer panel", "Vendor panel", "Admin panel", "Vendor onboarding",
              "Commission", "Product management", "Order management",
              "Payment settlement", "Reports", "Reviews", "Shipping integration",
            ],
          },
        ],
      },
      {
        id: "admin-panel",
        title: "Admin Panel & Dashboard",
        tables: [
          {
            heading: "Admin Panel",
            rows: [
              { item: "Basic Admin Panel", price: "₹20,000" },
              { item: "Standard Admin Panel", price: "₹35,000" },
              { item: "Advanced Admin Panel", price: "₹60,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Possible Modules",
            items: [
              "Dashboard", "Users", "Roles", "Permissions", "Reports", "Analytics",
              "Content", "Notifications", "Settings", "Export", "Logs", "Activity monitoring",
            ],
          },
        ],
      },
    ],
  },

  // ── 3. MOBILE APPS ──────────────────────────────────────
  {
    id: "mobile",
    label: "Mobile Apps",
    icon: "Smartphone",
    sections: [
      {
        id: "android",
        title: "Android Application Development",
        tables: [
          {
            rows: [
              { item: "Basic Android App", price: "Starting ₹60,000" },
              { item: "Standard Android App", price: "Starting ₹1,00,000" },
              { item: "Advanced Android App", price: "₹1,50,000 – ₹3,00,000+" },
              { item: "Complex Android Product", price: "₹3,00,000 – ₹10,00,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Suitable for",
            items: [
              "Business apps", "Education", "E-commerce", "Booking", "Delivery",
              "CRM", "Social applications", "Utility apps", "Enterprise applications",
            ],
          },
        ],
      },
      {
        id: "ios",
        title: "iOS Application Development",
        tables: [
          {
            rows: [
              { item: "Basic iOS App", price: "Starting ₹80,000" },
              { item: "Standard iOS App", price: "Starting ₹1,25,000" },
              { item: "Advanced iOS App", price: "₹2,00,000 – ₹4,00,000+" },
              { item: "Complex iOS Product", price: "₹4,00,000 – ₹10,00,000+" },
            ],
          },
        ],
      },
      {
        id: "cross-platform",
        title: "Android + iOS Cross-Platform",
        subtitle: "Using technologies such as Flutter or React Native. Final pricing depends on screens, backend, APIs, integrations and business logic.",
        tables: [
          {
            rows: [
              { item: "Basic Mobile Product", price: "Starting ₹1,00,000" },
              { item: "Standard App", price: "Starting ₹1,50,000" },
              { item: "Advanced App", price: "₹2,50,000 – ₹5,00,000+" },
              { item: "Complex Product", price: "₹5,00,000 – ₹15,00,000+" },
            ],
          },
        ],
      },
      {
        id: "mobile-features",
        title: "Mobile App Features (Add-ons)",
        tables: [
          {
            rows: [
              { item: "Login / Register", price: "₹5,000" },
              { item: "OTP Authentication", price: "₹8,000" },
              { item: "Google Login", price: "₹5,000" },
              { item: "Apple Login", price: "₹7,500" },
              { item: "User Profile", price: "₹5,000" },
              { item: "Push Notifications", price: "₹7,500" },
              { item: "Firebase Integration", price: "₹10,000" },
              { item: "REST API Integration", price: "₹10,000+" },
              { item: "Payment Gateway", price: "₹10,000" },
              { item: "Subscription", price: "₹20,000+" },
              { item: "Google Maps", price: "₹10,000" },
              { item: "Live Location", price: "₹15,000+" },
              { item: "QR Scanner", price: "₹7,500" },
              { item: "QR Generator", price: "₹5,000" },
              { item: "Chat", price: "₹20,000+" },
              { item: "Real-Time Chat", price: "₹30,000+" },
              { item: "Video Calling", price: "₹40,000+" },
              { item: "Audio Calling", price: "₹30,000+" },
              { item: "Booking", price: "₹20,000+" },
              { item: "Rating & Review", price: "₹7,500" },
              { item: "Referral System", price: "₹15,000" },
              { item: "Wallet", price: "₹20,000+" },
              { item: "Coupon System", price: "₹10,000" },
              { item: "Advanced Admin Panel", price: "₹40,000+" },
            ],
          },
        ],
      },
      {
        id: "mobile-uiux",
        title: "Mobile App UI/UX Design",
        tables: [
          {
            rows: [
              { item: "Basic Mobile UI/UX", price: "₹15,000" },
              { item: "Standard UI/UX", price: "₹30,000" },
              { item: "Advanced UI/UX", price: "₹50,000+" },
              { item: "Complete Product Design", price: "₹75,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "May Include",
            items: [
              "User flow", "Wireframes", "App screens", "Design system",
              "Components", "Prototype", "Responsive layouts",
            ],
          },
        ],
      },
    ],
  },

  // ── 4. CUSTOM SOFTWARE / ERP / CRM / SAAS ───────────────
  {
    id: "software",
    label: "Custom Software & ERP",
    icon: "Code",
    sections: [
      {
        id: "custom-web-app",
        title: "Custom Web Application",
        subtitle: "Custom web applications are priced according to modules and business workflows.",
        tables: [
          {
            rows: [
              { item: "Basic Web Application", price: "₹75,000" },
              { item: "Business Management System", price: "₹1,00,000" },
              { item: "CRM", price: "₹1,25,000" },
              { item: "HRMS", price: "₹1,25,000" },
              { item: "Inventory System", price: "₹1,00,000" },
              { item: "Billing Software", price: "₹75,000" },
              { item: "Accounting System", price: "₹1,50,000" },
              { item: "ERP", price: "₹2,50,000+" },
              { item: "Advanced ERP", price: "₹5,00,000+" },
              { item: "SaaS Platform", price: "₹3,00,000+" },
              { item: "Marketplace", price: "₹2,00,000+" },
              { item: "Enterprise Application", price: "₹5,00,000+" },
            ],
          },
        ],
      },
      {
        id: "custom-software",
        title: "Custom Software Development",
        tables: [
          {
            rows: [
              { item: "Basic Business Software", price: "Starting ₹75,000" },
              { item: "Standard Business Software", price: "Starting ₹1,00,000" },
              { item: "Advanced Business Software", price: "Starting ₹2,00,000" },
              { item: "Enterprise Software", price: "Starting ₹5,00,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Possible Modules",
            items: [
              "Authentication", "Users", "Employees", "Customers", "Vendors",
              "Products", "Inventory", "Purchase", "Sales", "Billing",
              "Expenses", "Payments", "Reports", "Notifications",
              "Roles", "Permissions", "Audit logs", "API", "Dashboard",
            ],
          },
        ],
      },
      {
        id: "software-modules",
        title: "Software Module Pricing",
        tables: [
          {
            rows: [
              { item: "Authentication", price: "₹10,000" },
              { item: "User Management", price: "₹10,000" },
              { item: "Roles & Permissions", price: "₹10,000" },
              { item: "Dashboard", price: "₹15,000" },
              { item: "Customer Management", price: "₹15,000" },
              { item: "Employee Management", price: "₹15,000" },
              { item: "Product Management", price: "₹15,000" },
              { item: "Inventory", price: "₹20,000" },
              { item: "Purchase", price: "₹20,000" },
              { item: "Sales", price: "₹20,000" },
              { item: "Invoice", price: "₹15,000" },
              { item: "Expenses", price: "₹10,000" },
              { item: "Payments", price: "₹15,000" },
              { item: "Reports", price: "₹15,000" },
              { item: "Advanced Reports", price: "₹30,000+" },
              { item: "Notifications", price: "₹10,000" },
              { item: "File Management", price: "₹10,000" },
              { item: "Document Management", price: "₹15,000" },
              { item: "Audit Logs", price: "₹15,000" },
              { item: "Multi-Branch", price: "₹30,000+" },
              { item: "Multi-Company", price: "₹40,000+" },
              { item: "API Integration", price: "₹10,000+" },
              { item: "Third-Party Integration", price: "₹10,000+" },
            ],
          },
        ],
      },
      {
        id: "crm",
        title: "CRM Development",
        tables: [
          {
            rows: [
              { item: "Basic CRM", price: "Starting ₹1,25,000" },
              { item: "Advanced CRM", price: "₹2,50,000 – ₹6,00,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Possible Modules",
            items: [
              "Lead management", "Customer management", "Follow-ups", "Sales pipeline",
              "Tasks", "Reminders", "Calls", "Enquiries", "Sales reports",
              "Employee management", "Permissions", "Notifications",
            ],
          },
        ],
      },
      {
        id: "erp",
        title: "ERP Development",
        tables: [
          {
            rows: [
              { item: "Basic ERP", price: "Starting ₹2,50,000" },
              { item: "Advanced ERP", price: "₹5,00,000 – ₹15,00,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Possible Modules",
            items: [
              "HR", "Payroll", "Attendance", "Production", "Raw material", "Wastage",
              "Purchase", "Sales", "Inventory", "Accounting", "GST", "Invoicing",
              "CRM", "Customer portal", "Vendor portal", "Employee portal",
              "Multi-branch", "Multi-company", "Analytics",
            ],
          },
        ],
      },
      {
        id: "saas",
        title: "SaaS Product Development",
        tables: [
          {
            rows: [
              { item: "SaaS MVP", price: "Starting ₹3,00,000" },
              { item: "Standard SaaS", price: "₹5,00,000 – ₹12,00,000+" },
              { item: "Advanced SaaS", price: "₹10,00,000 – ₹25,00,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Possible Features",
            items: [
              "Multi-tenant architecture", "Organizations", "Users", "Subscription plans",
              "Billing", "Payment gateway", "Usage limits", "Admin", "User dashboard",
              "Analytics", "API", "Notifications", "Role permissions",
            ],
          },
        ],
      },
      {
        id: "industry-specific",
        title: "Industry-Specific Software",
        subtitle: "Final cost depends on modules and integrations.",
        tables: [
          {
            rows: [
              { item: "Education / Institute Management", price: "Starting ₹1,50,000" },
              { item: "Real Estate CRM", price: "Starting ₹1,25,000" },
              { item: "Hospital / Clinic Management", price: "Starting ₹1,25,000" },
              { item: "Restaurant Management", price: "Starting ₹75,000" },
              { item: "POS + Inventory", price: "Starting ₹75,000" },
              { item: "Booking Platform", price: "Starting ₹40,000" },
              { item: "Delivery Platform", price: "Starting ₹1,50,000" },
              { item: "Social / Community Platform", price: "Starting ₹2,00,000" },
              { item: "Marketplace", price: "Starting ₹2,00,000" },
            ],
          },
        ],
      },
    ],
  },

  // ── 5. BACKEND / API / DATABASE ─────────────────────────
  {
    id: "backend",
    label: "Backend, API & DB",
    icon: "Server",
    sections: [
      {
        id: "backend-dev",
        title: "Backend Development",
        tables: [
          {
            rows: [
              { item: "Basic Backend", price: "₹25,000" },
              { item: "REST API Backend", price: "₹30,000" },
              { item: "Standard Backend", price: "₹50,000" },
              { item: "Advanced Backend", price: "₹1,00,000+" },
              { item: "Enterprise Backend", price: "₹2,50,000+" },
              { item: "High-Scale Backend", price: "₹5,00,000+" },
            ],
          },
        ],
      },
      {
        id: "api-dev",
        title: "API Development",
        tables: [
          {
            rows: [
              { item: "Basic REST API", price: "₹20,000" },
              { item: "Standard API", price: "₹40,000" },
              { item: "Advanced API Platform", price: "₹1,00,000+" },
              { item: "Enterprise API", price: "₹2,50,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Services",
            items: [
              "REST API", "Authentication", "Authorization", "CRUD", "File upload",
              "Payment API", "Notification API", "Third-party APIs", "Webhooks",
              "API documentation", "Rate limiting", "API security",
            ],
          },
        ],
      },
      {
        id: "database-dev",
        title: "Database Development",
        tables: [
          {
            rows: [
              { item: "Database Design", price: "₹10,000" },
              { item: "Database Optimization", price: "₹15,000" },
              { item: "Database Migration", price: "₹15,000" },
              { item: "Advanced Architecture", price: "₹30,000+" },
            ],
          },
        ],
      },
      {
        id: "payment-gateway",
        title: "Payment Gateway Integration",
        tables: [
          {
            rows: [
              { item: "Payment Gateway Integration", price: "Starting ₹10,000" },
            ],
          },
        ],
        lists: [
          {
            heading: "Supported Gateways",
            items: ["Razorpay", "Cashfree", "PayU", "Stripe", "Other supported providers"],
          },
          {
            heading: "Note",
            items: ["Gateway transaction charges and merchant fees are separate."],
          },
        ],
      },
      {
        id: "sms-otp-email",
        title: "SMS / OTP / Email / WhatsApp",
        tables: [
          {
            rows: [
              { item: "SMS Integration", price: "₹7,500" },
              { item: "OTP System", price: "₹8,000" },
              { item: "SMTP Setup", price: "₹5,000" },
              { item: "Transactional Email", price: "₹10,000" },
              { item: "Email Automation", price: "₹20,000+" },
              { item: "WhatsApp Integration", price: "₹10,000+" },
              { item: "WhatsApp Business / API Automation", price: "₹20,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Note",
            items: ["Third-party usage charges are separate."],
          },
        ],
      },
    ],
  },

  // ── 6. AI & AUTOMATION ──────────────────────────────────
  {
    id: "ai",
    label: "AI & Automation",
    icon: "Bot",
    sections: [
      {
        id: "ai-integration",
        title: "AI & Machine Learning",
        tables: [
          {
            rows: [
              { item: "AI Feature Integration", price: "Starting ₹25,000" },
              { item: "Advanced AI Product", price: "₹1,00,000 – ₹10,00,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Possible Solutions",
            items: [
              "AI Chatbot", "AI Assistant", "AI Search", "AI Recommendations",
              "AI Content Generation", "AI Document Processing", "AI Automation",
              "AI API integration", "AI-powered dashboards",
            ],
          },
          {
            heading: "Note",
            items: ["API / model / token / infrastructure costs are separate."],
          },
        ],
      },
      {
        id: "automation",
        title: "Automation & Business Process Automation",
        tables: [
          {
            rows: [
              { item: "Basic Automation", price: "₹15,000" },
              { item: "Business Automation", price: "₹30,000" },
              { item: "Advanced Workflow Automation", price: "₹75,000+" },
              { item: "Enterprise Automation", price: "₹2,00,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Examples",
            items: [
              "Lead automation", "Email automation", "Invoice automation",
              "Approval workflow", "Notifications", "Scheduled jobs",
              "Data synchronization", "Reports",
            ],
          },
        ],
      },
    ],
  },

  // ── 7. CLOUD, DEVOPS & SECURITY ─────────────────────────
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: "Cloud",
    sections: [
      {
        id: "cloud-devops",
        title: "Cloud & DevOps Services",
        tables: [
          {
            rows: [
              { item: "Website Deployment", price: "₹3,000" },
              { item: "Web App Deployment", price: "₹7,500" },
              { item: "Server Configuration", price: "₹10,000" },
              { item: "Cloud Deployment", price: "₹15,000" },
              { item: "Docker Deployment", price: "₹15,000" },
              { item: "CI/CD Setup", price: "₹15,000" },
              { item: "Advanced DevOps", price: "₹30,000+" },
              { item: "Kubernetes / Advanced Infrastructure", price: "₹50,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Note",
            items: ["Infrastructure charges are separate."],
          },
        ],
      },
      {
        id: "security",
        title: "Security Services",
        tables: [
          {
            rows: [
              { item: "Basic Security Review", price: "₹15,000" },
              { item: "Web Security Audit", price: "₹30,000" },
              { item: "Application Security Audit", price: "₹30,000+" },
              { item: "Advanced Security Assessment", price: "₹50,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Note",
            items: ["Security scope is finalized separately according to the application."],
          },
        ],
      },
      {
        id: "domain-hosting",
        title: "Domain, Hosting & Deployment",
        tables: [
          {
            rows: [
              { item: "Domain", price: "~₹800 – ₹2,500/year" },
              { item: "Shared Hosting", price: "~₹3,000 – ₹10,000/year" },
              { item: "VPS / Cloud", price: "~₹12,000/year onward" },
            ],
          },
        ],
        lists: [
          {
            heading: "Note",
            items: ["Actual third-party pricing depends on provider, plan and infrastructure."],
          },
        ],
      },
      {
        id: "app-store",
        title: "App Store & Play Store Deployment",
        tables: [
          {
            rows: [
              { item: "Google Play Store Deployment", price: "₹5,000" },
              { item: "Apple App Store Deployment", price: "₹10,000" },
              { item: "Store Listing Assistance", price: "₹5,000+" },
              { item: "Production Release Support", price: "₹5,000+" },
            ],
          },
        ],
        lists: [
          {
            heading: "Note",
            items: ["Developer account fees are separate."],
          },
        ],
      },
    ],
  },

  // ── 8. DESIGN, SEO & MARKETING ──────────────────────────
  {
    id: "design-marketing",
    label: "Design & Marketing",
    icon: "Palette",
    sections: [
      {
        id: "ui-ux-design",
        title: "UI/UX & Product Design",
        tables: [
          {
            rows: [
              { item: "Logo", price: "₹3,000" },
              { item: "Website UI/UX", price: "₹10,000" },
              { item: "Mobile UI/UX", price: "₹15,000" },
              { item: "Dashboard UI", price: "₹15,000" },
              { item: "Design System", price: "₹15,000" },
              { item: "Complete Product Design", price: "₹30,000+" },
              { item: "Premium Branding", price: "₹25,000+" },
            ],
          },
        ],
      },
      {
        id: "graphic-design",
        title: "Graphic Design & Branding",
        tables: [
          {
            rows: [
              { item: "Logo", price: "₹3,000" },
              { item: "Business Card", price: "₹1,000" },
              { item: "Letterhead", price: "₹1,000" },
              { item: "Social Media Creative", price: "₹500" },
              { item: "Poster", price: "₹1,000" },
              { item: "Brochure", price: "₹3,000" },
              { item: "Company Profile", price: "₹5,000" },
              { item: "Presentation", price: "₹3,000" },
              { item: "Brand Identity", price: "₹15,000+" },
            ],
          },
        ],
      },
      {
        id: "seo",
        title: "SEO Services",
        tables: [
          {
            rows: [
              { item: "Basic SEO Setup", price: "₹7,500" },
              { item: "Monthly SEO", price: "₹10,000/month" },
              { item: "Advanced SEO", price: "₹20,000 – ₹50,000+/month" },
            ],
          },
        ],
        lists: [
          {
            heading: "Services",
            items: [
              "Technical SEO", "On-page SEO", "Keyword research", "Sitemap",
              "Search Console", "Analytics", "Meta optimization", "Local SEO", "Reporting",
            ],
          },
          {
            heading: "Note",
            items: ["Advertising budget is separate."],
          },
        ],
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing",
        tables: [
          {
            rows: [
              { item: "Social Media Management", price: "₹8,000/month" },
              { item: "Social Media + Content", price: "₹15,000/month" },
              { item: "Digital Marketing", price: "₹25,000/month" },
              { item: "Advanced Marketing", price: "₹40,000+/month" },
            ],
          },
        ],
        lists: [
          {
            heading: "Services Can Include",
            items: [
              "Social media", "Creative design", "Content", "Campaign management",
              "Lead generation", "Analytics", "Reporting",
            ],
          },
          {
            heading: "Note",
            items: ["Ad spend is separate."],
          },
        ],
      },
    ],
  },

  // ── 9. TESTING, MIGRATION & SUPPORT ─────────────────────
  {
    id: "support",
    label: "Testing, Migration & Support",
    icon: "Wrench",
    sections: [
      {
        id: "testing",
        title: "Software Testing & QA",
        tables: [
          {
            rows: [
              { item: "Manual Testing", price: "₹10,000" },
              { item: "Web Application Testing", price: "₹20,000" },
              { item: "Mobile App Testing", price: "₹20,000" },
              { item: "API Testing", price: "₹15,000" },
              { item: "Complete QA", price: "₹30,000+" },
              { item: "Automation Testing", price: "₹30,000+" },
            ],
          },
        ],
      },
      {
        id: "migration",
        title: "Software Migration & Modernization",
        subtitle: "Final pricing depends on source code quality, application size, database size, compatibility and business logic.",
        tables: [
          {
            rows: [
              { item: "Small Website Migration", price: "₹15,000" },
              { item: "Framework Migration", price: "₹25,000+" },
              { item: "PHP / Laravel Migration", price: "₹25,000+" },
              { item: "Node / Python / Java / .NET Migration", price: "₹40,000+" },
              { item: "Frontend Framework Migration", price: "₹30,000+" },
              { item: "Mobile App Migration", price: "₹50,000+" },
              { item: "Database Migration", price: "₹15,000+" },
              { item: "Full Software Migration", price: "₹75,000+" },
              { item: "Legacy Modernization", price: "₹1,50,000+" },
              { item: "Enterprise Migration", price: "₹3,00,000+" },
            ],
          },
        ],
      },
      {
        id: "data-migration",
        title: "Data Migration & Import",
        tables: [
          {
            rows: [
              { item: "Excel / CSV Import", price: "₹5,000" },
              { item: "Basic Data Migration", price: "₹10,000" },
              { item: "Database Migration", price: "₹15,000" },
              { item: "Large Data Migration", price: "₹25,000+" },
              { item: "Enterprise Data Migration", price: "₹1,00,000+" },
            ],
          },
        ],
      },
      {
        id: "documentation",
        title: "Documentation & Source Code",
        tables: [
          {
            rows: [
              { item: "Technical Documentation", price: "₹10,000" },
              { item: "API Documentation", price: "₹7,500" },
              { item: "Complete Documentation", price: "₹20,000+" },
              { item: "Project Handover", price: "Included / As agreed" },
              { item: "Source Code Transfer", price: "As per agreement" },
            ],
          },
        ],
      },
      {
        id: "maintenance",
        title: "Maintenance & AMC",
        tables: [
          {
            rows: [
              { item: "Basic Website Maintenance", price: "₹1,500/month" },
              { item: "Business Website Maintenance", price: "₹3,000/month" },
              { item: "Web Application Maintenance", price: "₹5,000/month" },
              { item: "Mobile Application Maintenance", price: "₹5,000/month" },
              { item: "Software AMC", price: "₹15,000/year" },
              { item: "Advanced AMC", price: "₹30,000/year+" },
            ],
          },
        ],
        lists: [
          {
            heading: "AMC May Include",
            items: [
              "Bug fixing", "Minor updates", "Security updates", "Backup monitoring",
              "Database maintenance", "Server monitoring", "Technical support",
            ],
          },
          {
            heading: "Note",
            items: ["New modules and major features are charged separately."],
          },
        ],
      },
    ],
  },

  // ── 10. PROJECT PACKAGES ─────────────────────────────────
  {
    id: "packages",
    label: "Project Packages",
    icon: "Package",
    sections: [
      {
        id: "packages-overview",
        title: "Project Packages",
        subtitle: "Bundled packages for common project types. All prices are starting prices; final quote depends on scope.",
        tables: [
          {
            rows: [
              { item: "STARTER — Landing pages, portfolio, small websites, startup presence", price: "₹15,000 – ₹30,000" },
              { item: "BUSINESS — Business websites, corporate websites, CMS, lead generation", price: "₹35,000 – ₹75,000" },
              { item: "PROFESSIONAL — Advanced websites, e-commerce, booking, business applications", price: "₹75,000 – ₹2,00,000" },
              { item: "CUSTOM SOFTWARE — CRM, ERP, automation, custom web applications", price: "₹2,00,000 – ₹5,00,000+" },
              { item: "ENTERPRISE / PRODUCT — SaaS, enterprise ERP, large-scale platforms, multi-branch systems, complex products", price: "₹5,00,000+" },
            ],
          },
        ],
      },
      {
        id: "timeline",
        title: "Project Timeline",
        subtitle: "Final timeline is confirmed after scope approval.",
        tables: [
          {
            rows: [
              { item: "Landing Page", price: "3–7 Days" },
              { item: "Static Website", price: "5–15 Days" },
              { item: "Business Website", price: "10–30 Days" },
              { item: "E-Commerce", price: "20–60 Days" },
              { item: "Basic Mobile App", price: "30–60 Days" },
              { item: "Advanced Mobile App", price: "60–120+ Days" },
              { item: "CRM", price: "45–90+ Days" },
              { item: "ERP", price: "90–180+ Days" },
              { item: "SaaS", price: "120–240+ Days" },
            ],
          },
        ],
      },
      {
        id: "payment-terms",
        title: "Payment Terms",
        tables: [
          {
            rows: [
              { item: "Small Projects", price: "50% Advance + 50% Before Final Delivery" },
              { item: "Medium Projects", price: "40% Advance + 30% Milestone + 30% Final Delivery" },
              { item: "Large Projects", price: "30% Advance + Milestone-Based Payments" },
            ],
          },
        ],
        lists: [
          {
            heading: "Note",
            items: ["Development begins after project confirmation and advance payment."],
          },
        ],
      },
    ],
  },
];
