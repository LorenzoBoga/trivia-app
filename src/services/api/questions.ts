import { Question } from "@/features/quiz/types";

const API_URL =
  "https://lxgdmchjmdkpgkwczogl.supabase.co/functions/v1/get_questions";

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();

    return data.map((question: any) => ({
      id: question.id,
      question: question.text,
      correctAnswer: question.correct_answer,
      options: question.answers,
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
