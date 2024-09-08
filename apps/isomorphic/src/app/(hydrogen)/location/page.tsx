import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/shared/ecommerce/product/location-list/table';
import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';

export const metadata = {
  ...metaObject('Products'),
};

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.products,
      name: 'Products',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductsPage() {
  const productsDataArr = [
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" }, 
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
    {myLocation: "Banglore", subLocation1: "Koramangla", subLocation2: "Koramangla", subLocation3: "Koramangla", subLocation4: "Koramangla", url:"https://gobikes-prod-public.s3.ap-south-1.amazonaws.com/uploads/admin/site/c9c5abc1-7f92-4135-8b6b-64ae424f77d6.webp" },
  ]
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
          <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
        </div>
      </PageHeader>

      <ProductsTable data={productsDataArr} />
    </>
  );
}
