import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ROUTES, { RootStackParamList } from 'app/config/routes';
import { Flex, Container, Text, Button } from 'app/components/common';
import { colors } from 'app/config/theme';
import texts from 'app/config/texts';
import QuizFlatList from './components/QuizFlatList';
import { useTypedSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { QuizzesSelectors, QuestionsSelectors } from 'app/store/selectors';
import { QuizzesActions } from 'app/store/actions';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const current = useTypedSelector(QuizzesSelectors.getCurrentQuiz);
  const isInProgress = useTypedSelector(state =>
    QuestionsSelectors.getQuizHasAnsweredQuestion(state, current?.id),
  );
  const dispatch = useDispatch();

  /**
   * Pre-fetch next quiz
   */
  useEffect(() => {
    dispatch(QuizzesActions.fetchQuiz());
  }, [dispatch]);

  return (
    <Container>
      <Flex flex={1} pb="30px">
        <Flex pl="36px">
          <Text bold color={colors.text.white} size="big">
            {texts.home.welcome}
          </Text>
          <Text color={colors.text.white} opacity={0.6} mt="10px">
            {current && isInProgress
              ? texts.home.continueQuestion
              : texts.home.startQuestion}
          </Text>
          <Button
            onPress={() => navigation.navigate(ROUTES.QUIZ)}
            mt="25px"
            width="30%"
          >
            {texts.home.start}
          </Button>
        </Flex>
        <Flex mt="auto">
          <Text
            bold
            color={colors.text.white}
            opacity={0.6}
            mb="20px"
            pl="36px"
          >
            {texts.home.scored}
          </Text>
          <QuizFlatList pl="36px" />
        </Flex>
      </Flex>
    </Container>
  );
};

export default HomeScreen;
