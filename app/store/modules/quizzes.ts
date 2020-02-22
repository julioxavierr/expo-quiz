import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IQuestion {
  id: string;
  difficulty: string;
  question: string;
  correctAnswer: boolean;
}

interface IQuiz {
  id: string;
  /** timestamp quiz was finished */
  endDate: number | null;
  /** quiz has its own difficulty, due that it's possible to have quizzes with random difficulties in the future */
  difficulty: string;
  questions: {
    [id: string]: IQuestion;
  };
}

interface IQuizzes {
  [id: string]: IQuiz;
}

const initialState: IQuizzes = {};

const { actions, reducer } = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<IQuiz>) => {
      // redux-toolkit uses immer library
      state[payload.id] = payload;
    },
  },
});

export const QuizzesActions = actions;

export default reducer;
