import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import usePrevious from 'react-use/lib/usePrevious';
import { useDispatch } from 'react-redux';
import ROUTES, { RootStackParamList } from 'app/config/routes';
import { Container, Flex, Button, Badge, Text } from 'app/components/common';
import { colors } from 'app/config/theme';
import texts from 'app/config/texts';
import { useTypedSelector } from 'app/hooks';
import { QuestionsSelectors, QuizzesSelectors } from 'app/store/selectors';
import { QuestionsActions } from 'app/store/actions';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Quiz'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const QuizScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const quiz = useTypedSelector(QuizzesSelectors.getCurrentQuiz);
  const prevQuiz = usePrevious(quiz);
  const question = useTypedSelector(QuestionsSelectors.getCurrentQuestion);
  const prevQuestion = usePrevious(question);
  const isLoadingQuiz = useTypedSelector(state => state.quizzes.isLoading);

  const questionIndex =
    quiz?.questionsIds.findIndex(id => id === question?.id) || 0;

  /**
   * Checks if there's no more questions
   * and go to next screen
   */
  useEffect(() => {
    if (!question && !!prevQuestion) {
      navigation.navigate(ROUTES.RESULT, { quizId: prevQuiz.id });
    }
  }, [question, prevQuestion, navigation, prevQuiz]);

  const handlePressOption = (userAnswer: boolean) => {
    dispatch(
      QuestionsActions.answerQuestion({
        questionId: question.id,
        userAnswer,
        date: Date.now(),
      }),
    );
  };

  if (!question || !quiz || isLoadingQuiz) {
    return (
      <Container>
        <Flex flex={1} centralize>
          <ActivityIndicator />
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Flex
        flex={1}
        backgroundColor="white"
        borderTopRightRadius="50px"
        p="30px"
      >
        <Badge
          value={questionIndex + 1}
          backgroundColor={colors.difficulty[question.difficulty]}
        />
        <Text mt="10px" size="big">
          {question.category}
        </Text>
        <Text mt="10px">{question.text}</Text>
        <Flex mt="auto">
          <Button
            textColor={colors.text.white}
            backgroundColor={colors.button.blue}
            onPress={() => handlePressOption(true)}
          >
            {texts.shared.options.true}
          </Button>
          <Button
            textColor={colors.text.white}
            backgroundColor={colors.button.red}
            mt="15px"
            onPress={() => handlePressOption(false)}
          >
            {texts.shared.options.false}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default QuizScreen;
