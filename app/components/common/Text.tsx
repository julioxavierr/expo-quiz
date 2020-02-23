import * as React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  opacity,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';
import FONT_NAMES from 'app/config/fonts';

type InnerTextProps = TypographyProps &
  TextProps &
  ColorProps &
  SpaceProps &
  PositionProps &
  FlexboxProps;

const InnerText = styled.Text<InnerTextProps>(
  typography,
  flexbox,
  space,
  position,
  color,
  opacity,
);

enum Sizes {
  big = '26px',
  medium = '16px',
  small = '10px',
}

type Props = {
  bold?: boolean;
  size?: 'big' | 'medium' | 'small';
} & React.ComponentProps<typeof InnerText>;

const Text = ({ bold = false, size = 'medium', ...props }: Props) => (
  <InnerText
    fontSize={Sizes[size]}
    fontFamily={
      bold ? FONT_NAMES.CIRCULAR_STD_BOLD : FONT_NAMES.CIRCULAR_STD_MEDIUM
    }
    {...props}
  />
);

export default Text;
