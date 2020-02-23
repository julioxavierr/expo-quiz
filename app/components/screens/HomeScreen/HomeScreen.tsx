import React from 'react';
import { Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ROUTES, { RootStackParamList } from 'app/config/routes';
import { Container } from 'app/components/common';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <Text>Home</Text>
      <Button title="Quiz" onPress={() => navigation.navigate(ROUTES.QUIZ)} />
    </Container>
  );
};

export default HomeScreen;
