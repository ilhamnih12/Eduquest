import { Subject, GradeLevel } from './game';

export interface GenerateQuestionRequest {
  subject: Subject;
  grade?: GradeLevel;
  difficulty?: 'easy' | 'medium' | 'hard';
  topic?: string;
  previousQuestionIds?: string[];
}

export interface GenerateQuestionResponse {
  id: string;
  subject: Subject;
  grade: GradeLevel;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
  source: 'gemini' | 'local_bank';
}

export interface StudyTipsRequest {
  subject: Subject;
  accuracy: number;
  totalQuestions: number;
  wrongTopics?: string[];
}

export interface StudyTipsResponse {
  subject: Subject;
  title: string;
  summary: string;
  tips: string[];
  recommendedTopics: string[];
  motivationalQuote: string;
  source: 'gemini' | 'local_generator';
}
