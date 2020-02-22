import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { sample } from 'lodash';
import api, { Difficulty, ResponseCode } from 'app/services/api';
import shortid from 'shortid';

const QUESTIONS_AMOUNT = 10;

interface IQuestion {
  id: string;
  difficulty: Difficulty;
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
  difficulty: Difficulty | 'random';
  questions: {
    [id: string]: IQuestion;
  };
}

interface IQuizzes {
  isLoading: boolean;
  error: string | null;
  quizzesById: {
    [id: string]: IQuiz;
  };
}

const fetchQuiz = createAsyncThunk(
  'quizzes/fetchQuiz',
  async (): Promise<IQuiz> => {
    // pick one difficulty randomly
    const difficulty = sample(Object.values(Difficulty));
    const params = {
      amount: QUESTIONS_AMOUNT,
      type: 'boolean',
    };

    const response = await api.get('', { params });

    if (response.response_code !== ResponseCode.Success) {
      throw new Error('An error ocurred.');
    }

    return {
      id: shortid.generate(),
      endDate: null,
      difficulty,
      questions: response.results.map(question => ({
        id: shortid.generate(),
        difficulty: question.difficulty,
        text: question.question,
        correctAnswer: question.correct_answer === 'True',
      })),
    };
  },
);

const initialState: IQuizzes = {
  isLoading: false,
  error: null,
  quizzesById: {},
};

const { actions, reducer } = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    /** set end date of quiz */
    finish: (state, { payload }: PayloadAction<string>) => {
      if (!state[payload]) return;

      state[payload].endDate = Date.now(); // redux-toolkit uses immer library
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      delete state.quizzesById[payload];
    },
  },
  extraReducers: {
    [fetchQuiz.pending.type]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchQuiz.fulfilled.type]: (state, { payload }: PayloadAction<IQuiz>) => {
      state.quizzesById[payload.id] = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchQuiz.rejected.type]: state => {
      state.isLoading = false;
      state.error = 'An error ocurred';
    },
  },
});

export const QuizzesActions = {
  ...actions,
  fetchQuiz,
};

export default reducer;
