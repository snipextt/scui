import {
  IContextualMenuProps,
  ContextualMenuItemType,
  IPersonaSharedProps,
} from '@fluentui/react';
import { Target, useConst } from '@fluentui/react-hooks';
import { History } from 'history';

const useMenuProps = (personaRef: Target | undefined) =>
  useConst<IContextualMenuProps>(() => ({
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

const createPersona = (
  personaRef: React.Ref<HTMLDivElement> | undefined
): IPersonaSharedProps => ({
  ref: personaRef,
});

const handleNavbarLinkClick = (item?: any, history?: History) => {
  if (item) history?.push(`/dashboard/${item?.key.split('.$')[1]}`);
};

export { useMenuProps, handleNavbarLinkClick, createPersona };
