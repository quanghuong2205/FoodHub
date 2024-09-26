import { usePathname } from 'next/navigation';
import SidebarItem from './item';
import { items } from './items';
import sidebarStyles from './sidebar.module.scss';
import { useViewportStore } from '@/zustand/viewport-store';

function Sidebar({ handleCloseSidebar }: { handleCloseSidebar?: () => void }) {
  const { isMobile } = useViewportStore();
  const curPath = usePathname();

  return (
    <div className={sidebarStyles.sidebar}>
      {!isMobile && (
        <div className={sidebarStyles.logo}>
          <span>𝖖.𝖍𝖚𝖔𝖓𝖌.𝖘𝖍𝖔𝖕</span>
        </div>
      )}
      <ul className={sidebarStyles.list}>
        {items.map((item) => (
          <SidebarItem
            {...item}
            key={item.path}
            isActive={curPath === item.path}
            handleCloseSidebar={handleCloseSidebar}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
