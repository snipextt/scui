import { Text } from '@fluentui/react';
import React from 'react';

interface IProps {
  title: string;
  align: 'left' | 'center' | 'right';
  color?: string;
}

const SectionHeading: React.FC<IProps> = ({ title, align, color }) => {
  return (
    <Text
      styles={{
        root: {
          textAlign: align,
          fontSize: '22px',
          fontWeight: 600,
          color,
        },
      }}
    >
      {title}
    </Text>
  );
};

export default SectionHeading;
