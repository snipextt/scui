import { IStackStyles, ITextStyles, mergeStyles } from '@fluentui/react';

const NavbarStyles: Partial<IStackStyles> = {
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

export { NavbarStyles, logoStyles, NotificationStyles, iconClass };
