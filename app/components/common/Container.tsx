import * as React from 'react';
import styled from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/stack';
import Flex from './Flex';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'app/config/theme';

const SafeWrapper = styled.SafeAreaView`
  flex: 1;
`;

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  const height = useHeaderHeight();

  return (
    <Flex
      as={LinearGradient}
      flex={1}
      pt={height}
      colors={colors.backgroundColor}
    >
      <SafeWrapper>{children}</SafeWrapper>
    </Flex>
  );
};

export default Container;
