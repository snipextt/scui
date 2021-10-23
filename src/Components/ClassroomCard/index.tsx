import {
  DocumentCard,
  DocumentCardType,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardActivity,
  mergeStyles,
  IDocumentCardPreviewProps,
  getTheme,
  IStackStyles,
} from '@fluentui/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const theme = getTheme();
const { palette, fonts } = theme;

// const onActionClick = (
//   action: string,
//   ev: React.SyntheticEvent<HTMLElement>
// ): void => {
//   console.log(`You clicked the ${action} action`);
//   ev.stopPropagation();
//   ev.preventDefault();
// };

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

const previewPropsUsingIcon: IDocumentCardPreviewProps = {
  previewImages: [
    {
      previewIconProps: {
        iconName: 'FrontCamera',
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

// const documentCardActions: IButtonProps[] = [];

const ClassroomCard: React.FC<{ classData?: any }> = ({ classData }) => {
  const history = useHistory();
  const [classTime, setClassTime] = React.useState('');
  const [className, setClassName] = React.useState('');
  const [teacher, setTeacher] = React.useState('');
  // const [classCode, setClassCode] = React.useState('');
  const [classDate, setClassDate] = React.useState('');
  useEffect(() => {
    setClassTime(classData?.startTime);
    setTeacher(classData?.subjectData.teacherName);
    setClassName(
      classData?.subjectData.name.split('')[0].toUpperCase() +
        classData?.subjectData.name.slice(1)
    );
    setClassDate(classData?.date);
    setClassDate(classData?.date?.toLocaleDateString());
  }, [classData]);
  return (
    <DocumentCard
      onClick={() => {
        history.push('/virtual-classroom/lodge', {
          classData,
        });
      }}
      className={classroomPreviewStyles}
      type={DocumentCardType.compact}
      aria-label="Upcomimng classes"
    >
      <DocumentCardPreview {...previewPropsUsingIcon} />
      <DocumentCardDetails>
        <DocumentCardTitle title={`${className}`} />
        <DocumentCardActivity
          activity={`Starts ${classTime || 11} ${
            parseInt(classTime) > 11 ? 'PM' : 'AM'
          } `}
          people={[{ name: teacher, profileImageSrc: '' }]}
        />
        <p
          style={{
            fontSize: '0.8rem',
            marginLeft: '1rem',
          }}
        >
          Session{' '}
          {classDate === new Date().toLocaleDateString() ? 'today' : classDate}
        </p>
        {/* {<DocumentCardActions actions={documentCardActions} views={1} />} */}
      </DocumentCardDetails>
    </DocumentCard>
  );
};

export default ClassroomCard;
