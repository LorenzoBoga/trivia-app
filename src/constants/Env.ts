import Constants from "expo-constants";

const ENV = {
  dev: {
    SUPABASE_FUNCTIONS_URL:
      "https://lxgdmchjmdkpgkwczogl.supabase.co/functions/v1",
  },
  prod: {
    SUPABASE_FUNCTIONS_URL:
      "https://lxgdmchjmdkpgkwczogl.supabase.co/functions/v1",
  },
};

const getEnvVars = () => {
  const env = Constants.expoConfig?.extra?.ENV || "dev";
  return ENV[env as keyof typeof ENV];
};

export default getEnvVars();
