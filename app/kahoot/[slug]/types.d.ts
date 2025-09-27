declare module 'react-quiz-component' {
  import { Component } from 'react';

  interface QuizProps {
    quiz: any;
    shuffle?: boolean;
    shuffleAnswer?: boolean;
    showInstantFeedback?: boolean;
    showDefaultResult?: boolean;
    onComplete?: (result: any) => void;
  }

  export default class Quiz extends Component<QuizProps> {}
}
