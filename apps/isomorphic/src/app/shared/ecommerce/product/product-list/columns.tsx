'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app/shared/table';
import {
  Badge,
  Text,
  Checkbox,
  Progressbar,
  Tooltip,
  ActionIcon,
} from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@components/icons/eye';
import PencilIcon from '@components/icons/pencil';
import AvatarCard from '@ui/avatar-card';
import { ProductType } from '@/data/products-data';
import { PiStarFill } from 'react-icons/pi';
import DeletePopover from '@/app/shared/delete-popover';

            

// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

// get stock status
function getStockStatus(status: number) {
  if (status === 0) {
    return (
      <>
        <Progressbar
          value={status}
          color="danger"
          label={'out of stock'}
          className="h-1.5 w-24 bg-red/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">out of stock </Text>
      </>
    );
  } else if (status <= 20) {
    return (
      <>
        <Progressbar
          value={status}
          color="warning"
          label={'low stock'}
          className="h-1.5 w-24 bg-orange/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} low stock
        </Text>
      </>
    );
  } else {
    return (
      <>
        <Progressbar
          value={status}
          color="success"
          label={'stock available'}
          className="h-1.5 w-24 bg-green/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} in stock
        </Text>
      </>
    );
  }
}

// get rating calculation
function getRating(rating: number[]) {
  let totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  let review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      <span className="me-1 shrink-0">{review.toFixed(1)}</span>
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="w-4 fill-orange text-orange" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}{' '}
      <span className="ms-1 shrink-0">({totalRating})</span>
    </div>
  );
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'product',
    key: 'product',
    width: 500,
    render: (_: string, row: ProductType) => (
      <AvatarCard
        src={row.url}
        name={row.name}
        avatarProps={{
          name: row.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Brand" />,
    dataIndex: 'brand',
    key: 'brand',
    width: 150,
    render: (brand: string) => <Text className="text-sm">{brand}</Text>,
  },
  {
    title: <HeaderCell title="Vehicle Number" />,
    dataIndex: 'vehicleNumber',
    key: 'vehicleNumber',
    width: 150,
    render: (vehicleNumber: string) => <Text className="text-sm">{vehicleNumber}</Text>,
  },
  {
    title: <HeaderCell title="City Location" />,
    dataIndex: 'location',
    key: 'location',
    width: 150,
    render: (location: string) => <Text className="text-sm">{location}</Text>,
  },
  {
    title: <HeaderCell title="Pickup Location" />,
    dataIndex: 'pickupLocation',
    key: 'pickupLocation',
    width: 150,
    render: (pickupLocation: string) => <Text className="text-sm">{pickupLocation}</Text>,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (status: string) => <Text className="text-sm">{status}</Text>,
  },
  {
    title: <HeaderCell title="Transmission Type" />,
    dataIndex: 'transmissionType',
    key: 'transmissionType',
    width: 150,
    render: (transmissionType: string) => <Text className="text-sm">{transmissionType}</Text>,
  },
  {
    title: <HeaderCell title="Distance Limit" />,
    dataIndex: 'distanceLimit',
    key: 'distanceLimit',
    width: 150,
    render: (distanceLimit: string) => <Text className="text-sm">{distanceLimit}</Text>,
  },
  {
    title: <HeaderCell title="Access Charge/Km" />,
    dataIndex: 'accessChargePerKm',
    key: 'accessChargePerKm',
    width: 150,
    render: (accessChargePerKm: string) => <Text className="text-sm">{accessChargePerKm}</Text>,
  },
  {
    title: <HeaderCell title="price / day" />,
    dataIndex: 'pricePerday',
    key: 'pricePerday',
    width: 150,
    render: (pricePerday: string) => <Text className="text-sm">{pricePerday}</Text>,
  }
];
