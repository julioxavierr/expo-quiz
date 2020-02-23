import React from 'react';
import { Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'app/config/routes';
import { Container } from 'app/components/common';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Result'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const ResultScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <Text>Result</Text>
      <Button title="Home" onPress={() => navigation.popToTop()} />
    </Container>
  );
};

export default ResultScreen;
