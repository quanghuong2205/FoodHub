import { Badge } from 'antd';
import Image from 'next/legacy/image';
import headerStyles from '../header.module.scss';
import { useViewportStore } from '@/zustand/viewport-store';

function Notify() {
  const { isMobile } = useViewportStore();

  return (
    <Badge
      size={!isMobile ? 'default' : 'small'}
      count={5}
      className={headerStyles['header-badge']}>
      <div className={headerStyles['header-icon']}>
        <Image
          src='/icon/bell.png'
          alt='user'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </Badge>
  );
}

export default Notify;
