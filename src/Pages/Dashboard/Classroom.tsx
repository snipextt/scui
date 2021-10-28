import {
  IStackStyles,
  Stack,
  mergeStyles,
  Calendar,
  defaultCalendarStrings,
  DayOfWeek,
  IStackTokens,
  Separator,
  DatePicker,
  defaultDatePickerStrings,
  ContextualMenu,
  DialogType,
  Dialog,
  DialogFooter,
  PrimaryButton,
} from '@fluentui/react';
import React, { useEffect } from 'react';
import { SectionHeading } from '../../Components/Typography';
import SimpleBar from 'simplebar-react';
import ClassroomCard from '../../Components/ClassroomCard';
import { useId, useBoolean } from '@fluentui/react-hooks';

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

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};

const dialogContentProps = {
  type: DialogType.normal,
  title: 'Message',
  closeButtonAriaLabel: 'Close',
  subText: "This session has not started yet! Please check when it's time.",
};

const Classroom: React.FC<{ userDetails: any }> = ({ userDetails }) => {
  const [firstDayOfWeek] = React.useState(DayOfWeek.Sunday);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [upcomingClasses, setUpcomingClasses] = React.useState<any>([]);
  const [timeTable, setTimeTable] = React.useState<any>([]);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId]
  );

  useEffect(() => {
    if (userDetails) {
      console.log(selectedDate);
      const { section } = userDetails;
      if (section) {
        const dayToday = new Date(selectedDate).getDay();
        const classesToday = section.schedule[dayToday];
        setTimeTable([]);
        classesToday.forEach((classData: any) => {
          classData.subjectData = section.subjects.find(
            (subject: any) => subject._id === classData.subject
          );
          classData.date = new Date(selectedDate);
          setTimeTable((data: any) => [...data, classData]);
        });
      }
    }
  }, [selectedDate, userDetails]);
  useEffect(() => {
    if (userDetails) {
      const { section } = userDetails;
      if (section) {
        const dayToday = new Date().getDay();
        const currentHour = new Date().getHours();
        const classesToday = section.schedule[dayToday];
        const upcomingClasses: any[] = [];

        classesToday.forEach((classData: any) => {
          classData.subjectData = section.subjects.find(
            (subject: any) => subject._id === classData.subject
          );
          // setTimeTable((data: any) => [...data, classData]);
          if (
            classData.startTime <= currentHour &&
            classData.endTime > currentHour
          ) {
            upcomingClasses.push(classData);
          }
        });
        if (upcomingClasses.length < 4) {
          let lengthToAdd = 4 - upcomingClasses.length;
          let _day = 1;
          let _date = 1;
          while (lengthToAdd > 0) {
            if (section.schedule[dayToday + _day]) {
              lengthToAdd -= section.schedule[dayToday + _day].length;
              const classes = section.schedule[dayToday + _day];
              // eslint-disable-next-line
              classes.forEach((classData: any) => {
                classData.subjectData = section.subjects.find(
                  (subject: any) => subject._id === classData.subject
                );
                classData.date = new Date();
                classData.date.setDate(classData.date.getDate() + _date);
                upcomingClasses.push(classData);
              });
            }
            _day++;
            _date++;
            if (_day + dayToday >= 7) _day = -dayToday;
          }
        }
        setUpcomingClasses(upcomingClasses);
      }
    }
  }, [userDetails]);
  return (
    <Stack styles={rootStyles} tokens={{ childrenGap: 40 }}>
      <Stack className={SectionStyles} tokens={SectionTokens}>
        <SectionHeading padTop title="Upcoming Sessions" align="left" />
        {/* <Stack horizontal> */}
        <SimpleBar
          className={scrollSectionStyles}
          style={{
            maxWidth: '100%',
            height: 180,
          }}
        >
          {!upcomingClasses.length && (
            <SectionHeading title="No sessions" align="center" color="gray" />
          )}
          {upcomingClasses.map((classData: any) => (
            <ClassroomCard
              key={Math.random()}
              classData={classData}
              click={() => {
                const { startTime, endTime, date } = classData;
                const dateToday = new Date();
                if (date.getDate() === dateToday.getDate()) {
                  if (
                    date.getHours() >= startTime &&
                    date.getHours() < endTime
                  ) {
                    return true;
                  } else {
                    toggleHideDialog();
                  }
                } else {
                  toggleHideDialog();
                }
              }}
            />
          ))}
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
              {timeTable.map((classData: any) => (
                <ClassroomCard key={Math.random()} classData={classData} />
              ))}
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
            {timeTable.length === 0 && (
              <SectionHeading
                title="No classes to display"
                align="center"
                color="gray"
              />
            )}
            {timeTable.map((classData: any) => (
              <ClassroomCard key={Math.random()} classData={classData} />
            ))}
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
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="OK" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default Classroom;
