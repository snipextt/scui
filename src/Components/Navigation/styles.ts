import {
  IImageProps,
  IStackStyles,
  ITextStyles,
  mergeStyles,
} from '@fluentui/react';
import enlightLogo from './enlight.png';

const _NavbarStyles: Partial<IStackStyles> = {
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: '10%',
    paddingRight: '10%',
    background: '#fff',
    width: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.11) 0px 2px  2px',
  },
};

const NavbarStyles = mergeStyles(_NavbarStyles.root, {
  '@media(max-width: 900px)': {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  '@media(max-width: 550px)': {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
});

const _BottomNavigation: Partial<IStackStyles> = {
  root: {
    height: '10vh',
    position: 'fixed',
    bottom: 0,
    background: '#ffffff',
    width: '100%',
  },
};

const BottomNavigation = mergeStyles(_BottomNavigation.root, {
  '@media(min-width: 900px)': {
    display: 'none',
  },
});

const logoStyles: Partial<ITextStyles> = {
  root: {
    fontSize: 26,
    fontWeight: 'bold',
  },
};

const NotificationStyles: Partial<IStackStyles> = {
  root: {
    borderRadius: '50%',
    border: '1px solid grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    padding: 9,
    cursor: 'pointer',
  },
};

const iconClass = mergeStyles({
  fontSize: 20,
});

const hidenOnSmallViewport = mergeStyles({
  '@media(max-width: 900px)': {
    display: 'none',
  },
});

const imageProps: Partial<IImageProps> = {
  src: enlightLogo,
};
const hidenOnLargeViewport = mergeStyles({
  '@media(min-width: 900px)': {
    display: 'none',
  },
});

export {
  NavbarStyles,
  logoStyles,
  NotificationStyles,
  iconClass,
  hidenOnSmallViewport,
  BottomNavigation,
  imageProps,
  hidenOnLargeViewport,
};
