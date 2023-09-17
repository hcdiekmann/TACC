import { Stack, Title } from '@mantine/core';
import { useState, useEffect } from 'react';

export const DateTimeWidget = () => {
  const [time, setTime] = useState(getFormattedTime());
  const [date, setDate] = useState(getFormattedDate());

  function getFormattedTime() {
    const timeObj = new Date();
    return timeObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getFormattedDate() {
    const dateObj = new Date();
    const weekday = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(dateObj);
    const day = dateObj.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      dateObj
    );

    return `${weekday}, ${day} ${month}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
      setDate(getFormattedDate());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack spacing={0}>
      <Title order={1}>{time}</Title>
      <Title order={3}>{date}</Title>
    </Stack>
  );
};
