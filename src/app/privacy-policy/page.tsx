import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Brolytics Technologies',
  description: 'Privacy Policy for Brolytics Technologies. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 2026";

  return (
    <main className="min-h-screen bg-silver-50">
      <Header variant="light" />
      
      {/* ── Hero Section ── */}
      <section className="relative pt-44 pb-16 md:pt-52 md:pb-24 bg-white overflow-hidden border-b border-silver-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-50 bg-[linear-gradient(hsl(214_32%_91%/.35)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.35)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-silver-900 tracking-tight mb-6">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg text-silver-500 max-w-2xl mx-auto">
            At Brolytics Technologies, we are committed to protecting your privacy and ensuring your data is secure.
          </p>
          <p className="text-sm text-silver-400 mt-6 font-medium">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="prose prose-silver max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-12 prose-p:text-silver-600 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-silver-600">
            
            <p>
              Welcome to Brolytics Technologies. This Privacy Policy outlines how we collect, use, process, and protect your personal information when you use our website or engage with our services (including mobile app development, website development, custom software, graphics design, SEO, and AI services).
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information to provide better services to our clients. The types of personal information we may collect include:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Your name, email address, phone number, and company name when you fill out our contact forms or book a meeting.</li>
              <li><strong>Project Data:</strong> Information related to your project requirements, assets, and business details necessary for us to deliver our services.</li>
              <li><strong>Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate our website. This may include IP address, browser type, operating system, and browsing behavior.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect for various business and commercial purposes, including:
            </p>
            <ul>
              <li>To provide, operate, and maintain our website and services.</li>
              <li>To communicate with you regarding your project, inquiries, or customer support requests.</li>
              <li>To improve, personalize, and expand our services and website user experience.</li>
              <li>To send you administrative information, marketing communications, or promotional offers (which you can opt out of at any time).</li>
            </ul>

            <h2>3. Data Sharing & Security</h2>
            <p>
              We prioritize your data security. <strong>We do not sell, trade, or rent your personal identification information to others.</strong> We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
            </p>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our services (e.g., hosting providers, analytics tools, payment processors). These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete the data we hold about you. If you wish to exercise any of these rights, please contact us.
            </p>

            <h2>6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:brolyticsteechnologies@gmail.com">brolyticsteechnologies@gmail.com</a><br />
              <strong>Brolytics Technologies</strong>
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
