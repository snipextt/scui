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
  Calendar,
  defaultCalendarStrings,
  IStackTokens,
  Separator,
} from '@fluentui/react';
import React from 'react';
import { SectionHeading } from '../Components/Typography';

const rootStyles: Partial<IStackStyles> = {
  root: {
    alignItems: 'center',
    paddingBottom: '1.5rem',
  },
};

const SectionStyles: Partial<IStackStyles> = {
  root: {
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

const SectionTokens: IStackTokens = {
  childrenGap: 15,
};

const Classroom: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  return (
    <Stack styles={rootStyles} tokens={{ childrenGap: 30 }}>
      <Stack styles={SectionStyles} tokens={SectionTokens}>
        <SectionHeading title="Upcoming Classes" align="left" />
        <Stack horizontal style={{ position: 'relative' }}>
          <Stack
            horizontal
            styles={{
              root: {
                maxWidth: '100%',
                overflow: 'auto',
                paddingTop: 20,
                paddingBottom: 20,
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
      <Stack styles={SectionStyles} tokens={SectionTokens}>
        <SectionHeading title="Time Table" align="left" />
        <Stack horizontal>
          <Calendar
            showGoToToday
            showMonthPickerAsOverlay
            onSelectDate={setSelectedDate}
            value={selectedDate}
            // Calendar uses English strings by default. For localized apps, you must override this prop.
            strings={defaultCalendarStrings}
          />
          <Separator vertical />
          <Stack
            horizontal
            styles={{
              root: {
                overflow: 'auto',
                alignItems: 'center',
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
