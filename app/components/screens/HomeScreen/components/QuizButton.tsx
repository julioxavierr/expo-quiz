import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { colors } from 'app/config/theme';
import { Flex, Badge, Text } from 'app/components/common';
import { useTypedSelector } from 'app/hooks';
import { QuizzesSelectors, QuestionsSelectors } from 'app/store/selectors';
import { formatDistance } from 'date-fns';
import ROUTES from 'app/config/routes';

const Touchable = styled.TouchableOpacity`
  height: 120px;
  width: 295px;
  border-radius: 8px;
  background-color: ${colors.card.backgroundColor};
`;

type Props = {
  quizId: string;
};

const QuizButton = ({ quizId }: Props) => {
  const { navigate } = useNavigation();

  const { id, difficulty, endDate, questionsIds } = useTypedSelector(state =>
    QuizzesSelectors.getQuizById(state, quizId),
  );
  const correctIds = useTypedSelector(state =>
    QuestionsSelectors.getCorrectAnswersIds(state, quizId),
  );

  const distanceTime = formatDistance(new Date(), new Date(endDate));

  return (
    <Touchable
      onPress={() => navigate(ROUTES.RESULT, { quizId: id })}
      delayPressIn={35}
    >
      <Flex row justifyContent="space-between" p="10px">
        <Badge
          value={difficulty}
          backgroundColor={colors.difficulty[difficulty]}
        />
        <Text color={colors.text.grayish}>{distanceTime} ago</Text>
      </Flex>
      <Flex
        borderTopWidth="1px"
        borderTopColor={colors.card.separator}
        p="10px"
        mt="40px"
      >
        <Text bold>
          {correctIds.length} of {questionsIds.length} questions
        </Text>
      </Flex>
    </Touchable>
  );
};

export default QuizButton;
