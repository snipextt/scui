import {
  ContextualMenu,
  Icon,
  Persona,
  PersonaInitialsColor,
  PersonaSize,
  Stack,
  Text,
  Pivot,
  PivotItem,
} from '@fluentui/react';
import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import {
  NavbarStyles,
  logoStyles,
  NotificationStyles,
  iconClass,
} from './styles';
import { createPersona, handleNavbarLinkClick, useMenuProps } from './utils';

const Navbar: React.FC = () => {
  const personaRef = useRef<any>(null);
  const [profileContextMenuVisible, setProfileContextMenuVisible] =
    useState(false);
  const profilePersona = createPersona(personaRef);
  const menuProps = useMenuProps(personaRef);
  const location = useLocation();
  const history = useHistory();
  return (
    <Stack styles={NavbarStyles} horizontal>
      <Stack horizontal>
        <Text styles={logoStyles}>Startup Hai</Text>
      </Stack>
      <Stack horizontal>
        <Pivot
          aria-label="Large Link Size Pivot Example"
          defaultSelectedKey={location.pathname.split('/')[2]}
          onLinkClick={(e) => handleNavbarLinkClick(e, history)}
        >
          <PivotItem
            headerText="Classroom"
            itemKey="classroom"
            key="classroom"
          ></PivotItem>
          <PivotItem
            headerText="Assignments"
            itemKey="assignments"
            key="assignments"
          ></PivotItem>
          <PivotItem
            headerText="Teachers"
            itemKey="teachers"
            key="teachers"
          ></PivotItem>
          <PivotItem headerText="Labs" itemKey="labs" key="labs"></PivotItem>
          <PivotItem
            headerText="Recordings"
            itemKey="recordings"
            key="recordings"
          ></PivotItem>
        </Pivot>
      </Stack>
      <Stack horizontal>
        <Stack styles={NotificationStyles}>
          <Icon iconName="Ringer" className={iconClass} />
        </Stack>
        <ContextualMenu
          {...menuProps}
          hidden={!profileContextMenuVisible}
          onDismiss={() => setProfileContextMenuVisible(false)}
        />
        <Stack
          onClick={() =>
            setProfileContextMenuVisible(!profileContextMenuVisible)
          }
          style={{ cursor: 'pointer' }}
        >
          <Persona
            {...profilePersona}
            initialsColor={PersonaInitialsColor.blue}
            size={PersonaSize.size40}
            imageAlt="Saurav"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
