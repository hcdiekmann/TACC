import { Button, Container, Group, Paper, Title, rem } from '@mantine/core';
import { IconBrandSpotify } from '@tabler/icons-react';

export const LoginPage = () => {
  return (
    <Container size={420} my={40}>
      <Title
        align='center'
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to TACC!
      </Title>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <Group grow mb='md' mt='md'>
          <Button
            component='a'
            href='http://localhost:5000/auth/login'
            leftIcon={<IconBrandSpotify size={rem(32)} />}
            variant='gradient'
            gradient={{ from: '#00993F', to: '#1ED760', deg: 105 }}
          >
            Login with Spotify
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
