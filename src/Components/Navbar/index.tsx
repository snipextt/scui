import {
  ContextualMenu,
  ContextualMenuItemType,
  Icon,
  IContextualMenuProps,
  IPersonaSharedProps,
  Persona,
  PersonaInitialsColor,
  PersonaSize,
  Stack,
  Text,
  Pivot,
  PivotItem,
} from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import React, { useRef, useState } from 'react';
import {
  NavbarStyles,
  logoStyles,
  NotificationStyles,
  iconClass,
} from './styles';

const Navbar: React.FC = () => {
  const personaRef = useRef<any>(null);
  const [profileContextMenuVisible, setProfileContextMenuVisible] =
    useState(false);
  const profilePersona: IPersonaSharedProps = {
    imageInitials: 'S',
    text: 'Saurav',
    ref: personaRef,
    secondaryText: 'Software Engineer',
  };
  const menuProps = useConst<IContextualMenuProps>(() => ({
    gapSpace: 20,
    shouldFocusOnMount: true,
    target: personaRef,
    items: [
      {
        key: 'Actions',
        itemType: ContextualMenuItemType.Header,
        text: 'Actions',
        itemProps: { lang: 'en-us' },
      },
      {
        key: 'upload',
        iconProps: { iconName: 'Upload', style: { color: 'salmon' } },
        text: 'Upload',
        title: 'Upload a file',
      },
      { key: 'rename', text: 'Rename' },
      {
        key: 'share',
        iconProps: { iconName: 'Share' },
        subMenuProps: {
          items: [
            {
              key: 'sharetoemail',
              text: 'Share to Email',
              iconProps: { iconName: 'Ringer' },
            },
            {
              key: 'sharetofacebook',
              text: 'Share to Facebook',
              iconProps: { iconName: 'Share' },
            },
            {
              key: 'sharetotwitter',
              text: 'Share to Twitter',
              iconProps: { iconName: 'Share' },
            },
          ],
        },
        text: 'Sharing',
        ariaLabel:
          'Sharing. Press enter, space or right arrow keys to open submenu.',
      },
      {
        key: 'navigation',
        itemType: ContextualMenuItemType.Header,
        text: 'Navigation',
      },
      { key: 'properties', text: 'Properties' },
      { key: 'print', iconProps: { iconName: 'Print' }, text: 'Print' },
      {
        key: 'Bing',
        text: 'Go to Bing',
        href: 'http://www.bing.com',
        target: '_blank',
      },
    ],
  }));
  return (
    <Stack styles={NavbarStyles} horizontal>
      <Stack horizontal>
        <Text styles={logoStyles}>Startup Hai</Text>
      </Stack>
      <Stack horizontal>
        <Pivot
          aria-label="Large Link Size Pivot Example"
          defaultSelectedKey="labs"
        >
          <PivotItem headerText="Classroom" key="classroom"></PivotItem>
          <PivotItem headerText="Assignments" key="assignments"></PivotItem>
          <PivotItem headerText="Teachers" key="teachers"></PivotItem>
          <PivotItem headerText="Labs" itemKey="labs" key="labs"></PivotItem>
          <PivotItem headerText="Recordings" key="recordings"></PivotItem>
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
