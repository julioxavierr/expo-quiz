import React from 'react';
import styled from 'styled-components/native';
import { colors } from 'app/config/theme';
import { Flex, Badge, Text } from 'app/components/common';

const Touchable = styled.TouchableOpacity`
  height: 120px;
  width: 295px;
  border-radius: 8px;
  background-color: ${colors.card.backgroundColor};
`;

const QuizButton = () => {
  return (
    <Touchable>
      <Flex row justifyContent="space-between" p="10px">
        <Badge value="medium" backgroundColor={colors.difficulty.medium} />
        <Text color={colors.text.grayish}>3 days ago</Text>
      </Flex>
      <Flex
        borderTopWidth="1px"
        borderTopColor={colors.card.separator}
        p="10px"
        mt="40px"
      >
        <Text bold>3 of 4 questions</Text>
      </Flex>
    </Touchable>
  );
};

export default QuizButton;
