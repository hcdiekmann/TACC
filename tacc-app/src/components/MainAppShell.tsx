import { AppShell, Aside, MediaQuery } from '@mantine/core';
import { MainNavbar } from './MainNavbar';

interface Props {
  children: JSX.Element;
  sidebar: JSX.Element;
}

export const MainAppShell = (props: Props) => {
  return (
    <AppShell
      navbar={<MainNavbar />}
      aside={
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
            {props.sidebar}
          </Aside>
        </MediaQuery>
      }
    >
      {props.children}
    </AppShell>
  );
};
