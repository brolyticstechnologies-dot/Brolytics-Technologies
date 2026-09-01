import { getSiteContent } from '@/lib/content';
import { OurClients } from '@/components/sections/our-clients';

export async function DynamicOurClients() {
  const content = await getSiteContent();
  return <OurClients content={content.ourClients} />;
}
