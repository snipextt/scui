import { Text } from '@fluentui/react';
import React from 'react';

interface IProps {
  title: string;
  align: 'left' | 'center' | 'right';
  color?: string;
  padTop?: boolean;
}

const SectionHeading: React.FC<IProps> = ({ title, align, color, padTop }) => {
  return (
    <Text
      styles={{
        root: {
          paddingTop: padTop ? 10 : 0,
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
