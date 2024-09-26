import Mainlayout from '@/layouts/main-layout';

function Layout({ children }: { children: React.ReactNode }) {
  return <Mainlayout>{children}</Mainlayout>;
}

export default Layout;
