import { Group, Stack, Title, Text, Container } from '@mantine/core';
import { ColorSchemeBtn } from '../components/ColorSchemeBtn';

export const SettingsPage = (): JSX.Element => {
  return (
    <Container p={10}>
      <Title order={1}>Settings</Title>
      <Stack p={10} spacing='md'>
        <Group spacing='xl'>
          <Text>Color scheme</Text>
          <ColorSchemeBtn />
        </Group>
      </Stack>
    </Container>
  );
};
