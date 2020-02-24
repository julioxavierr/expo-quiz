import React from 'react';
import { Badge as ElementsBadge } from 'react-native-elements';

type Props = {
  value: number | string;
  backgroundColor: string;
};

const Badge = ({ value, backgroundColor }: Props) => (
  <ElementsBadge
    value={value}
    badgeStyle={{ backgroundColor }}
    containerStyle={{ alignSelf: 'flex-start' }}
  />
);

export default Badge;
