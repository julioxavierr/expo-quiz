import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { space, SpaceProps } from 'styled-system';
import { Flex, Text } from 'app/components/common';
import QuizButton from './QuizButton';
import { useTypedSelector } from 'app/hooks';
import { QuizzesSelectors } from 'app/store/selectors';
import texts from 'app/config/texts';
import { colors } from 'app/config/theme';

const CustomFlatList = styled<SpaceProps>(FlatList)(space);

type Props = React.ComponentProps<typeof CustomFlatList>;

const QuizList = (props: Props) => {
  const quizzesIds = useTypedSelector(
    QuizzesSelectors.getAllCompletedQuizzesIds,
  );

  // show newest first
  const reversedQuizzesIds = [...quizzesIds].reverse();

  if (!quizzesIds.length) return null;

  return (
    <>
      <Text bold color={colors.text.white} opacity={0.6} mb="20px" pl="36px">
        {texts.home.scored}
      </Text>
      <CustomFlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={reversedQuizzesIds}
        renderItem={({ item }) => (
          <Flex mr="15px">
            <QuizButton quizId={item} />
          </Flex>
        )}
        keyExtractor={item => item}
        {...props}
      />
    </>
  );
};

export default QuizList;
