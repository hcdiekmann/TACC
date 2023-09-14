import { AppShell, Footer, Header, useMantineTheme } from '@mantine/core';
import { MainNavbar } from './MainNavbar';

interface Props {
  children: JSX.Element;
}

export const MainAppShell = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      // header={<Header height={0}>{/* Header content */}</Header>}
      navbar={<MainNavbar />}
      // footer={<Footer height={0}>{/* Footer content */}</Footer>}
    >
      {props.children}
    </AppShell>
  );
};
