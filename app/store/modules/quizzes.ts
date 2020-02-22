import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { sample, last } from 'lodash';
import api, { Difficulty, ResponseCode } from 'app/services/api';
import { RootState } from 'app/store';
import memoize from 'memoize-state';
import shortid from 'shortid';

const QUESTIONS_AMOUNT = 10;

interface IQuestion {
  id: string;
  difficulty: Difficulty;
  text: string;
  correctAnswer: boolean;
  userAnswer: boolean | null;
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

// SELECTORS

type CurrentType = { quizId: string; questionId: string } | null;
const getCurrent = ({ quizzes }: RootState): CurrentType => {
  const { quizzesById } = quizzes;

  const lastQuizId = last(Object.keys(quizzesById));

  if (!lastQuizId) return null;

  const questionsIds = Object.keys(quizzesById[lastQuizId].questions);

  const pendingQuestionId = questionsIds.find(questionId => {
    return !quizzesById[lastQuizId].questions[questionId].userAnswer;
  });

  if (!pendingQuestionId) return null;

  return { quizId: lastQuizId, questionId: pendingQuestionId };
};

const getCurrentMemoized = memoize(getCurrent);

export const QuizzesSelectors = {
  getCurrent,
  getCurrentMemoized,
};

// ACTIONS

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

    if (response?.response_code !== ResponseCode.Success) {
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
        userAnswer: null,
      })),
    };
  },
);

// SLICE

const initialState: IQuizzes = {
  isLoading: false,
  error: null,
  quizzesById: {},
};

const { actions, reducer } = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    remove: (state, { payload }: PayloadAction<string>) => {
      delete state.quizzesById[payload];
    },
    answerQuestion: (state, { payload }: PayloadAction<boolean>) => {
      const current = getCurrent({ quizzes: state });
      if (!current) return;

      const { quizId, questionId } = current;
      const questions = state.quizzesById[quizId].questions;

      const lastQuestionId = last(Object.keys(questions));

      questions[questionId].userAnswer = payload;

      // if it's the last question, set an endDate
      if (questionId === lastQuestionId) {
        state.quizzesById[quizId].endDate = Date.now();
      }
    },
  },
  extraReducers: {
    [fetchQuiz.pending.type]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchQuiz.fulfilled.type]: (state, { payload }: PayloadAction<IQuiz>) => {
      // only allow one active quiz
      const current = getCurrent({ quizzes: state });
      if (current) return;

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
