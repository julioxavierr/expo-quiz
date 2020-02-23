import * as React from 'react';
import styled from 'styled-components/native';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

type CustomProps = { row?: boolean; centralize?: boolean };
type ViewProps = CustomProps &
  FlexboxProps &
  LayoutProps &
  SpaceProps &
  PositionProps &
  ColorProps &
  OpacityProps &
  BorderProps;

const View = styled.View<ViewProps>`
  ${props => props.row && 'flex-direction: row;'}
  ${props => props.centralize && 'align-items: center; justify-content: center'}
  ${flexbox}
  ${layout}
  ${space}
  ${position}
  ${color}
  ${opacity}
  ${border}
`;

type Props = React.ComponentProps<typeof View>;

const Flex = (props: Props) => {
  return <View {...props} />;
};

export default React.memo(Flex);
