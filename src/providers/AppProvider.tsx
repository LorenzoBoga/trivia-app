import { useQuestions } from "@/hooks/useQuestions";
import React, { PropsWithChildren, useEffect } from "react";
import { QueryProvider } from "./QueryProvider";

function InitialDataLoader({ children }: PropsWithChildren) {
  const { refetch } = useQuestions();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return <>{children}</>;
}

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <InitialDataLoader>{children}</InitialDataLoader>
    </QueryProvider>
  );
}
