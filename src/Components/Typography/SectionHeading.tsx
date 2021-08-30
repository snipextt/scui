import { Text } from '@fluentui/react';
import React from 'react';

interface IProps {
  title: string;
  align: 'left' | 'center' | 'right';
}

const SectionHeading: React.FC<IProps> = ({ title, align }) => {
  return (
    <Text
      styles={{ root: { textAlign: align, fontSize: '22px', fontWeight: 600 } }}
    >
      {title}
    </Text>
  );
};

export default SectionHeading;
