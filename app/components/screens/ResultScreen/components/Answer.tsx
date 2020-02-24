import React from 'react';
import styled from 'styled-components/native';
import { border, BorderProps } from 'styled-system';
import { colors } from 'app/config/theme';
import { Text } from 'app/components/common';

const Card = styled.View<BorderProps>`
  background-color: ${colors.answer.backgroundColor};
  border-radius: 8px;
  width: 100%;
  border-left-width: 10px;
  padding: 10px;
  ${border}
`;

const Answer = () => {
  return (
    <Card borderLeftColor={colors.answer.right}>
      <Text bold>Question text</Text>
      <Text color={colors.text.grayish} mt="5px">
        True
      </Text>
    </Card>
  );
};

export default Answer;
