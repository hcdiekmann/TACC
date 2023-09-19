import { Container, Title, Text, Avatar, Flex } from '@mantine/core';
import { useAuth } from '../context/AuthContext';

export const AccountPage = (): JSX.Element => {
  const { profile } = useAuth();
  return (
    <Container p={10}>
      <Title mb={15} order={1}>
        Account
      </Title>
      <Flex direction='column' align='flex-start'>
        <Avatar src={profile?.images[1].url} size={120} radius={120} />
        <Title order={2}>{profile?.display_name}</Title>
        <Text>{profile?.email}</Text>
      </Flex>
    </Container>
  );
};
