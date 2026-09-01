import { getSiteContent } from '@/lib/content';
import { OurWork } from '@/components/sections/our-work';

export async function DynamicOurWork() {
  const content = await getSiteContent();
  return <OurWork content={content.ourWork} />;
}
