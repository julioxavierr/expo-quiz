import React from 'react';
import { Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ROUTES, { RootStackParamList } from 'app/config/routes';
import { Container } from 'app/components/common';

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
      <Text>Quiz</Text>
      <Button
        title="Result"
        onPress={() => navigation.navigate(ROUTES.RESULT)}
      />
    </Container>
  );
};

QuizScreen.navigationOptions = {
  onPressBack: () => console.log('HEY'),
};

export default QuizScreen;
