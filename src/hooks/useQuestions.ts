import { Question } from "@/features/quiz/types";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../services/api/questions";

export const useQuestions = () => {
  return useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
