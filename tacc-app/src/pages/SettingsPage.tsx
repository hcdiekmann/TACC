import { Group, Stack, Title, Text } from '@mantine/core';
import { ColorSchemeBtn } from '../components/ColorSchemeBtn';

export const SettingsPage = (): JSX.Element => {
  return (
    <>
      <Title order={1}>Settings</Title>
      <Stack p={10} spacing='md'>
        <Group spacing='xl'>
          <Text>Color scheme</Text>
          <ColorSchemeBtn />
        </Group>
      </Stack>
    </>
  );
};
