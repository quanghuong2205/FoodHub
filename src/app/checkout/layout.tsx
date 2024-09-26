import Mainlayout from '@/layouts/main-layout';

function Layout({ children }: { children: React.ReactNode }) {
  return <Mainlayout shouldHiddenHeader>{children}</Mainlayout>;
}

export default Layout;
