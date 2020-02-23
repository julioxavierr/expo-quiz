const ROUTES = {
  HOME: 'Home',
  QUIZ: 'Quiz',
  RESULT: 'Result',
} as const;

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.QUIZ]: { quizId: string };
  [ROUTES.RESULT]: { quizId: string };
};

export default ROUTES;
