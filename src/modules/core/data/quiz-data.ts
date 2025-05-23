import { QuizQuestion } from "../types/quiz";

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: [
      { id: "a", text: "London" },
      { id: "b", text: "Berlin" },
      { id: "c", text: "Paris" },
      { id: "d", text: "Madrid" },
    ],
    correctAnswer: "c",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answers: [
      { id: "a", text: "Venus" },
      { id: "b", text: "Mars" },
      { id: "c", text: "Jupiter" },
      { id: "d", text: "Saturn" },
    ],
    correctAnswer: "b",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    answers: [
      { id: "a", text: "African Elephant" },
      { id: "b", text: "Blue Whale" },
      { id: "c", text: "Giraffe" },
      { id: "d", text: "Polar Bear" },
    ],
    correctAnswer: "b",
  },
  {
    id: 4,
    question: "Which language is used for styling web pages?",
    answers: [
      { id: "a", text: "HTML" },
      { id: "b", text: "JavaScript" },
      { id: "c", text: "Python" },
      { id: "d", text: "CSS" },
    ],
    correctAnswer: "d",
  },
  {
    id: 5,
    question: "In which year did the Titanic sink?",
    answers: [
      { id: "a", text: "1912" },
      { id: "b", text: "1905" },
      { id: "c", text: "1920" },
      { id: "d", text: "1931" },
    ],
    correctAnswer: "a",
  },
];
