import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ROUTES, { RootStackParamList } from 'app/config/routes';
import { Container, Flex, Button, Badge, Text } from 'app/components/common';
import { colors } from 'app/config/theme';
import texts from 'app/config/texts';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Quiz'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const QuizScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <Flex
        flex={1}
        backgroundColor="white"
        borderTopRightRadius="50px"
        p="30px"
      >
        <Badge value="1" backgroundColor={colors.difficulty.hard} />
        <Text mt="10px">What</Text>
        <Flex mt="auto">
          <Button
            textColor={colors.text.white}
            backgroundColor={colors.button.blue}
          >
            {texts.shared.options.true}
          </Button>
          <Button
            textColor={colors.text.white}
            backgroundColor={colors.button.red}
            mt="15px"
            onPress={() => navigation.navigate(ROUTES.RESULT)}
          >
            {texts.shared.options.false}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

QuizScreen.navigationOptions = {
  onPressBack: () => console.log('HEY'),
};

export default QuizScreen;
