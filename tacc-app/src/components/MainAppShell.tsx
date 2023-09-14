import { AppShell, Aside, MediaQuery } from '@mantine/core';
import { MainNavbar } from './MainNavbar';

interface Props {
  children: JSX.Element;
  sidebar: JSX.Element;
}

export const MainAppShell = (props: Props) => {
  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      // header={<Header height={0}>{/* Header content */}</Header>}
      navbar={<MainNavbar />}
      aside={
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
            {props.sidebar}
          </Aside>
        </MediaQuery>
      }
      // footer={<Footer height={0}>{/* Footer content */}</Footer>}
    >
      {props.children}
    </AppShell>
  );
};
