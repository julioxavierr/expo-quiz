# Expo Quiz

A trivia game made w/ React Native, Expo and modern Redux.

## Project Kanban

Review public project kanban on [Trello](https://trello.com/b/9mg0ODCB/expo-quiz).

## Folder structure

```
├── App.tsx – root component
├── app – source code of the app
│   ├── components - react components
│   │   ├── common - common components reused accross screens
│   │   └── screens - screen components
│   │       ├── HomeScreen
│   │       │   └── components - specific components
│   │       ├── QuizScreen
│   │       └── ResultScreen
│   │           └── components - specific components
│   ├── config - project config/info constants
│   ├── hooks - abstractions of effects using react hooks
│   ├── services - connection w/ external services
│   ├── store - app global store
│   │   └── modules - store modules following ducks/RTK patterns
│   │       └── __tests__ - modules unit tests
│   └── test - jest config/helper files
│       └── utils
└── assets
    └── fonts
```

# Getting Started

### Installing

```bash
yarn install
```

### Run App

```bash
yarn start
```

### Test

```bash
yarn test
```

# Main References

- **Redux Toolkit** - [Overview](https://redux.js.org/redux-toolkit/overview) and [Docs](https://redux-toolkit.js.org/)
- [**Redux Style Guide**](https://redux.js.org/style-guide/style-guide)
- [**Normalizing state shape**](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/)
- [**React – Separation of Concerns**](https://blog.g2i.co/react-separation-of-concerns-78ec0545bf36)
- [**UI as an afterthought**](https://michel.codes/blogs/ui-as-an-afterthought)
- [**Defining Component APIs in React**](https://jxnblk.com/blog/defining-component-apis-in-react/)
- [**Ducks**](https://github.com/erikras/ducks-modular-redux)
- [**Immer**](https://immerjs.github.io/immer/docs/introduction)
