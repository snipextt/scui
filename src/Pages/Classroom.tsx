import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardDetails,
  getTheme,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  IButtonProps,
  IStackStyles,
  Stack,
  IDocumentCardPreviewProps,
  mergeStyles,
  ScrollablePane,
} from '@fluentui/react';
import React from 'react';
import { SectionHeading } from '../Components/Typography';

const rootStyles: Partial<IStackStyles> = {
  root: {
    alignItems: 'center',
  },
};

const timeTableSectionStyles: Partial<IStackStyles> = {
  root: {
    paddingTop: '1.5rem',
    width: '75%',
    justifyContent: 'flex-start',
  },
};

const onActionClick = (
  action: string,
  ev: React.SyntheticEvent<HTMLElement>
): void => {
  console.log(`You clicked the ${action} action`);
  ev.stopPropagation();
  ev.preventDefault();
};

const documentCardActions: IButtonProps[] = [
  {
    iconProps: { iconName: 'Pin' },
    onClick: () => onActionClick.bind(this, 'pin'),
    ariaLabel: 'pin action',
  },
  {
    iconProps: { iconName: 'Ringer' },
    onClick: () => onActionClick.bind(this, 'notifications'),
    ariaLabel: 'notifications action',
  },
];

const theme = getTheme();
const { palette, fonts } = theme;

const previewPropsUsingIcon: IDocumentCardPreviewProps = {
  previewImages: [
    {
      previewIconProps: {
        iconName: 'OpenFile',
        styles: {
          root: { fontSize: fonts.xxLarge.fontSize, color: palette.white },
        },
      },
      width: 144,
    },
  ],
  styles: {
    previewIcon: { backgroundColor: palette.themePrimary, maxHeight: '200px' },
  },
};

const timeTableCardStyle: Partial<IStackStyles> = {
  root: {
    width: 360,
    minWidth: 360,
    height: 120,
    marginRight: '1rem',
  },
};

const classroomPreviewStyles = mergeStyles(timeTableCardStyle.root, {
  '.ms-DocumentCardPreview': {
    maxHeight: 'auto',
  },
  ':last-child': {
    marginRIght: 0,
  },
});

const Classroom: React.FC = () => {
  console.log(classroomPreviewStyles);
  return (
    <Stack styles={rootStyles}>
      <Stack styles={timeTableSectionStyles} tokens={{ childrenGap: 15 }}>
        <SectionHeading title="Upcoming Classes" align="left" />
        <Stack horizontal style={{ position: 'relative' }}>
          <Stack
            horizontal
            styles={{
              root: {
                maxWidth: '100%',
                overflow: 'auto',
              },
            }}
          >
            <DocumentCard
              className={classroomPreviewStyles}
              type={DocumentCardType.compact}
              aria-label="Upcomimng classes"
            >
              <DocumentCardPreview {...previewPropsUsingIcon} />
              <DocumentCardDetails>
                <DocumentCardTitle title="Maths Class" />
                <DocumentCardActivity
                  activity="Meeting at 11:30 AM"
                  people={[{ name: 'Teacher name', profileImageSrc: '' }]}
                />
                <DocumentCardActions actions={documentCardActions} views={1} />
              </DocumentCardDetails>
            </DocumentCard>
            <DocumentCard
              className={classroomPreviewStyles}
              type={DocumentCardType.compact}
              aria-label="Upcomimng classes"
            >
              <DocumentCardPreview {...previewPropsUsingIcon} />
              <DocumentCardDetails>
                <DocumentCardTitle title="Maths Class" />
                <DocumentCardActivity
                  activity="Meeting at 11:30 AM"
                  people={[{ name: 'Teacher name', profileImageSrc: '' }]}
                />
                <DocumentCardActions actions={documentCardActions} views={1} />
              </DocumentCardDetails>
            </DocumentCard>
            <DocumentCard
              className={classroomPreviewStyles}
              type={DocumentCardType.compact}
              aria-label="Upcomimng classes"
            >
              <DocumentCardPreview {...previewPropsUsingIcon} />
              <DocumentCardDetails>
                <DocumentCardTitle title="Maths Class" />
                <DocumentCardActivity
                  activity="Meeting at 11:30 AM"
                  people={[{ name: 'Teacher name', profileImageSrc: '' }]}
                />
                <DocumentCardActions actions={documentCardActions} views={1} />
              </DocumentCardDetails>
            </DocumentCard>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Classroom;
