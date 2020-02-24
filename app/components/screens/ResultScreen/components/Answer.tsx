import React from 'react';
import styled from 'styled-components/native';
import { border, BorderProps } from 'styled-system';
import { colors } from 'app/config/theme';
import { Text } from 'app/components/common';
import { useTypedSelector } from 'app/hooks';
import { QuestionsSelectors } from 'app/store/selectors';

const Card = styled.View<BorderProps>`
  background-color: ${colors.answer.backgroundColor};
  border-radius: 8px;
  width: 100%;
  border-left-width: 10px;
  padding: 10px;
  ${border}
`;

type Props = {
  questionId: string;
};

const Answer = ({ questionId }: Props) => {
  const question = useTypedSelector(state =>
    QuestionsSelectors.getQuestionById(state, questionId),
  );
  const correct = question.correctAnswer === question.userAnswer;

  return (
    <Card
      borderLeftColor={correct ? colors.answer.correct : colors.answer.wrong}
    >
      <Text bold>{question.text}</Text>
      <Text color={colors.text.grayish} mt="5px">
        {question.correctAnswer}
      </Text>
    </Card>
  );
};

export default Answer;
