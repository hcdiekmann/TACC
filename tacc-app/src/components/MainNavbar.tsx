import { useState, useContext } from 'react';
import {
  createStyles,
  Navbar,
  Group,
  Image,
  getStylesRef,
  rem,
} from '@mantine/core';
import {
  IconHome,
  IconUser,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import { DataContext } from '../context/DataProvider';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor[10],
    }).background,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.15
      ),
      [`& .${getStylesRef('icon')}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const data = [
  { link: '', page: 'home', label: 'Home', icon: IconHome },
  { link: '', page: 'account', label: 'Account', icon: IconUser },
  { link: '', page: 'settings', label: 'Settings', icon: IconSettings },
];

export const MainNavbar = (): JSX.Element => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');
  const { setPage } = useContext(DataContext);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setPage(item.page);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar width={{ sm: 250 }} p='md' className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header}>
          <Image src='../pictures/logo.png' alt='Logo' />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Group position='apart'>
          <a
            href={'/'}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};
