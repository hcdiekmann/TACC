import { Title } from '@mantine/core';
import { MainNavbar } from '../components/Navbar';

export const HomePage = (): JSX.Element => {
  return (
    <>
      <MainNavbar />
      <Title order={1}>Home</Title>
    </>
  );
};
