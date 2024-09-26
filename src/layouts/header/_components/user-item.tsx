import { Dropdown } from 'antd';
import headerStyles from '../header.module.scss';
import Image from 'next/legacy/image';
import type { MenuProps } from 'antd';
import SignoutButton from './signout-button';
import Link from 'next/link';
import classNames from 'classnames';

function UserItem() {
  const items: MenuProps['items'] = [
    {
      label: <Link href='/profile'>Thông tin cá nhân</Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <SignoutButton />,
      key: '2',
    },
  ];

  return (
    <div className={classNames(headerStyles.user, 'd-md-none')}>
      <Dropdown
        arrow
        menu={{ items, className: headerStyles['user-dropdown'] }}
        trigger={['click']}>
        <button className={headerStyles['user-avatar']}>
          <Image
            src='/icon/profile.png'
            alt='user'
            layout='fill'
            objectFit='contain'
          />
        </button>
      </Dropdown>
    </div>
  );
}

export default UserItem;
