import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ROUTES, { RootStackParamList } from 'app/config/routes';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Quiz'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const QuizScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Quiz</Text>
      <Button
        title="Result"
        onPress={() => navigation.navigate(ROUTES.RESULT)}
      />
    </View>
  );
};

QuizScreen.navigationOptions = {
  onPressBack: () => console.log('HEY'),
};

export default QuizScreen;
