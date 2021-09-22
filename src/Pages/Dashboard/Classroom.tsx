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
  DayOfWeek,
  IStackTokens,
  Separator,
  DatePicker,
  defaultDatePickerStrings,
} from '@fluentui/react';
import React from 'react';
import { SectionHeading } from '../../Components/Typography';
import SimpleBar from 'simplebar-react';
import { useHistory } from 'react-router';

const rootStyles: Partial<IStackStyles> = {
  root: {
    alignItems: 'center',
    paddingBottom: '1.5rem',
  },
};

const _SectionStyles: Partial<IStackStyles> = {
  root: {
    width: '75%',
    justifyContent: 'flex-start',
  },
};

const SectionStyles = mergeStyles(_SectionStyles.root, {
  '@media(max-width: 900px)': {
    width: '88%',
  },
});

const hidenOnSmallViewport = mergeStyles({
  '@media(max-width: 800px)': {
    display: 'none',
  },
});

const hidenOnlargeViewport = mergeStyles({
  '@media(min-width: 800px)': {
    display: 'none',
  },
});

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
    width: 400,
    minWidth: 360,
    cursor: 'pointer',
    height: 120,
    marginRight: '1rem',
  },
};

const classroomPreviewStyles = mergeStyles(timeTableCardStyle.root, {
  marginBottom: 15,
  '.ms-DocumentCardPreview': {
    maxHeight: 'auto',
  },
});

const SectionTokens: IStackTokens = {
  childrenGap: 15,
};

const scrollSectionStyles = mergeStyles({
  '.simplebar-content': {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: '20px',
  },
});
const verticalScrollSectionStyles = mergeStyles({
  '.simplebar-scrollbar:before': {
    // backgroundColor: palette.themePrimary,
  },
  '.simplebar-content': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // height: '100%',
    marginTop: '20px',
  },
});

const Classroom: React.FC = () => {
  const [firstDayOfWeek] = React.useState(DayOfWeek.Sunday);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const history = useHistory();
  return (
    <Stack styles={rootStyles} tokens={{ childrenGap: 40 }}>
      <Stack className={SectionStyles} tokens={SectionTokens}>
        <SectionHeading padTop title="Upcoming Classes" align="left" />
        {/* <Stack horizontal> */}
        <SimpleBar
          className={scrollSectionStyles}
          style={{
            maxWidth: '100%',
            height: 180,
          }}
        >
          <DocumentCard
            onClick={() => {
              history.push('/virtual-classroom/lodge');
            }}
            className={classroomPreviewStyles}
            type={DocumentCardType.compact}
            aria-label="Upcomimng classes"
          >
            <DocumentCardPreview {...previewPropsUsingIcon} />
            <DocumentCardDetails>
              <DocumentCardTitle title="Maths Class" />
              <DocumentCardActivity
                activity="Class at 11:30 AM"
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
                activity="Class at 11:30 AM"
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
                activity="Class at 11:30 AM"
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
                activity="Class at 11:30 AM"
                people={[{ name: 'Teacher name', profileImageSrc: '' }]}
              />
              <DocumentCardActions actions={documentCardActions} views={1} />
            </DocumentCardDetails>
          </DocumentCard>
        </SimpleBar>
        {/* </Stack> */}
      </Stack>
      <Stack className={SectionStyles} tokens={SectionTokens}>
        <SectionHeading title="Time Table" align="left" />
        <Stack horizontal>
          <Stack style={{ width: '100%' }} className={hidenOnlargeViewport}>
            <DatePicker
              firstDayOfWeek={firstDayOfWeek}
              placeholder="Select date"
              ariaLabel="Select a date"
              style={{ width: '100%' }}
              // DatePicker uses English strings by default. For localized apps, you must override this prop.
              strings={defaultDatePickerStrings}
            />
            <SimpleBar
              className={verticalScrollSectionStyles}
              style={{ maxHeight: 300, width: '100%' }}
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
                    activity="Class at 11:30 AM"
                    people={[{ name: 'Teacher name', profileImageSrc: '' }]}
                  />
                  <DocumentCardActions
                    actions={documentCardActions}
                    views={1}
                  />
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
                    activity="Class at 11:30 AM"
                    people={[{ name: 'Teacher name', profileImageSrc: '' }]}
                  />
                  <DocumentCardActions
                    actions={documentCardActions}
                    views={1}
                  />
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
                    activity="Class at 11:30 AM"
                    people={[{ name: 'Teacher name', profileImageSrc: '' }]}
                  />
                  <DocumentCardActions
                    actions={documentCardActions}
                    views={1}
                  />
                </DocumentCardDetails>
              </DocumentCard>
            </SimpleBar>
          </Stack>
          <Calendar
            className={hidenOnSmallViewport}
            showGoToToday
            showMonthPickerAsOverlay
            onSelectDate={setSelectedDate}
            value={selectedDate}
            // Calendar uses English strings by default. For localized apps, you must override this prop.
            strings={defaultCalendarStrings}
          />
          <Separator className={hidenOnSmallViewport} vertical />
          <Separator className={hidenOnSmallViewport} vertical />
          <Separator className={hidenOnSmallViewport} vertical />

          <SimpleBar
            className={scrollSectionStyles + ' ' + hidenOnSmallViewport}
            style={{
              width: '100%',
              height: '230px',
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
                  activity="Class at 11:30 AM"
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
                  activity="Class at 11:30 AM"
                  people={[{ name: 'Teacher name', profileImageSrc: '' }]}
                />
                <DocumentCardActions actions={documentCardActions} views={1} />
              </DocumentCardDetails>
            </DocumentCard>
          </SimpleBar>
        </Stack>
      </Stack>
      <Stack className={SectionStyles} tokens={SectionTokens}>
        <SectionHeading title="Pending Assignments" align="left" />
        <Stack
          horizontal
          styles={{
            root: {
              justifyContent: 'center',
              paddingTop: 10,
            },
          }}
        >
          <SectionHeading
            title="No assignments to display"
            align="center"
            color="gray"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Classroom;
