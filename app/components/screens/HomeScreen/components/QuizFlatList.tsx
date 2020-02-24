import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { space, SpaceProps } from 'styled-system';
import { Flex } from 'app/components/common';
import QuizButton from './QuizButton';

const CustomFlatList = styled<SpaceProps>(FlatList)(space);

type Props = React.ComponentProps<typeof CustomFlatList>;

const QuizFlatList = (props: Props) => {
  return (
    <CustomFlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={['mocked', 'mocked']}
      renderItem={() => (
        <Flex mr="15px">
          <QuizButton />
        </Flex>
      )}
      {...props}
    />
  );
};

export default QuizFlatList;
