import ENV from "@/constants/Env";

export const API_CONFIG = {
  BASE_URL: ENV.SUPABASE_FUNCTIONS_URL,
  ENDPOINTS: {
    QUESTIONS: "/get_questions",
  },
} as const;
