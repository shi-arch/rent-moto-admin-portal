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
    title: <HeaderCell title="Image" />,
    dataIndex: 'image',
    key: 'image',
    width: 500,
    render: (_: string, row: ProductType) => (
      <AvatarCard
        src={row.url}
        avatarProps={{
          name: row.myLocation,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="City Location" />,
    dataIndex: 'myLocation',
    key: 'myLocation',
    width: 150,
    render: (myLocation: string) => <Text className="text-sm">{myLocation}</Text>,
  },
  {
    title: <HeaderCell title="Sublocation 1" />,
    dataIndex: 'subLocation1',
    key: 'subLocation1',
    width: 150,
    render: (subLocation1: string) => <Text className="text-sm">{subLocation1}</Text>,
  },
  {
    title: <HeaderCell title="Sublocation 2" />,
    dataIndex: 'subLocation2',
    key: 'subLocation2',
    width: 150,
    render: (subLocation2: string) => <Text className="text-sm">{subLocation2}</Text>,
  },
  {
    title: <HeaderCell title="Sublocation 3" />,
    dataIndex: 'subLocation3',
    key: 'subLocation3',
    width: 150,
    render: (subLocation3: string) => <Text className="text-sm">{subLocation3}</Text>,
  },
  {
    title: <HeaderCell title="Sublocation 4" />,
    dataIndex: 'subLocation4',
    key: 'subLocation4',
    width: 150,
    render: (subLocation4: string) => <Text className="text-sm">{subLocation4}</Text>,
  }
];
