import React from 'react';
import styled from 'styled-components/native';
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
} from 'styled-system';
import Text from './Text';
import { colors } from 'app/config/theme';

const Touchable = styled.TouchableOpacity<
  SpaceProps & ColorProps & LayoutProps
>`
  ${space}
  ${color}
  ${layout}
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

type Props = {
  textColor?: string;
  children?: string;
} & React.ComponentProps<typeof Touchable>;

const Button = ({
  textColor = colors.text.blue,
  backgroundColor = colors.button.white,
  children,
  ...props
}: Props) => {
  return (
    <Touchable backgroundColor={backgroundColor} px="30px" py="10px" {...props}>
      <Text textColor={textColor}>{children}</Text>
    </Touchable>
  );
};

export default Button;
