import { redirect } from 'next/navigation';
import { getAdminContent } from '@/lib/admin-session';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export default async function AdminPage() {
  const content = await getAdminContent();
  if (!content) redirect('/admin/login');

  return <AdminDashboard initialContent={content} />;
}
