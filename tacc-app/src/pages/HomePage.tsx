import { Container, Title } from '@mantine/core';
import React from 'react';

export const HomePage = (): JSX.Element => {
  const greeting = getGreeting();
  const userName = 'Christian';

  return (
    <Container p={10}>
      <Title order={1}>{`${greeting}, ${userName}!`}</Title>
    </Container>
  );
};

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};
