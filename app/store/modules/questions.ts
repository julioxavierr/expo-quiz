import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Difficulty } from 'app/services/api';

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
