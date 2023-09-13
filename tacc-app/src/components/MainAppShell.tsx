import { AppShell, useMantineTheme } from '@mantine/core';
import { MainNavbar } from './MainNavbar';

interface Props {
  children: JSX.Element;
}

export const MainAppShell = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <AppShell navbarOffsetBreakpoint='sm' navbar={<MainNavbar />}>
      {props.children}
    </AppShell>
  );
};
