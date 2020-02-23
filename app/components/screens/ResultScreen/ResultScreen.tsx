import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'app/config/routes';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Result'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const ResultScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Result</Text>
      <Button title="Home" onPress={() => navigation.popToTop()} />
    </View>
  );
};

export default ResultScreen;
