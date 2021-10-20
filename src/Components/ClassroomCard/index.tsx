import { DocumentCard, DocumentCardType, DocumentCardPreview, DocumentCardDetails, DocumentCardTitle, DocumentCardActivity, DocumentCardActions, mergeStyles, IDocumentCardPreviewProps, getTheme, IStackStyles, IButtonProps } from "@fluentui/react";
import React from "react";
import { useHistory } from "react-router";

const theme = getTheme();
const { palette, fonts } = theme;

const onActionClick = (
  action: string,
  ev: React.SyntheticEvent<HTMLElement>
): void => {
  console.log(`You clicked the ${action} action`);
  ev.stopPropagation();
  ev.preventDefault();
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

const ClassroomCard: React.FC = () => {
    const history = useHistory();
    return (
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
    )
} 

export default ClassroomCard;