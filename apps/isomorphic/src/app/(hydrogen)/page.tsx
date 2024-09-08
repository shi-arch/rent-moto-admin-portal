import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import ProductsPage from './products/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <ProductsPage />;
}
