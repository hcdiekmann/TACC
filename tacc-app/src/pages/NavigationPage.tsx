import { Container, Title } from '@mantine/core';
import { Map } from '../components/Map';

export const NavigationPage = (): JSX.Element => {
  return (
    <Container p={10}>
      <Title mb={15} order={1}>
        Navigation
      </Title>
      <Map />
    </Container>
  );
};
