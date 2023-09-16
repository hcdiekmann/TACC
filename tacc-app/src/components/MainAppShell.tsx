import { AppShell, Aside } from '@mantine/core';
import { MainNavbar } from './MainNavbar';

interface Props {
  children: JSX.Element;
  sidebar: JSX.Element;
}

export const MainAppShell = (props: Props) => {
  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      // header={<Header height={0}>{/* Header content */}</Header>}
      navbar={<MainNavbar />}
      // aside={
      //   <Aside p='md' hiddenBreakpoint='sm' width={{ md: 250, lg: 350 }}>
      //     {props.sidebar}
      //   </Aside>
      // }
    >
      {props.children}
    </AppShell>
  );
};
