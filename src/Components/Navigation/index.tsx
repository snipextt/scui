import {
  ContextualMenu,
  Icon,
  Persona,
  PersonaInitialsColor,
  PersonaSize,
  Stack,
  Image,
  Pivot,
  PivotItem,
  Panel,
} from '@fluentui/react';
import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import {
  NavbarStyles,
  NotificationStyles,
  iconClass,
  hidenOnSmallViewport,
  imageProps,
  hidenOnLargeViewport,
  // BottomNavigation,
} from './styles';
import { createPersona, handleNavbarLinkClick, useMenuProps } from './utils';
import { useBoolean } from '@fluentui/react-hooks';

const Navbar: React.FC<{userDetails: any}> = ({userDetails}) => {
  const personaRef = useRef<any>(null);
  const [profileContextMenuVisible, setProfileContextMenuVisible] =
    useState(false);
  const profilePersona = createPersona(personaRef);
  const menuProps = useMenuProps(personaRef);
  const location = useLocation();
  const history = useHistory();
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  return (
    <>
      <Stack className={NavbarStyles} horizontal>
        <Stack horizontal>
          <Image
            height={45}
            {...imageProps}
            alt="Example with no image fit value and height or width is specified."
          />
        </Stack>
        <Stack horizontal className={hidenOnSmallViewport}>
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
            className={hidenOnSmallViewport}
            onClick={() =>
              setProfileContextMenuVisible(!profileContextMenuVisible)
            }
            style={{ cursor: 'pointer' }}
          >
            <Persona
              {...profilePersona}
              initialsColor={PersonaInitialsColor.blue}
              imageInitials={userDetails?.name?.split('')[0].toUpperCase()}
              text={userDetails?.name?.split(' ').map((c: string)=> c.charAt(0).toUpperCase() + c.slice(1)).join(' ')}
              secondaryText={userDetails?.section?.name}
              size={PersonaSize.size40}
              imageAlt="Student"
            />
          </Stack>
          <Stack
            className={hidenOnLargeViewport}
            onClick={openPanel}
            style={{ cursor: 'pointer' }}
          >
            <Persona
              hidePersonaDetails
              initialsColor={PersonaInitialsColor.blue}
              size={PersonaSize.size40}
            />
          </Stack>
        </Stack>
      </Stack>
      <Panel
        isLightDismiss
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
 <Stack>
          <Persona
            {...profilePersona}
            initialsColor={PersonaInitialsColor.blue}
            imageInitials={userDetails?.name?.split('')[0].toUpperCase()}
            text={userDetails?.name}
            secondaryText={userDetails?.section?.name.toUpperCase()}
            size={PersonaSize.size40}
            imageAlt="Student"
          />
        </Stack>
      </Panel>
    </>
  );
};

export default Navbar;
