import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'AI Solutions & LLM Agent Engineering Services | Brolytics Technologies',
  description:
    'Harness the power of Artificial Intelligence with Brolytics Technologies. We build custom LLM agents, intelligent RAG pipelines, automated workflows, and enterprise AI assistants.',
  alternates: {
    canonical: '/services/ai-services',
  },
  openGraph: {
    title: 'AI Solutions & LLM Agent Engineering Services | Brolytics Technologies',
    description:
      'Enterprise-ready generative AI, custom fine-tuning, retrieval-augmented generation (RAG), and autonomous AI agents.',
    url: 'https://brolyticstechnologies.com/services/ai-services',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'How do you prevent hallucinations in enterprise AI implementations?',
    answer:
      'We utilize state-of-the-art Retrieval-Augmented Generation (RAG) pipelines backed by vector databases (Pinecone, pgvector) with grounded semantic search, strict system guardrails, and deterministic evaluation loops.',
  },
  {
    question: 'Can you integrate AI models with our proprietary company data securely?',
    answer:
      'Yes, we deploy private, VPC-isolated LLM instances and strictly enforce SOC2-compliant data handling policies where client proprietary data is never used to train public models.',
  },
  {
    question: 'What AI tools and LLM frameworks do you specialize in?',
    answer:
      'Our engineers specialize in OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini, LangChain, LlamaIndex, HuggingFace, and custom fine-tuning pipelines using PyTorch and FastAPI.',
  },
];

export default function AiServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="AI Solutions & LLM Agent Development"
        description="Applied generative AI, autonomous agentic workflows, RAG search systems, and predictive machine learning models."
        serviceType="ArtificialIntelligenceDevelopment"
        url="/services/ai-services"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/#services' },
          { name: 'AI Services', item: '/services/ai-services' },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      {children}
    </>
  );
}
