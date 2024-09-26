import Image from 'next/legacy/image';
import sidebarStyles from './sidebar.module.scss';
import classNames from 'classnames';
import { Space } from 'antd';
import Link from 'next/link';

export interface ISidebarItemProps {
  title: string;
  iconUrl: string;
  path: string;
}

interface IItemProps extends ISidebarItemProps {
  isActive: boolean;
  handleCloseSidebar?: () => void;
}

function SidebarItem({ title, iconUrl, path, isActive, handleCloseSidebar }: IItemProps) {
  return (
    <li className={classNames(sidebarStyles.item, isActive && sidebarStyles['item--active'])}>
      <Link
        href={path}
        onClick={() => handleCloseSidebar?.()}>
        <Space
          size={16}
          align='center'>
          <div className={sidebarStyles['item-icon']}>
            <Image
              src={iconUrl}
              alt={title}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <span className={sidebarStyles['item-title']}>{title}</span>
        </Space>
      </Link>
    </li>
  );
}

export default SidebarItem;
