import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DifficultyType = 'hard' | 'medium' | 'easy';

interface IQuestion {
  id: string;
  difficulty: DifficultyType;
  text: string;
  correctAnswer: boolean;
}

export interface IQuiz {
  id: string;
  /**
   * timestamp quiz was finished
   * if null, was not finished yet
   * */
  endDate: number | null;
  /** quiz has its own difficulty, due that it's possible to have quizzes with random difficulties in the future */
  difficulty: DifficultyType | 'random';
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
