import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { last } from 'lodash';
import { Difficulty } from 'app/services/api';
import { RootState } from './../index';
import memoize from 'memoize-state';

interface IQuestion {
  id: string;
  difficulty: Difficulty;
  text: string;
  correctAnswer: boolean;
  userAnswer: boolean | null;
}

interface IQuestions {
  [id: string]: IQuestion;
}

export type AnswerQuestionPayload = {
  questionId: string;
  userAnswer: boolean;
  date: number;
};

// SELECTORS

const getQuestionById = (
  { questions }: RootState,
  questionId: string,
): IQuestion | null => {
  return questions[questionId] || null;
};

/**
 * Get question in list that wasn't answered yet
 */
const getCurrentQuestion = ({
  questions,
  quizzes,
}: RootState): IQuestion | null => {
  const currentQuizId = last(Object.keys(quizzes.quizzesById));

  if (!currentQuizId) return null;

  const questionsIds = quizzes.quizzesById[currentQuizId].questionsIds;
  const currentQuestionId = questionsIds.find(
    id => questions[id].userAnswer === null,
  );

  if (!currentQuestionId) return null;

  return questions[currentQuestionId];
};

/**
 * Get if quiz has some answered question
 */
const getQuizHasAnsweredQuestion = (
  { questions, quizzes }: RootState,
  quizId?: string,
): boolean => {
  if (!quizId) return false;

  const questionsIds = quizzes.quizzesById[quizId].questionsIds;

  return questionsIds.some(id => questions[id].userAnswer !== null);
};

const getCorrectAnswersIds = (
  { questions, quizzes }: RootState,
  quizId: string,
): string[] => {
  const questionsIds = quizzes.quizzesById[quizId].questionsIds;

  return questionsIds.filter(id => {
    const { correctAnswer, userAnswer } = questions[id];

    return correctAnswer === userAnswer;
  });
};

export const QuestionsSelectors = {
  getCurrentQuestion: memoize(getCurrentQuestion),
  getQuizHasAnsweredQuestion: memoize(getQuizHasAnsweredQuestion),
  getQuestionById: memoize(getQuestionById),
  getCorrectAnswersIds: memoize(getCorrectAnswersIds),
};

// SLICE

const initialState: IQuestions = {};

const { actions, reducer } = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addGroup: (state, { payload }: PayloadAction<IQuestion[]>) => {
      const newQuestions = payload.reduce(
        (acc, question) => ({ ...acc, [question.id]: question }),
        {},
      );

      return { ...state, ...newQuestions };
    },
    answerQuestion: (
      state,
      { payload }: PayloadAction<AnswerQuestionPayload>,
    ) => {
      const { questionId, userAnswer } = payload;

      state[questionId].userAnswer = userAnswer;
    },
  },
});

export const QuestionsActions = actions;

export default reducer;
